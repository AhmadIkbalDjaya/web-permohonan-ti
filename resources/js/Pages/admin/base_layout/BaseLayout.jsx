import { Head } from "@inertiajs/react";
import {
    Avatar,
    Box,
    Container,
    CssBaseline,
    IconButton,
    InputBase,
    List,
    Toolbar,
    Typography,
    styled,
} from "@mui/material";
import React, { useContext } from "react";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { FiMenu, FiSearch } from "react-icons/fi";
import { TiHome } from "react-icons/ti";
import { DrawerOpen } from "../../../context/DrawerOpen";
import DrawerListItem from "./DrawerListItem";
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function BaseLayout(props) {
    const { open, setOpen } = useContext(DrawerOpen);
    const { children } = props;
    return (
        <>
            <Head title="Dashboard" />
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
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
                                display={{ xs: "none", sm: "block" }}
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
                                <Box display={{ xs: "none", md: "block" }}>
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
                <Drawer
                    variant="permanent"
                    open={open}
                    PaperProps={{
                        style: {
                            background: "#B20600",
                        },
                    }}
                >
                    <DrawerHeader />
                    <List
                        sx={{
                            margin: open ? "0 15px" : "0",
                            marginTop: "15px",
                        }}
                    >
                        <DrawerListItem
                            open={open}
                            toPage={"/"}
                            icon={<TiHome size={24} color="white" />}
                            text={"Dashboard"}
                        />
                    </List>
                </Drawer>
                <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    {children}
                </Box>
            </Box>
        </>
    );
}
