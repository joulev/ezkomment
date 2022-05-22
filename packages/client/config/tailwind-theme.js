/**
 * @type {import("@types/tailwindcss/tailwind-config").TailwindTheme}
 */
module.exports = {
    // Screen breakpoints from Bootstrap, https://getbootstrap.com/docs/5.1/layout/breakpoints
    screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
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
        },
    },
};
