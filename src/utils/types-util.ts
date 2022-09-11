export type ArrayItemType<T extends any[]> = T extends (infer P)[] ? P : never;

export type ArrayToUnion<T extends any[]> = T[number];
