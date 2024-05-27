import { createTheme } from "@mui/material";

const themeColor = createTheme({
    palette: {
        primary: {
            main: "#B20600",
            light: "#DC0000",
            dark: "#C21010",
            contrastText: "#FFFFFF",
        },
        primary2: "#DC0000",
        primary3: "#C21010",
        secondary: {
            main: "#16213E",
        },
        secondary2: "#30475E",
        secondary3: "#214252",
        background: {
            default: "#F9FAFB",
        },
        black: "#121212",
        white: "#FFFFFF",
        "gray-50": "#F9FAFB",
        "gray-100": "#F4F6F8",
        "zinc-200": "#DFE3E8",
        "slate-300": "#C4CDD5",
        "gray-400": "#919EAB",
        "gray-500": "#637381",
        "gray-600": {
            main: "#454F5B",
        },
        "gray-800": "#212B36",
    },
});
export { themeColor };
