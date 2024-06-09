import React from "react";
import { AppBar } from "./BaseLayout";
import {
    Avatar,
    Box,
    Container,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { FiMenu, FiSearch } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { router, usePage } from "@inertiajs/react";
export function AppAppBar({ setOpen, open }) {
    const auth = usePage().props.auth;
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
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
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <IconButton
                            color="#454F5B"
                            edge="start"
                            onClick={() => setOpen(!open)}
                        >
                            <FiMenu />
                        </IconButton>
                        <Typography
                            color={"primary"}
                            fontSize={"18px"}
                            fontWeight={"800"}
                            letterSpacing={3}
                        >
                            TI-UINAM
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            marginLeft: {
                                sm: "85px",
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
                    <Box>
                        <Tooltip title="Open settings">
                            <Box
                                display={"flex"}
                                gap={1}
                                onClick={handleOpenUserMenu}
                            >
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
                                        {auth.user.name}
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
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem
                                onClick={() => {
                                    router.get(route("logout"));
                                }}
                            >
                                <Box
                                    display={"flex"}
                                    gap={1}
                                    alignItems={"center"}
                                >
                                    <LuLogOut size={20} />
                                    <Typography
                                        textAlign="center"
                                        fontWeight={500}
                                    >
                                        Logout
                                    </Typography>
                                </Box>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
