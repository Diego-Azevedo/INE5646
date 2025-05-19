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

function removeEmptyArrays(obj) {
  if (Array.isArray(obj)) {
    return obj.length > 0 ? obj.map(removeEmptyArrays) : undefined;
  } else if (obj && typeof obj === 'object') {
    const cleaned = {};
    for (const key in obj) {
      const cleanedValue = removeEmptyArrays(obj[key]);
      if (cleanedValue !== undefined) {
        cleaned[key] = cleanedValue;
      }
    }
    return cleaned;
  }
  return obj;
}

export async function convertJsonToCsv(jsonInput) {
  try {
    const base = typeof jsonInput === 'string' ? JSON.parse(jsonInput) : jsonInput;
    const cleanedBase = cleanJsonStrings(base);
    const filteredBase = removeEmptyArrays(cleanedBase);

      const directOptions = {
        expandNestedObjects: true,
        expandArrayObjects: true,
        unwindArrays: true,
        separator: '__',
        useHeader: true
      };
      return await json2csv(filteredBase, directOptions);

  } catch (err) {
    throw new Error('Conversion failure: ' + err.message);
  }
}