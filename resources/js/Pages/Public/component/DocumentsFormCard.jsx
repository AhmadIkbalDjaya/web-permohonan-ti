import { Box, FormHelperText, Grid, Typography } from "@mui/material";
import React from "react";
import AppInputLabel from "../../admin/components/elements/input/AppInputLabel";
import InputFileUpload from "../../admin/components/elements/input/InputFileUpload";
import InputErrorMessage from "../../admin/components/elements/input/InputErrorMessage";

export function DocumentsFormCard({
    file_requirements,
    handleChangeForm,
    formValues,
    errors,
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
                                label={file_requirement.name}
                                required={file_requirement.is_required}
                            />
                            <InputFileUpload
                                id="name"
                                name={file_requirement.slug}
                                type="file"
                                accept={".pdf"}
                                onChange={handleChangeForm}
                            />
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
