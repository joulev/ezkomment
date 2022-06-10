# API

Ezkomment's API follows REST conventions. All endpoints live under the URL `https://ezkdev.joulev.dev/api`.

# Basics

## Content Type

All requests must be encoded as JSON with the `Content-Type: application/json` header. Responses from the API are encoded as JSON as well. Other encodings are not supported.

## Successful Responses

All successful responses will contains a `message` and optional `data`, which is a JSON object,
or an JSON array in case multiple records are read.

```json
{
  "message": "Successfully get user's information",
  "data": {
    "uid": "some uid",
    "displayName": "some name",
    "email": "some email"
  }
}
```

## Failed Reponses

All failed responses will contains a `message` and a `error` that contains the error message. (This
design is planned to be changed).

# Endpoints

## Handle Users

`GET` /users/{uid}

Gets the basic information of a user.

| Path Parameter | Description                           |
| -------------- | ------------------------------------- |
| uid            | _string_<br/> The unique ID of a user |

#### **Response Data**

See `UserRecord` in Firebase Admin SDK (Unnecessary properties will be removed, in the future).

`POST` /users/{uid}

Updates the basic information of a user. This endpoint is protected, only authorized requests are
handled. To authorize the request, calls `user.getIdToken()` to get the id token of the user, then
adds `Authorization: Bearer ${idToken}` to the header of the requests.

| Path Parameter | Description                           |
| -------------- | ------------------------------------- |
| uid            | _string_<br/> The unique ID of a user |

| Body Parameter         | Description                                |
| ---------------------- | ------------------------------------------ |
| displayName (optional) | _string_<br/> The display name of the user |
| photoURL (optional)    | _string_<br/> The user's photo URL         |

`DELETE` /users/{uid}

Deletes a user and _ALL_ information related to them. This endpoint is protected, only authorized
requests are handled. To authorize the request, calls `user.getIdToken()` to get the id token of the
user, then adds `Authorization: Bearer ${idToken}` to the header of the requests.

| Path Parameter | Description                           |
| -------------- | ------------------------------------- |
| uid            | _string_<br/> The unique ID of a user |

> Note: The following endpoints are not fully implemented; as the data models of sites, pages and
> comments may be changed for better performance/cleaner design.

`GET` /users/{uid}/sites

List all sites of a user. Only basic information will be sent back.

| Path Parameter | Description                           |
| -------------- | ------------------------------------- |
| uid            | _string_<br/> The unique ID of a user |

## Handle Sites

`GET` /sites/{siteId}

`POST` /sites/{siteId}

`DELTE` /sites/{siteId}

## Handle Pages

`GET` /pages/{pageId}

`POST` /pages/{pageId}

`DELTE` /pages/{pageId}

## Handle Comments (in pages)

`POST` /pages/{pageId}/comments/{commentId}

`DELTE` /pages/{pageId}/comments/{commentId}
