export function sortObjFields(object: any) {
  // to ensure that the order of the keys is always the same so that the hash doesn't change
  const sortedKeys = Object.keys(object).sort();

  const sortedObject = {};
  for (const key of sortedKeys) {
    sortedObject[key] = object[key];
  }
  
  return sortedObject;
}
