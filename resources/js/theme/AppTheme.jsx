import { createTheme } from "@mui/material";

const appTheme = createTheme({
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
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    // "& .MuiInputBase-root": {
                    //     height: "32px",
                    // },
                    "& .MuiOutlinedInput-input": {
                        padding: "5px 14px",
                    },
                    "& .MuiInputBase-input::placeholder": {
                        fontWeight: 600,
                    },
                    "& .MuiInputBase-inputMultiline": {
                        padding: "0px 0px",
                    },
                    "& .MuiInputBase-multiline": {
                        padding: "5px 14px",
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    // "& .MuiInputBase-root": {
                    //     height: "32px",
                    // },
                    "& .MuiOutlinedInput-input": {
                        padding: "5px 14px",
                    },
                    // "& .MuiSelect-select": {
                    //     height: "32px",
                    // }
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "& .MuiList-root": {
                        padding: "0",
                    },
                },
            },
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    color: "#9CA3AF", // Warna teks pada tombol
                    // backgroundColor: "blue", // Warna latar belakang tombol
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontWeight: 500,
                    "&:hover": {
                        backgroundColor: "#DC0000",
                        color: "white", // Warna latar belakang tombol terpilih saat dihover
                    },
                    "&.Mui-selected": {
                        color: "white", // Warna teks pada tombol terpilih
                        backgroundColor: "#DC0000", // Warna latar belakang tombol terpilih
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: 600,
                        "&:hover": {
                            backgroundColor: "#DC0000",
                            opacity: 0.8, // Warna latar belakang tombol terpilih saat dihover
                        },
                    },
                },
            },
        },
    },
});

export default appTheme;
