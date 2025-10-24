//** camelCase -> snake_case */
export function toSnakeCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  }

  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      acc[newKey] = toSnakeCase(obj[key]);
      return acc;
    }, {});
  }

  return obj;
}

//** snake_case -> camelCase */
export function toCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }

  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      acc[newKey] = toCamelCase(obj[key]);
      return acc;
    }, {});
  }

  return obj;
}
