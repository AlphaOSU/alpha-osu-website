export type ArrayItemType<T extends any[]> = T extends (infer P)[] ? P : never;

export type ArrayToUnion<T extends any[]> = T[number];

export type WithNull<T> = {
  [P in keyof T]: T[P] | null;
}
