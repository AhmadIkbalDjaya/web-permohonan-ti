import { createTheme } from "@mui/material";

const themeTextField = createTheme({
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
                        padding: "5px 14px"
                    }
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
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "& .MuiList-root": {
                        padding: "0"
                    }
                }
            }
        }
    },
});

export { themeTextField };
