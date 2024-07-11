import { CalendarSection } from "../components/dasboard/CalendarSection";
import { ChartSection } from "../components/dasboard/ChartSection";
import { CountSection } from "../components/dasboard/CountSection";
import React from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head } from "@inertiajs/react";
import { Box, Typography } from "@mui/material";

export default function Dashboard({ count, chart }) {
    return (
        <>
            <Head title="Dashboard" />
            <BaseLayout>
                <Typography fontSize={24} fontWeight={"bold"}>
                    Dashboard
                </Typography>
                <CountSection count={count} />
                <ChartSection chart={chart} />
                <CalendarSection />
            </BaseLayout>
            ;
        </>
    );
}
