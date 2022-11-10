/**
 * @file remark-prism.d.ts
 *
 * As of today (9 May 2022), `@types/remark-prism` depends on an outdated version of `remark`. Even
 * worse, the dependency chain leads to a known security vulnerability. Since we don't actually need
 * any complex features of `remark-prism`, it's fine to not have it fully-typed, that's why I don't
 * use `@types/remark-prism` here.
 *
 * However, TS complains about `remark-prism` (and it should). As such I'm adding this file to
 * silence this warning.
 *
 * This might be removed in the future, when `remark-prism` becomes an ESM module, leading to
 * `@types/remark-prism` not relying on the vulnerable `remark@12`.
 */

declare module "remark-prism" {
    const remarkPrism: any;
    export default remarkPrism;
}
