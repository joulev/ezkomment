declare module "*.md" {
    const content: string;
    export default content;
}

// Sorry, MDX maintainers...
declare module "*.mdx" {
    const content: string;
    export default content;
}

declare module "*.html" {
    const content: string;
    export default content;
}
