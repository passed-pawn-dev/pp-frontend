export const enumToObjectArray = <T extends Record<string, string>>(
  enumObj: T,
  enumLabelsMapper: Record<T[keyof T], string>
): Array<{ [key: string]: string }> => {
  return Object.values(enumObj).map((enumValue) => ({
    enumValue,
    label: enumLabelsMapper[enumValue as T[keyof T]]
  }));
};
