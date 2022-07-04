import * as UserUtils from "~/server/utils/crud/userUtils";
import * as TestUtils from "~/server/utils/testUtils";

const { nonExistingUid } = nonExistingId;

describe("Test user utils", () => {
    const uid = TestUtils.randomUUID();

    beforeAll(async () => {
        await TestUtils.importUsers(TestUtils.createTestUser(uid));
    });

    ///////////////////
    // SHOULD REJECT //
    ///////////////////

    it("Should fail when trying to update a non-existing user", async () => {
        await expect(
            UserUtils.updateUserById(nonExistingUid, { displayName: "Sakuya Izayoi" })
        ).rejects.toMatchObject({ code: 404 });
    });

    it("Should fail when trying to delete a non-existing user", async () => {
        await expect(UserUtils.deleteUserById(nonExistingUid)).rejects.toMatchObject({ code: 404 });
    });

    ////////////////////
    // SHOULD RESOLVE //
    ////////////////////

    it("Should be able to update user", async () => {
        await expect(
            UserUtils.updateUserById(uid, { photoURL: "https://www.zerochan.net/1361758#full" })
        ).resolves.not.toThrow();
        const { photoURL } = await UserUtils.getUserById(uid);
        expect(photoURL).toEqual("https://www.zerochan.net/1361758#full");
    });

    it("Should be able to delete user", async () => {
        await expect(UserUtils.deleteUserById(uid)).resolves.not.toThrow();
        await expect(UserUtils.getUserById(uid)).rejects.toMatchObject({ code: 404 });
    });
});
