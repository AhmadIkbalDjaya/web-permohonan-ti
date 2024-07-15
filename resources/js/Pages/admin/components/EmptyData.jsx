import { usePage } from "@inertiajs/react";
import { Box, Typography } from "@mui/material";
import React from "react";
export function EmptyData() {
    const { url } = usePage().props;
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            mt={5}
        >
            <Box
                component={"img"}
                src={`${url}/images/icons/folder.webp`}
                sx={{
                    width: "100px",
                }}
            />
            <Typography variant="body2" color="gray-500" fontWeight={600}>
                Tidak Ada Data
            </Typography>
        </Box>
    );
}
