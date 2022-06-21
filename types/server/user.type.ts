import { UserRecord } from "firebase-admin/auth";
import { User as FirebaseUser } from "firebase/auth";

import { Site } from "./site.type";

type PickedUserRecordProps =
    | "uid"
    | "email"
    | "displayName"
    | "photoURL"
    | "metadata"
    | "providerData"
    | "tokensValidAfterTime"
    | "toJSON";

/**
 * The user, used in this app. As we will not use traditional password to authenticate users, some
 * properties is redudant.
 */
export type ServerUser = Pick<UserRecord, PickedUserRecordProps>;

export type UpdateUserBodyParams = {
    displayName: string;
};

export type ClientUser = FirebaseUser & { sites: Site[] };
