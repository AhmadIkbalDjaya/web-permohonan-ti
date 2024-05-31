import {
    Button,
    FormHelperText,
    ThemeProvider,
    createTheme,
    styled,
} from "@mui/material";
import React from "react";
import { IoMdCloudUpload } from "react-icons/io";

export const themeFileUploadButton = createTheme({
    palette: {
        "gray-100": "#F4F6F8",
    },
});

export default function InputFileUpload({ id, name, type, accept, onChange }) {
    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });

    return (
        <ThemeProvider theme={themeFileUploadButton}>
            <Button
                component="label"
                variant="contained"
                startIcon={<IoMdCloudUpload />}
                sx={{
                    height: "33px",
                    textTransform: "capitalize",
                }}
                fullWidth
                color="gray-100"
            >
                Upload File
                <VisuallyHiddenInput
                    id={id}
                    type={type}
                    accept={accept}
                    name={name}
                    onChange={onChange}
                />
            </Button>
            {/* <FormHelperText>
                File: nama_file.pdf 32mb
            </FormHelperText> */}
        </ThemeProvider>
    );
}
