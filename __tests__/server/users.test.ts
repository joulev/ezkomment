import * as UserUtils from "~/server/utils/crud/userUtils";
import * as TestUtils from "~/server/utils/testUtils";

import { nonExistingUid } from "~/sample/server/nonExistingIds.json";

describe("Test user utils", () => {
    const uid = TestUtils.randomUUID();

    beforeAll(async () => {
        await TestUtils.importUsers(TestUtils.createTestUser(uid));
    });

    /////////
    // GET //
    /////////

    it(`Should fail when trying to get a non-existing user`, async () => {
        await expect(UserUtils.getUserById(nonExistingUid)).rejects.toBeTruthy();
    });

    ////////////
    // UPDATE //
    ////////////

    it(`Should be able to update user`, async () => {
        await expect(
            UserUtils.updateUserById(uid, { photoURL: "https://example.com" })
        ).resolves.toBeTruthy();
    });

    it(`Should be able to delete user`, async () => {
        await expect(UserUtils.deleteUserById(uid)).resolves.not.toThrow();
    });
});
