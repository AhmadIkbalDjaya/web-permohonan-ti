import { Typography } from "@mui/material";
import React from "react";

export default function StatusBox({ status = "pending" }) {
    let textColor = "#f9a825";
    let textBg = "#fffde7";
    if (status == "diterima") {
        textColor = "#4caf50";
        textBg = "#e8f5e9";
    } else if (status == "ditolak") {
        textColor = "#f44336";
        textBg = "#ffebee";
    }
    return (
        <Typography
            variant=""
            color={textColor}
            backgroundColor={textBg}
            padding={"0px 3px"}
            borderRadius={"3px"}
            sx={{ textTransform: "capitalize" }}
        >
            {status}
        </Typography>
    );
}
