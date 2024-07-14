import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box } from "@mui/material";
import { router } from "@inertiajs/react";

export function CalendarSection({ calendar }) {
    const events = [];
    calendar.schedules.forEach((schedule, index) => {
        events[index] = {
            title: `${schedule.start_time.substring(0, 5)} - ${schedule.name}`,
            start: schedule.date,
            display: "list-item",
            color: schedule.type == "proposal" ? "blue" : "yellow",
            relation_id: schedule.relation_id,
            type: schedule.type,
        };
    });
    console.log(events);
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
                weekends={false}
                events={events}
                // events={[
                //     {
                //         title: "10:00 - Muh Izulhaq",
                //         start: "2024-07-12",
                //         display: "list-item",
                //         color: "red",
                //     },
                //     {
                //         title: "Meeting",
                //         start: "2024-07-01",
                //         display: "list-item",
                //     },
                //     {
                //         title: "Meeting",
                //         start: "2024-07-01",
                //         display: "list-item",
                //     },
                //     {
                //         title: "Meeting",
                //         start: "2024-07-01",
                //         display: "list-item",
                //     },
                //     {
                //         title: "Meeting",
                //         start: "2024-07-01",
                //         display: "list-item",
                //     },
                // ]}
                dayMaxEventRows={true}
                handleWindowResize={true}
                // eventClick={(e) => {
                //     // console.log(i);
                //     console.log(e.event.color);
                //     // alert("ok");
                // }}
                eventClick={function (info) {
                    // console.log(info.event._def.extendedProps.realtion_id);
                    // console.log(info.event._def);
                    const type = info.event._def.extendedProps.type;
                    const relation_id =
                        info.event._def.extendedProps.relation_id;
                    router.get(
                        route(`admin.${type}.show`, {
                            [type]: `${relation_id}`,
                        })
                    );
                }}
            />
        </Box>
    );
}
