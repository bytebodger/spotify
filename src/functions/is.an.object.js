export const isAnObject = (value) => typeof value === 'object' && !Array.isArray(value) && value !== null;