import React from "react";
import { Box, Button, FormHelperText, Grid, Typography } from "@mui/material";
import AppInputLabel from "./elements/input/AppInputLabel";
import InputFileUpload from "./elements/input/InputFileUpload";
import InputErrorMessage from "./elements/input/InputErrorMessage";
import { FaFilePdf } from "react-icons/fa";
export function DocumentsEditFormCard({
    file_requirements,
    handleChangeForm,
    formValues,
    errors,
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
                Berkas
            </Typography>
            <Grid container spacing={2} padding={"15px"}>
                {file_requirements.map((file_requirement, index) => {
                    return (
                        <Grid item xs={12} key={index}>
                            <AppInputLabel
                                label={file_requirement.name.replaceAll(
                                    "_",
                                    " "
                                )}
                            />
                            <Box display={"flex"} gap={2}>
                                <Box flexGrow={1}>
                                    <InputFileUpload
                                        id="name"
                                        name={file_requirement.slug}
                                        type="file"
                                        accept={".pdf"}
                                        onChange={handleChangeForm}
                                    />
                                </Box>
                                {files.map((file, index) => {
                                    return file.name ==
                                        file_requirement.name ? (
                                        <Box key={index} flexGrow={1}>
                                            <Button
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
                                        </Box>
                                    ) : (
                                        ""
                                    );
                                })}
                            </Box>
                            {formValues.files[file_requirement.slug] ? (
                                <FormHelperText
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography variant="">
                                        File:{" "}
                                        {formValues.files[
                                            file_requirement.slug
                                        ].name.substring(0, 20)}
                                    </Typography>
                                    <Typography variant="">
                                        {(
                                            formValues.files[
                                                file_requirement.slug
                                            ].size / 1024
                                        ).toFixed(0)}{" "}
                                        KB
                                    </Typography>
                                </FormHelperText>
                            ) : (
                                ""
                            )}
                            {errors[file_requirement.slug] && (
                                <InputErrorMessage px={"0px"}>
                                    {errors[file_requirement.slug]}
                                </InputErrorMessage>
                            )}
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
