import { CountCard } from "../components/dasboard/CountCard";
import React from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head } from "@inertiajs/react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { MdArticle } from "react-icons/md";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <BaseLayout>
                <Typography fontSize={24} fontWeight={"bold"}>
                    Dashboard
                </Typography>
                <Box display={"flex"} columnGap={3} justifyContent={"space-between"}>
                    <CountCard />
                    <CountCard />
                    <CountCard />
                    <CountCard />
                </Box>
            </BaseLayout>
            ;
        </>
    );
}
