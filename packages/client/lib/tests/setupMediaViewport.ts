// Used in Jest unit tests only, to mock viewport width

function queryMatchesCurrentWidth(query: string, currentWidth: number) {
    const regexp = /^\(min-width:\s(\d+)px\)$/g;
    const matches = query.match(regexp);
    if (!matches) return false;
    const queryValue = parseInt(matches[0].replace(regexp, "$1"));
    return currentWidth >= queryValue;
}

/**
 * @see https://stackoverflow.com/a/53449595
 */
export default function setupMediaViewport(currentWidth: number) {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: queryMatchesCurrentWidth(query, currentWidth),
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
}
