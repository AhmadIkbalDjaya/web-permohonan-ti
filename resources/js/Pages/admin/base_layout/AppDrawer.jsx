import React from "react";
import { Drawer, DrawerHeader } from "./BaseLayout";
import { List } from "@mui/material";
import DrawerListItem from "./DrawerListItem";
import { TiHome } from "react-icons/ti";
import { MdArticle } from "react-icons/md";
import { RiArticleFill, RiComputerFill } from "react-icons/ri";
import { HiClipboardDocumentList } from "react-icons/hi2";
export function AppDrawer({ open }) {
    return (
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
                    icon={<HiClipboardDocumentList size={24} color="white" />}
                    text={"Kompren"}
                />
                <DrawerListItem
                    open={open}
                    toPage={"/admin/ppl"}
                    icon={<RiComputerFill size={24} color="white" />}
                    text={"PPL"}
                />
            </List>
        </Drawer>
    );
}
