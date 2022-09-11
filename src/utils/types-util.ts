export type ArrayItemType<T extends any[]> = T extends (infer P)[] ? P : never;
