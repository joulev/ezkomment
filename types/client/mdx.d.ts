// https://stackoverflow.com/a/71009332

declare module "*.mdx" {
    import { Author } from "./utils.type";
    export const meta: {
        title: string;
        authors: Author[];
        timestamp: Date;
    };
}
