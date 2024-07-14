import { Box, Typography } from "@mui/material";
import React from "react";
export function ShowApplicantSignCard({ signSrc = "" }) {
    return (
        <Box
            sx={{
                background: "white",
                border: ".5px solid",
                borderColor: "slate-300",
                borderRadius: "4px",
            }}
        >
            <Typography
                variant="body2"
                color="initial"
                sx={{
                    p: "15px",
                    fontWeight: "600",
                }}
                borderBottom={"1px solid"}
                borderColor={"slate-300"}
            >
                Tanda Tangan Pemohon
            </Typography>
            <Box display={"flex"} justifyContent={"center"}>
                <Box
                    component={"img"}
                    sx={{
                        height: "200px",
                        width: "300px",
                    }}
                    src={signSrc}
                />
            </Box>
        </Box>
    );
}
