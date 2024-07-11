import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box } from "@mui/material";

export function CalendarSection() {
    return (
        <Box
            sx={{
                mt: 3,
                py: 2,
                px: 2,
                background: "white",
                borderRadius: "5px",
                boxShadow: 1,
            }}
        >
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={false} // height={500}
                events={[
                    {
                        title: "10:00 - Muh Izulhaq",
                        start: "2024-07-12",
                        display: "list-item",
                        color: "red",
                    },
                    {
                        title: "Meeting",
                        start: "2024-07-01",
                        display: "list-item",
                    },
                    {
                        title: "Meeting",
                        start: "2024-07-01",
                        display: "list-item",
                    },
                    {
                        title: "Meeting",
                        start: "2024-07-01",
                        display: "list-item",
                    },
                    {
                        title: "Meeting",
                        start: "2024-07-01",
                        display: "list-item",
                    },
                ]}
                dayMaxEventRows={true}
            />
        </Box>
    );
}
