import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
export function ShowApplicantDocumentsCard({
    file_requirements,
    files,
    handleClickShowPDF,
}) {
    return (
        <Box
            sx={{
                background: "white",
                border: ".5px solid",
                borderColor: "slate-300",
                borderRadius: "4px",
            }}
        >
            <Typography
                variant="body2"
                color="initial"
                sx={{
                    p: "15px",
                    fontWeight: "600",
                }}
                borderBottom={"1px solid"}
                borderColor={"slate-300"}
            >
                Berkas Pemohon
            </Typography>
            <Grid container spacing={2} padding={"15px"}>
                {file_requirements.map((file_requirement, index) => {
                    const anyFileMatches = files.some(
                        (file) => file.name === file_requirement.name
                    );
                    return (
                        <Grid item xs={12} container key={index}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    color="initial"
                                    fontWeight={"600"}
                                    display={"flex"}
                                    sx={{
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {file_requirement.name.replaceAll("_", " ")}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {files.map(
                                    (file, index) =>
                                        file.name == file_requirement.name && (
                                            <Button
                                                key={index}
                                                variant="contained"
                                                color="gray-100"
                                                startIcon={<FaFilePdf />}
                                                sx={{
                                                    height: "33px",
                                                    textTransform: "capitalize",
                                                }}
                                                fullWidth
                                                onClick={() => {
                                                    handleClickShowPDF(
                                                        file.name.replaceAll(
                                                            "_",
                                                            " "
                                                        ),
                                                        file.file
                                                    );
                                                }}
                                            >
                                                Lihat
                                            </Button>
                                        )
                                )}
                                {!anyFileMatches && (
                                    <Typography variant="body2">
                                        Tidak Ada Berkas
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
