const NodeEnvironment = require("jest-environment-node").default;

class CustomServerEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
    }

    async setup() {
        try {
            console.log("Check for emulator...");
            await fetch("http://localhost:4400/emulators", { method: "GET" });
            await super.setup();
        } catch (err) {
            console.log("Emulator is not running at the moment?");
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
            console.log("Missing configuration to connect to the emulator");
            process.exit(1);
        }
    }
}

module.exports = CustomServerEnvironment;
