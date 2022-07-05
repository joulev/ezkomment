declare module globalThis {
    /**
     * Test-only constants (if any)
     */
    const testOnly: {
        nonExistingIds: {
            nonExistingUid: string;
            nonExistingSiteId: string;
            nonExistingPageId: string;
            nonExistingCommentId: string;
        };
    };
}
