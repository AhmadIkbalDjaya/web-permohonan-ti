import { Grid, Typography } from "@mui/material";
import React from "react";
export function ShowRowData({ name, value }) {
    return (
        <Grid item container spacing={1}>
            <Grid item xs={5} display={"flex"} justifyContent={"space-between"}>
                <Typography variant="body2" fontWeight={"500"}>
                    {name}
                </Typography>
                <Typography variant="body2" fontWeight={"500"}>
                    :
                </Typography>
            </Grid>
            <Grid item xs={7}>
                <Typography variant="body2" fontWeight={"500"}>
                    {value ?? "-"}
                </Typography>
            </Grid>
        </Grid>
    );
}
