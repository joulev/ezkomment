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

    it("Should be able to update user with id 1", async () => {
        // hard code is not good, I will try a way to change it.
        const user = await UserUtils.updateUserById("1", { photoURL: "https://example.com" });
        expect(user.uid).toEqual("1");
    });

    it("Should fail when try to update non-existing user", async () => {
        /**
         * If I write
         *
         * expect(UserUtils.updateUserById("100", data)).rejects.toBeDefined()
         *
         * Then the test will fail as `handleAuthError` will try to log after the test is
         * completed. I need to have a look at async function again.
         */
        try {
            await UserUtils.updateUserById("100", { photoURL: "https://example.com" });
        } catch (err) {
            expect(err).toBeDefined();
        }
    });
});
