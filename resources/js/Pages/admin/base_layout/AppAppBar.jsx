import React from "react";
import { AppBar } from "./BaseLayout";
import {
    Avatar,
    Box,
    Container,
    IconButton,
    InputBase,
    Toolbar,
    Typography,
} from "@mui/material";
import { FiMenu, FiSearch } from "react-icons/fi";
export function AppAppBar({ theme, setOpen, open }) {
     return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: "white",
                paddingY: "5px",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        justifyContent: "space-between",
                        minHeight: {
                            sm: "0",
                        },
                    }}
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <IconButton
                            color="#454F5B"
                            edge="start"
                            onClick={() => setOpen(!open)}
                        >
                            <FiMenu />
                        </IconButton>
                        <Typography
                            color={"#ab003c"}
                            fontSize={"18px"}
                            fontWeight={"bold"}
                        >
                            Teknik Informatika
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            marginLeft: {
                                sm: "75px",
                            },
                        }}
                        display={{
                            xs: "none",
                            sm: "block",
                        }}
                    >
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={1}
                            sx={{
                                width: "250px",
                                backgroundColor: "#DFE3E8",
                                padding: "0 10px",
                                boxSizing: "border-box",
                                borderRadius: "3px",
                            }}
                        >
                            <FiSearch color="#637381" />
                            <InputBase
                                placeholder="Cari Sesuatu ..."
                                sx={{
                                    color: "#637381",
                                    fontWeight: "bold",
                                    placeholder: {
                                        color: "#637381",
                                        fontWeight: "bold",
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                    <Box display={"flex"} gap={1}>
                        <Avatar />
                        <Box
                            display={{
                                xs: "none",
                                md: "block",
                            }}
                        >
                            <Typography
                                color={"#212B36"}
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                }}
                            >
                                Ikbal Djaya
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color={"#637381"}
                                sx={{
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                }}
                            >
                                Administrator
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
