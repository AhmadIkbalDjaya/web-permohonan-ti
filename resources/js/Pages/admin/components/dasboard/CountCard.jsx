import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { MdArticle } from "react-icons/md";
export function CountCard({
    title = "Proposal",
    count = 0,
    new_count = 0,
    icon = <MdArticle size={20} color="#375DFB" />,
    bgIcon = "#DBE7FF",
    color = "#375DFB",
}) {
    return (
        <Box
            display={"flex"}
            justifyContent={"space-between"}
            columnGap={2}
            p={1}
            mb={2}
            sx={{
                background: "white",
                borderRadius: "5px",
                boxShadow: 1,
            }}
            width={"100%"}
        >
            <Box>
                <Typography
                    variant="subtitle2"
                    color="gray-500"
                    fontWeight={"600"}
                    textTransform={"uppercase"}
                    fontSize={12}
                >
                    {title}
                </Typography>
                <Typography
                    variant="h6"
                    color="black"
                    display={"flex"}
                    gap={1}
                    alignItems="end"
                    fontWeight={600}
                >
                    {count}
                    <Typography
                        variant="body1"
                        color="inherit"
                        fontWeight={600}
                    >
                        Permohonan
                    </Typography>
                </Typography>
                <Typography variant="subtitle2" color="gray-500" fontSize={11}>
                    <Typography
                        variant="inherit"
                        color={color}
                        display={"inline"}
                    >
                        {new_count}{" "}
                    </Typography>
                    perhomanan baru
                </Typography>
            </Box>
            <Avatar
                sx={{
                    bgcolor: bgIcon,
                    width: "35px",
                    height: "35px",
                }}
            >
                {icon}
            </Avatar>
        </Box>
    );
}
