import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import appTheme from "../../../theme/AppTheme";
import PublicAppbar from "./PublicAppbar";
import PublicFooter from "./PublicFooter";

export default function PublicBaseLayout(props) {
    const { children } = props;
    return (
        <>
            <ThemeProvider theme={appTheme}>
                <CssBaseline />
                <PublicAppbar />
                <Box sx={{ marginTop: "60px", minHeight: "75vh" }}>
                    {children}
                </Box>
                <PublicFooter />
            </ThemeProvider>
        </>
    );
}
