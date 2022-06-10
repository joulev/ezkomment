import { CreateSiteRequest, KeyName, KeyNameSet, UpdateSiteRequest } from "~/server/types";

import { _createRemovePropsMiddleware } from ".";

// Put the types here so the Text Editor can list out the key name.
type CreateSiteRequestKey = KeyName<CreateSiteRequest>;
type UpdateSiteRequestKey = KeyName<UpdateSiteRequest>;

export const removeCreateSiteRequestProps = _createRemovePropsMiddleware<CreateSiteRequest>(
    new Set(["name", "iconURL", "id", "domain", "uid"]) as KeyNameSet<CreateSiteRequest>
);

export const removeUpdateSiteRequestProps = _createRemovePropsMiddleware<CreateSiteRequest>(
    new Set(["name", "iconURL"]) as KeyNameSet<CreateSiteRequest>
);
