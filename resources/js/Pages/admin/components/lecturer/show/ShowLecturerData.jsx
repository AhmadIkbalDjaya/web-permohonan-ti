import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { ShowRowData } from "../../ShowRowData";
import { convertGenderToID, convertRoleToID } from "../../../../../helper/dataToIdHelper";

export default function ShowLecturerData({ lecturer }) {
    return (
        <Box
            sx={{
                background: "white",
                border: ".5px solid",
                borderColor: "slate-300",
                borderRadius: "4px",
            }}
        >
            <Box
                sx={{ p: "15px" }}
                borderBottom={"1px solid"}
                borderColor={"slate-300"}
            >
                <Typography variant="body2" sx={{ fontWeight: "600" }}>
                    Data Staf
                </Typography>
            </Box>
            <Grid container spacing={1} padding={"15px"}>
                <ShowRowData name={"Nama"} value={lecturer.name} />
                <ShowRowData name={"NIP"} value={lecturer.nip} />
                <ShowRowData
                    name={"Jenis Kelamin"}
                    value={
                        lecturer.gender
                            ? convertGenderToID(lecturer.gender)
                            : ""
                    }
                />
                <ShowRowData
                    name={"Role"}
                    value={lecturer.role ? convertRoleToID(lecturer.role) : ""}
                />
            </Grid>
        </Box>
    );
}
