/**
 * @type {import("tailwindcss").Config["theme"]}
 */
module.exports = {
    // Screen breakpoints from Bootstrap, https://getbootstrap.com/docs/5.1/layout/breakpoints
    screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
    },
    container: {
        center: true,
        padding: "1.5rem",
    },
    extend: {
        maxWidth: {
            prose: "80ch",
        },
        spacing: {
            4.5: "1.125rem",
            18: "4.5rem",
            27: "6.75rem",
            54: "13.5rem",
        },
        gridTemplateColumns: {
            24: "repeat(24, minmax(0, 1fr))",
        },
        fontSize: {
            "8xl": "5.5rem",
        },
    },
};
