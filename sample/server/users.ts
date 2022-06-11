import { UserRecord } from "firebase-admin/auth";

/**
 * Sample users
 */
export const sampleUsers: Partial<UserRecord>[] = [
    {
        uid: "1fas4tg545g5gsvsfv",
        email: "test1@gmail.com",
        photoURL: "https://www.pinterest.co.uk/pin/507640189244912014/",
    },
    {
        uid: "2fgw45bw4b5bthgsdh",
        email: "test2@gmail.com",
        photoURL: "https://www.pinterest.co.uk/pin/507640189244912014/",
    },
];

function generateSampleUser(): Partial<UserRecord>[] {
    // To be implemented, generate random user for development / testing.
    return [];
}
