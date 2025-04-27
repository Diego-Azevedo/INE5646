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

export async function convertJsonToCsv(jsonInput) {
  try {
    const data = typeof jsonInput === 'string' ? JSON.parse(jsonInput) : jsonInput;

    const cleanedData = cleanJsonStrings(data);

    const options = {
      expandNestedObjects: true,
      expandArrayObjects: true,
      unwindArrays: true,
      separator: '__',
      useHeader: true
    };

    const csv = await json2csv(cleanedData, options);
    return csv;
  } catch (err) {
    throw new Error('Conversion failure: ' + err.message);
  }
}
