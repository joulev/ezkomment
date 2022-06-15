export * from "./comment.type";
export * from "./page.type";
export * from "./site.type";

/**
 * From a type T, constructs an union type with all keys of T as members.
 */
export type KeyName<T> = NonNullable<{ [P in keyof T]: P }[keyof T]>;

/**
 * From a type T, constructs the type of a set in which elements are of an union
 * type with all keys of T as members.
 */
export type KeyNameSet<T> = Set<KeyName<T>>;

export type RawBody<T> = Partial<T>;
