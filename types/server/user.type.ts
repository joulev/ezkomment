/**
 * Removes some unnecessary properties of a user record.
 */
import { UpdateRequest, UserRecord } from "firebase-admin/auth";

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
export type AppUser = Pick<UserRecord, PickedUserRecordProps>;

export type UpdateUserBodyParams = {
    displayName: string;
};
