import { CountSection } from "../components/dasboard/CountSection";
import React from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head } from "@inertiajs/react";
import { Typography } from "@mui/material";

export default function Dashboard({ count }) {
    return (
        <>
            <Head title="Dashboard" />
            <BaseLayout>
                <Typography fontSize={24} fontWeight={"bold"}>
                    Dashboard
                </Typography>
                <CountSection count />
            </BaseLayout>
            ;
        </>
    );
}
