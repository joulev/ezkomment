export * from "./comment.type";
export * from "./page.type";
export * from "./site.type";
export * from "./user.type";

export type RawBody<T> = Partial<{ [P in keyof T]: any }>;
export type OnlyRequired<T, K extends keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>;
