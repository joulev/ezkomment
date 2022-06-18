import { UserRecord } from "firebase-admin/auth";

import * as UserUtils from "~/server/utils/crud/userUtils";

import { sampleImportedUser } from "~/sample/server/users";

describe("Test user interaction", () => {
    beforeAll(async () => {
        // Hope that I can find a specific value to check whether the emulator is running
        console.dir(process.env, { depth: null });
        // Import user into the databases.
        // I will use simple id (1, 2, 3, etc.) to make the test cases simplier.
        await UserUtils.importUsers(sampleImportedUser);
    });

    it("Should contain user with id 1", async () => {
        // hard code is not good, I will try a way to change it.
        const user = (await UserUtils.getUserById("1")) as UserRecord;
        expect(user.uid).toEqual("1");
    });
});
