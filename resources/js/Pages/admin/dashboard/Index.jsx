import React from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head } from "@inertiajs/react";
import { Typography } from "@mui/material";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <BaseLayout>
                <Typography fontSize={24} fontWeight={"bold"}>Dashboard</Typography>
            </BaseLayout>
            ;
        </>
    );
}
