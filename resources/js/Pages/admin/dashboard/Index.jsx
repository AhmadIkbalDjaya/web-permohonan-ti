import { CalendarSection } from "../components/dasboard/CalendarSection";
import { ChartSection } from "../components/dasboard/ChartSection";
import { CountSection } from "../components/dasboard/CountSection";
import React from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head } from "@inertiajs/react";
import { Box, Typography } from "@mui/material";

const countDummy = {
    proposal_count: 70,
    new_proposal_count: 12,
    result_count: 65,
    new_result_count: 8,
    comprehensive_count: 80,
    new_comprehensive_count: 23,
    ppl_count: 68,
    new_ppl_count: 30,
};
const chartDummy = {
    data: [
        {
            name: "Proposal",
            data: [2, 5, 12, 8, 22, 6, 33, 40, 12, 20, 11, 32],
        },
        {
            name: "Hasil",
            data: [5, 15, 12, 22, 8, 15, 30, 25, 25, 13, 10, 22],
        },
        {
            name: "Kompren",
            data: [15, 0, 35, 25, 21, 14, 18, 28, 36, 19, 11, 11],
        },
        {
            name: "PPL",
            data: [0, 3, 6, 2, 9, 13, 24, 18, 22, 28, 34, 38],
        },
    ],
};
export default function Dashboard({ count, chart, calendar }) {
    console.log(calendar.schedules);
    return (
        <>
            <Head title="Dashboard" />
            <BaseLayout>
                <Typography fontSize={24} fontWeight={"bold"}>
                    Dashboard
                </Typography>
                <CountSection count={countDummy} />
                <ChartSection chart={chartDummy} />
                <CalendarSection calendar={calendar} />
            </BaseLayout>
            ;
        </>
    );
}
