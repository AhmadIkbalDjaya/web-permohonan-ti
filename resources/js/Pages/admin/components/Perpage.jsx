import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
export function Perpage({ handleChangePerpage, value }) {
    const showItemOptions = [5, 10, 15, 20, 25];
    return (
        <Box display={"flex"} gap={1}>
            <Typography color={"gray-500"} fontWeight={"400"}>
                Tampilkan
            </Typography>
            <FormControl size="small">
                <Select
                    name="perpage"
                    value={value}
                    onChange={handleChangePerpage}
                    style={{
                        height: "25px",
                    }}
                    sx={{
                        border: "1px solid gray-500",
                    }}
                >
                    {showItemOptions.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            <Typography color={"gray-500"} fontSize={"14px"}>
                                {option}
                            </Typography>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography color={"gray-500"} fontWeight={"400"}>
                Data
            </Typography>
        </Box>
    );
}
