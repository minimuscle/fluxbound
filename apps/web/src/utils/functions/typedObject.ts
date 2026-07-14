export const typedEntries = <T extends Record<string, any>>(obj: T): Array<[keyof T, T[keyof T]]> => {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
};

export const typedKeys = <T extends Record<string, any>>(obj: T): Array<keyof T> => {
  return Object.keys(obj) as Array<keyof T>;
};
