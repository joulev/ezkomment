import { UserRecord } from "firebase-admin/auth";

/**
 * Sample users
 */
const sampleUsers: Partial<UserRecord>[] = [
    {
        uid: "1",
        email: "test1@gmail.com",
        photoURL: "https://www.pinterest.co.uk/pin/507640189244912014/",
    },
    {
        uid: "2",
        email: "test2@gmail.com",
        photoURL: "https://www.pinterest.co.uk/pin/507640189244912014/",
    },
];

function generateSampleUser(): Partial<UserRecord>[] {
    // To be implemented, generate random user for development / testing.
    return [];
}

export {};
