import { Link } from "@inertiajs/react";
import {
    AppBar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Slide,
    Toolbar,
    Typography,
    useScrollTrigger,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoMenu } from "react-icons/io5";
import AppLink from "../../admin/components/AppLink";

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function PublicAppbar(props) {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <HideOnScroll {...props}>
                <Box
                    sx={{
                        position: "fixed",
                        top: "5px",
                        left: "5px",
                        right: "5px",
                        zIndex: 1100,
                    }}
                >
                    <AppBar position="static">
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href={route("home")}
                                    sx={{
                                        mr: 2,
                                        display: { xs: "none", md: "flex" },
                                        fontFamily: "monospace",
                                        fontWeight: 700,
                                        letterSpacing: ".3rem",
                                        color: "inherit",
                                        textDecoration: "none",
                                    }}
                                >
                                    TI-UINAM
                                </Typography>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: { xs: "flex", md: "none" },
                                    }}
                                >
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                    >
                                        <IoMenu />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "left",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "left",
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{
                                            display: {
                                                xs: "block",
                                                md: "none",
                                            },
                                        }}
                                    >
                                        <MenuItem>
                                            <AppLink
                                                color={"black"}
                                                fontSize={"16px"}
                                                href="/"
                                            >
                                                Home
                                            </AppLink>
                                        </MenuItem>
                                        <MenuItem>
                                            <AppLink
                                                color={"black"}
                                                fontSize={"16px"}
                                                href="/"
                                            >
                                                Daftar
                                            </AppLink>
                                        </MenuItem>
                                        <MenuItem>
                                            <AppLink
                                                color={"black"}
                                                fontSize={"16px"}
                                                href={route("status.check")}
                                            >
                                                Cek Status
                                            </AppLink>
                                        </MenuItem>
                                        <MenuItem>
                                            <AppLink
                                                color={"black"}
                                                fontSize={"16px"}
                                                href="/"
                                            >
                                                Tentang Kami
                                            </AppLink>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                                <Typography
                                    variant="h5"
                                    noWrap
                                    component="a"
                                    href="#app-bar-with-responsive-menu"
                                    sx={{
                                        mr: 2,
                                        display: { xs: "flex", md: "none" },
                                        flexGrow: 1,
                                        fontFamily: "monospace",
                                        fontWeight: 700,
                                        letterSpacing: ".3rem",
                                        color: "inherit",
                                        textDecoration: "none",
                                    }}
                                >
                                    TI-UINAM
                                </Typography>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: { xs: "none", md: "flex" },
                                        gap: 3,
                                        justifyContent: "end",
                                    }}
                                >
                                    <AppLink
                                        href={route("home")}
                                        color={"#FFF"}
                                        fontSize={"16px"}
                                    >
                                        Home
                                    </AppLink>
                                    <AppLink
                                        href="#daftar-card"
                                        color={"#FFF"}
                                        fontSize={"16px"}
                                    >
                                        Daftar
                                    </AppLink>
                                    <AppLink
                                        href={route("status.check")}
                                        color={"#FFF"}
                                        fontSize={"16px"}
                                    >
                                        Cek Status
                                    </AppLink>
                                    <AppLink
                                        href="#tentang"
                                        color={"#FFF"}
                                        fontSize={"16px"}
                                    >
                                        Tentang Kami
                                    </AppLink>
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>
                </Box>
            </HideOnScroll>
        </>
    );
}
