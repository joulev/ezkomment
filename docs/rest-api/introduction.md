# ezkomment REST API

If you feel that [customising with templates](/docs/customisation/introduction) is not enough for your use case, or you do not want to use plain HTML, or you want to integrate directly to your existing frontend, you can use the ezkomment REST API to fetch and post comments directly for any ezkomment pages.

This documentation is for the API endpoints of version 1.x.x, under the following path

```
https://ezkomment.joulev.dev/api/v1
```

## Content Type

All requests must be JSON (use `Content-Type: application/json` header), and all responses (including errors) will be JSON, unless specified otherwise.

## Errors

If any errors are thrown, the response is in the following format (represented as TypeScript type), with a non-200 status code:

```ts
interface Response {
  error: string;
}
```

## `/comments/:siteId/:pageId`

Endpoint to handle comments for any ezkomment page. To retrieve the `siteId` and `pageId` parameters, you can visit the site settings and the page settings page respectively.

### Authentication

This endpoint is public, hence authentication is not required.

### GET `/comments/:siteId/:pageId`

Fetch the comments for a particular page.

#### Body

Not applicable.

#### Response

If `siteId` and `pageId` are valid and correspond to an actual ezkomment page, the status code will be 200 with the JSON in the following format:

```ts
interface Response {
  message: string;
  data: {
    /** RAW comment content */
    text: string;
    /** Comment author, where null indicates Anonymous author */
    author: string | null;
    /** Timestamp of the comment, as milliseconds since Unix epoch */
    date: number;
    /** There may be more metadata, however they are not under semver so do not use them */
  }[];
}
```

### POST `/comments/:siteId/:pageId`

Post a new comment for a particular page.

#### Body

JSON in the following format:

```ts
interface Body {
  author: string | null;
  text: string;
}
```

#### Response

If `siteId` and `pageId` are valid and correspond to an actual ezkomment page, the status code will be 200 with the JSON in the following format:

```ts
interface Response {
  message: string;
  data: {
    /** RAW comment content */
    text: string;
    /** Comment author, where null indicates Anonymous author */
    author: string | null;
    /** Timestamp of the comment, as milliseconds since Unix epoch */
    date: number;
    /** There may be more metadata, however they are not under semver so do not use them */
  };
}
```

#### Example

```http
POST https://ezkomment.joulev.dev/api/v1/comments/:siteId/:pageId
Content-Type: application/json

{
  "author": null,
  "text": "Test from API"
}
```
