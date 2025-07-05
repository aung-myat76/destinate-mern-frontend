// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        {
            pattern:
                /hover:bg-(red|green|blue|stone|amber|yellow|indigo|purple|pink)-(100|200|300|400|500|600|700|800|900)/,
        },
    ],
};
