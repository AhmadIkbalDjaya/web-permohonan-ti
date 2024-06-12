import { Box, Typography } from "@mui/material";
import React from "react";
export default function AppInputLabel({
    label = "Name",
    required = false,
    ...props
}) {
    return (
        <Box display={"flex"} minHeight={"25px"}>
            <Typography
                variant="body2"
                fontWeight={"600"}
                display={"flex"}
                sx={{ textTransform: "capitalize" }}
                {...props}
            >
                {label}
            </Typography>
            {required ? <Typography color={"red"}>&nbsp; *</Typography> : ""}
        </Box>
    );
}
