import { json2csv } from 'json-2-csv';

function cleanJsonStrings(obj) {
  if (typeof obj === 'string') {
    return obj.replace(/[\n\r]/g, ' ');
  } else if (Array.isArray(obj)) {
    return obj.map(cleanJsonStrings);
  } else if (obj && typeof obj === 'object') {
    const cleaned = {};
    for (const key in obj) {
      cleaned[key] = cleanJsonStrings(obj[key]);
    }
    return cleaned;
  }
  return obj;
}

function isFlatObject(obj) {
  if (Array.isArray(obj)) return false;
  if (typeof obj !== 'object' || obj === null) return false;

  for (const key in obj) {
    if (Array.isArray(obj[key]) && obj[key].some(v => typeof v === 'object')) {
      return false;
    }
  }

  return true;
}

function extractNestedArrays(data, path = '') {
  if (!path) {
    const deepestArray = findDeepestArray(data);
    if (!deepestArray) return [data];
    return deepestArray;
  }

  const parts = path.split('.');
  let current = data;

  for (const part of parts) {
    if (part.endsWith('[]')) {
      const key = part.slice(0, -2);
      if (current[key] && Array.isArray(current[key])) {
        current = current[key];
      } else {
        throw new Error(`Array not found at path: ${path}`);
      }
    } else if (current[part] !== undefined) {
      current = current[part];
    } else {
      throw new Error(`Path not found: ${path}`);
    }
  }

  if (!Array.isArray(current)) {
    throw new Error(`The specified path does not lead to an array: ${path}`);
  }

  return current;
}

function findDeepestArray(obj, currentDepth = 0, deepest = { depth: -1, array: null }) {
  if (Array.isArray(obj)) {
    if (currentDepth > deepest.depth) {
      deepest.depth = currentDepth;
      deepest.array = obj;
    }
    return deepest;
  }

  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      findDeepestArray(obj[key], currentDepth + 1, deepest);
    }
  }

  return deepest.array || [obj];
}

function transformToRows(data, parentData = {}, prefix = '') {
  let rows = [];

  if (Array.isArray(data)) {
    if (data.every(item => typeof item !== 'object')) {
      return [{ ...parentData, [prefix]: data.join(', ') }];
    } else {
      for (const item of data) {
        rows = rows.concat(transformToRows(item, parentData, prefix));
      }
    }
    return rows;
  }

  if (typeof data === 'object' && data !== null) {
    const hasArrays = Object.values(data).some(v => Array.isArray(v) && !v.every(i => typeof i !== 'object'));

    if (hasArrays) {
      for (const key in data) {
        const newPrefix = prefix ? `${prefix}__${key}` : key;
        if (Array.isArray(data[key]) && !data[key].every(i => typeof i !== 'object')) {
          rows = rows.concat(
            transformToRows(data[key], { ...parentData, ...flattenObject(data, prefix) }, newPrefix)
          );
        } else if (typeof data[key] === 'object') {
          rows = rows.concat(
            transformToRows(data[key], { ...parentData }, newPrefix)
          );
        }
      }
      return rows;
    } else {
      return [{ ...parentData, ...flattenObject(data, prefix) }];
    }
  }

  return [{ ...parentData, [prefix]: data }];
}

function flattenObject(obj, prefix = '', result = {}) {
  for (const key in obj) {
    const value = obj[key];
    const prefixedKey = prefix ? `${prefix}__${key}` : key;

    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        if (value.every(v => typeof v !== 'object')) {
          result[prefixedKey] = value.join(', ');
        }
      } else {
        flattenObject(value, prefixedKey, result);
      }
    } else {
      result[prefixedKey] = value;
    }
  }
  return result;
}

export async function convertJsonToCsv(jsonInput, options = {}) {
  try {
    const base = typeof jsonInput === 'string' ? JSON.parse(jsonInput) : jsonInput;
    const cleanedBase = cleanJsonStrings(base);

    if (isFlatObject(cleanedBase)) {
      const directOptions = {
        expandNestedObjects: true,
        expandArrayObjects: true,
        unwindArrays: true,
        separator: '__',
        useHeader: true
      };
      return await json2csv(cleanedBase, directOptions);
    }

    const { path } = options;
    const nestedData = extractNestedArrays(cleanedBase, path);
    const rows = transformToRows(nestedData);

    const csv = await json2csv(rows, {
      useHeader: true,
      separator: '__',
      emptyFieldValue: ''
    });

    return csv;
  } catch (err) {
    throw new Error('Conversion failure: ' + err.message);
  }
}