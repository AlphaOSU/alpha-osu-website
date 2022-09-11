const getDestructArrayInCondition =
  <T = any>(condition: any, thing: T): [T] | [] => {
    return condition ? [thing] : [];
  };

const getDestructObjectInCondition =
  <T = any>(condition: any, thing: Record<any, T>) => {
    return condition ? thing : {};
  };

const omitUndefinedObjectValue = (
  obj: Record<string | number, any>,
  condition?: (key: string | number, value: any) => boolean,
) => {
  const filter = condition || ((_, value) => value !== undefined && value !== null);
  const result: Record<string | number, any> = {};
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (filter(key, obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
};

const objectValueTransform = (
  obj: Record<string | number, any>,
  transformer?: (key: string | number, value: any) => any,
) => {
  const handler = transformer || ((_, value) => value);
  const result: Record<string | number, any> = {};
  const keys = Object.keys(obj);
  for (const key of keys) {
    result[key] = handler(key, obj[key]);
  }
  return result;
};

export const gdaic = getDestructArrayInCondition;
export const gdoic = getDestructObjectInCondition;
export const ouov = omitUndefinedObjectValue;
export const ovt = objectValueTransform;
