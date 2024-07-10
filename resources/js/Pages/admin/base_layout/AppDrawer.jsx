import React from "react";
import { Drawer, DrawerHeader } from "./BaseLayout";
import { Box, List, Typography } from "@mui/material";
import DrawerListItem from "./DrawerListItem";
import { TiHome } from "react-icons/ti";
import { MdArticle } from "react-icons/md";
import { RiArticleFill, RiComputerFill } from "react-icons/ri";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoLogOut } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
export function AppDrawer({ open }) {
    return (
        <Drawer
            variant="permanent"
            open={open}
            PaperProps={{
                style: {
                    background: "#003399",
                },
            }}
        >
            <DrawerHeader />
            <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                sx={{
                    height: "100%",
                }}
            >
                <List
                    sx={{
                        margin: open ? "0 15px" : "0",
                    }}
                >
                    <DrawerListItem
                        open={open}
                        toPage={"/admin"}
                        icon={<TiHome size={24} color="white" />}
                        text={"Dashboard"}
                    />
                    <DrawerListItem
                        open={open}
                        toPage={"/admin/proposal"}
                        icon={<MdArticle size={24} color="white" />}
                        text={"Proposal"}
                    />
                    <DrawerListItem
                        open={open}
                        toPage={"/admin/hasil"}
                        icon={<RiArticleFill size={24} color="white" />}
                        text={"Hasil"}
                    />
                    <DrawerListItem
                        open={open}
                        toPage={"/admin/kompren"}
                        icon={
                            <HiClipboardDocumentList size={24} color="white" />
                        }
                        text={"Kompren"}
                    />
                    <DrawerListItem
                        open={open}
                        toPage={"/admin/ppl"}
                        icon={<RiComputerFill size={24} color="white" />}
                        text={"PPL"}
                    />
                    <Typography
                        variant="caption"
                        color="gray-400"
                        fontWeight={600}
                        fontSize={14}
                        sx={{ px: 1.5 }}
                    >
                        {open ? "Master Data" : ""}
                    </Typography>
                    <DrawerListItem
                        open={open}
                        toPage={"/admin/lecturer"}
                        icon={<FaChalkboardTeacher size={24} color="white" />}
                        text={"Dosen & Staff"}
                    />
                </List>
                <List
                    sx={{
                        margin: open ? "0 15px" : "0",
                    }}
                >
                    <DrawerListItem
                        open={open}
                        toPage={route("logout")}
                        icon={<IoLogOut size={24} color="white" />}
                        text={"Logout"}
                    />
                </List>
            </Box>
        </Drawer>
    );
}
