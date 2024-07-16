import { Box, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import AppInputLabel from "../elements/input/AppInputLabel";
import InputErrorMessage from "../elements/input/InputErrorMessage";

export default function LecturerForm({
    formType = "create",
    formValues,
    errors,
    handleChangeForm,
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
                sx={{ p: "15px", fontWeight: "600" }}
                borderBottom={"1px solid"}
                borderColor={"slate-300"}
            >
                Data Staf
            </Typography>
            <Grid container spacing={2} padding={"15px"}>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Nama Lengkap" required />
                    <TextField
                        id="name"
                        name="name"
                        type="string"
                        value={formValues.name}
                        onChange={handleChangeForm}
                        placeholder="Masukkan Nama Staf"
                        fullWidth
                        error={errors.name ? true : false}
                        helperText={errors.name ?? ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="NIP" />
                    <TextField
                        id="nip"
                        name="nip"
                        type="string"
                        value={formValues.nip}
                        onChange={handleChangeForm}
                        placeholder="Masukkan Nama Staf"
                        fullWidth
                        error={errors.nip ? true : false}
                        helperText={errors.nip ?? ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Jenis Kelamin" required />
                    <Select
                        id="gender"
                        name="gender"
                        value={formValues.gender}
                        onChange={handleChangeForm}
                        displayEmpty
                        error={errors.gender ? true : false}
                        fullWidth
                    >
                        <MenuItem value="" disabled>
                            <Typography
                                variant="body2"
                                color="#ababab"
                                fontWeight={"600"}
                                display={"flex"}
                            >
                                Pilih Jenis Kelamin
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            value="male"
                            sx={{
                                textTransform: "capitalize",
                            }}
                        >
                            Laki-Laki
                        </MenuItem>
                        <MenuItem
                            value="female"
                            sx={{
                                textTransform: "capitalize",
                            }}
                        >
                            Perempuan
                        </MenuItem>
                    </Select>
                    {errors.gender && (
                        <InputErrorMessage>{errors.gender}</InputErrorMessage>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Role" required />
                    <Select
                        id="role"
                        name="role"
                        value={formValues.role}
                        onChange={handleChangeForm}
                        displayEmpty
                        error={errors.role ? true : false}
                        fullWidth
                    >
                        <MenuItem value="" disabled>
                            <Typography
                                variant="body2"
                                color="#ababab"
                                fontWeight={"600"}
                                display={"flex"}
                            >
                                Pilih Peran
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            value="head"
                            sx={{
                                textTransform: "capitalize",
                            }}
                        >
                            Ketua Jurusan
                        </MenuItem>
                        <MenuItem
                            value="secretary"
                            sx={{
                                textTransform: "capitalize",
                            }}
                        >
                            Sekertaris Jurusan
                        </MenuItem>
                        <MenuItem
                            value="lecturer"
                            sx={{
                                textTransform: "capitalize",
                            }}
                        >
                            Dosen
                        </MenuItem>
                        <MenuItem
                            value="staff"
                            sx={{
                                textTransform: "capitalize",
                            }}
                        >
                            Staf
                        </MenuItem>
                    </Select>
                    {errors.role && (
                        <InputErrorMessage>{errors.role}</InputErrorMessage>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}
