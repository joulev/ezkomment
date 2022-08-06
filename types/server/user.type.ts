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
 *
 * I am thinking of renaming this into `User`
 */
export type ServerUser = Pick<UserRecord, PickedUserRecordProps>;

export type UpdateUserBodyParams = {
    displayName: string;
};

export type ClientUser = FirebaseUser & { sites: Site[] };

/**
 * If only we have proper ADT
 */
export type NotificationTypes = "NewComment" | "WelcomeMessage";

export type NewCommentNotification = {
    type: "NewComment";
    href: string;
    siteName: string;
    pageTitle: string;
    authors: (string | null)[];
    timestamp: number;
};

export type WelcomeMessageNotification = {
    type: "WelcomeMessage";
    href: string;
    timestamp: number;
};

export type Notification = NewCommentNotification | WelcomeMessageNotification;
