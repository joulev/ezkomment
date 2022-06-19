import * as UserUtils from "~/server/utils/crud/userUtils";

import * as sampleUsers from "~/sample/server/users.json";
import { nonExistingUid } from "~/sample/server/nonExistingIds.json";

describe("Test user interaction", () => {
    const existingUid = sampleUsers[0].uid;
    it(`Should be able to update user with id ${existingUid}`, async () => {
        expect.assertions(1);
        await expect(
            UserUtils.updateUserById(existingUid, { photoURL: "https://example.com" })
        ).resolves.toBeTruthy();
    });

    it(`Should fail when try to update non-existing user with id ${nonExistingUid}`, async () => {
        expect.assertions(1);
        await expect(
            UserUtils.updateUserById(nonExistingUid, { photoURL: "https://example.com" })
        ).rejects.toBeTruthy();
    });
});
