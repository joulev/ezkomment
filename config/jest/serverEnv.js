const NodeEnvironment = require("jest-environment-node").default;

class CustomServerEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
    }

    async setup() {
        try {
            await fetch("http://localhost:4400/emulators", { method: "GET" });
            await super.setup();
        } catch (err) {
            console.error("Emulator is not running at the moment?");
            process.exit(1);
        }
        const {
            FIREBASE_AUTH_EMULATOR_HOST,
            FIRESTORE_EMULATOR_HOST,
            FIREBASE_STORAGE_EMULATOR_HOST,
        } = process.env;
        if (
            !FIREBASE_AUTH_EMULATOR_HOST ||
            !FIRESTORE_EMULATOR_HOST ||
            !FIREBASE_STORAGE_EMULATOR_HOST
        ) {
            console.error("Missing configuration to connect to the emulator");
            process.exit(1);
        }

        this.global.testOnly.nonExistingIds = {
            nonExistingUid: "u5",
            nonExistingSiteId: "s5",
            nonExistingPageId: "p5",
            nonExistingCommentId: "c5",
        };
    }
}

module.exports = CustomServerEnvironment;
