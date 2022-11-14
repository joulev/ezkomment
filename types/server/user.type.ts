import { UserRecord } from "firebase-admin/auth";

import { ExportSite, Site } from "./site.type";

type PickedUserRecordProps = "uid" | "email" | "displayName" | "photoURL";
/**
 * The user, used in this app. As we will not use traditional password to authenticate users, some
 * properties are redudant.
 */
type ProviderData = {
    displayName: string;
    email: string;
    providerId: string;
};
export type User = Pick<UserRecord, PickedUserRecordProps> & { providerData: ProviderData[] };
export type UpdateUserBody = { displayName?: string };

/**
 * If only we have proper ADT
 */
export type NotificationTypes = "NewComment" | "WelcomeMessage";
export type NewCommentNotification = {
    id: string;
    type: "NewComment";
    href: string;
    siteName: string;
    pageTitle: string;
    authors: (string | null)[];
    timestamp: number;
};
export type WelcomeMessageNotification = {
    id: string;
    type: "WelcomeMessage";
    href: string;
    timestamp: number;
};
export type Notification = NewCommentNotification | WelcomeMessageNotification;

export type ClientUser = User & { sites: Site[] };
export type ExportUser = User & { sites: ExportSite[] };
