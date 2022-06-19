import * as UserUtils from "~/server/utils/crud/userUtils";

import * as sampleUsers from "~/sample/server/users.json";
import { nonExistingUid } from "~/sample/server/nonExistingIds.json";

describe("Test user interaction", () => {
    const existingUid = sampleUsers[0].uid;
    it(`Should be able to update user with id ${existingUid}`, () => {
        expect.assertions(1);
        expect(
            UserUtils.updateUserById(existingUid, { photoURL: "https://example.com" })
        ).rejects.toBeFalsy();
    });

    it(`Should fail when try to update non-existing user with id ${nonExistingUid}`, () => {
        /**
         * If I write
         *
         * expect(UserUtils.updateUserById("100", data)).rejects.toBeDefined()
         *
         * Then the test will fail as `handleAuthError` will try to log after the test is
         * completed. I need to have a look at async function again.
         */
        expect.assertions(1);
        expect(
            UserUtils.updateUserById(nonExistingUid, { photoURL: "https://example.com" })
        ).rejects.toBeTruthy();
    });
});
