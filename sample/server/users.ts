import { UserImportRecord } from "firebase-admin/auth";

/**
 * Sample users
 */
export const sampleImportedUser: UserImportRecord[] = [
    {
        uid: "1",
        displayName: "User 1",
        email: "test1@email.com",
    },
    {
        uid: "2",
        displayName: "User 2",
        email: "test2@email.com",
    },
];
