import { Box } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";

export function ChartSection({ chart }) {
    const series = chart.data;
    const options = {
        chart: {
            height: 350,
            type: "line",
            dropShadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
            },
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ["#375DFB", "#CA8A04", "#DC2626", "#16A34A"],
        dataLabels: {
            // enabled: true,
        },
        stroke: {
            curve: "smooth",
        },
        title: {
            text: "Grafik Pendaftaran Tahun Ini",
            align: "left",
        },
        grid: {
            borderColor: "#e7e7e7",
            row: {
                // colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                // opacity: 0.5,
            },
        },
        markers: {
            // size: 1,
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "Mei",
                "Jun",
                "Jul",
                "Agu",
                "Sep",
                "Okt",
                "Nov",
                "Des",
            ],
            title: {
                text: "",
            },
        },
        yaxis: {
            title: {
                text: "Jumlah Pendaftar",
            },
            min: 0,
            max: 40,
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
    };
    return (
        <Box
            sx={{
                py: 2,
                px: 2,
                background: "white",
                borderRadius: "5px",
                boxShadow: 1,
            }}
        >
            <Chart options={options} series={series} type="line" height={350} />
        </Box>
    );
}
