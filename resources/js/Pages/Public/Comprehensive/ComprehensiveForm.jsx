import React from "react";
import {
    Box,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import AppInputLabel from "../../admin/components/elements/input/AppInputLabel";
import { semesterListItems } from "../../admin/components/elements/input/SemesterListItems";
import InputErrorMessage from "../../admin/components/elements/input/InputErrorMessage";

export default function ComprehensiveForm({
    formValues,
    handleChangeForm,
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
                sx={{ p: "15px", fontWeight: "600" }}
                borderBottom={"1px solid"}
                borderColor={"slate-300"}
            >
                Data Mahasiswa
            </Typography>
            <Grid container spacing={2} padding={"15px"}>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Nama" required={true} />
                    <TextField
                        id="name"
                        name="name"
                        type="string"
                        value={formValues.name}
                        onChange={handleChangeForm}
                        placeholder="Masukkan Nama Mahasiswa"
                        fullWidth
                        error={errors.name ? true : false}
                        helperText={errors.name ?? ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="NIM" required={true} />
                    <TextField
                        id="nim"
                        name="nim"
                        type="number"
                        value={formValues.nim}
                        onChange={handleChangeForm}
                        placeholder="Masukkan NIM"
                        fullWidth
                        error={errors.nim ? true : false}
                        helperText={errors.nim ?? ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Tempat Lahir" required={true} />
                    <TextField
                        id="pob"
                        name="pob"
                        type="string"
                        value={formValues.pob}
                        onChange={handleChangeForm}
                        placeholder="Masukkan Tempat Lahir"
                        fullWidth
                        error={errors.pob ? true : false}
                        helperText={errors.pob ?? ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Tanggal Lahir" required={true} />
                    <TextField
                        id="dob"
                        name="dob"
                        type="date"
                        value={formValues.dob}
                        onChange={handleChangeForm}
                        placeholder="Masukkan Tanggal Lahir"
                        fullWidth
                        error={errors.dob ? true : false}
                        helperText={errors.dob ?? ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Semester" required={true} />
                    <Select
                        id="semester"
                        name="semester"
                        value={formValues.semester}
                        onChange={handleChangeForm}
                        fullWidth
                        displayEmpty
                        error={errors.semester ? true : false}
                    >
                        <MenuItem value="" disabled>
                            <Typography
                                variant="body2"
                                color="#ababab"
                                fontWeight={"600"}
                                display={"flex"}
                            >
                                Semester Saat Ini
                            </Typography>
                        </MenuItem>
                        {semesterListItems.map((semester, i) => {
                            return (
                                <MenuItem key={i} value={semester.value}>
                                    {semester.body}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    {errors.semester && (
                        <InputErrorMessage>{errors.semester}</InputErrorMessage>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Nomor Telepon" required={true} />
                    <TextField
                        id="phone"
                        name="phone"
                        type="number"
                        value={formValues.phone}
                        onChange={handleChangeForm}
                        placeholder="Masukkan Nomor Telepon"
                        fullWidth
                        error={errors.phone ? true : false}
                        helperText={errors.phone ?? ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AppInputLabel label="Judul Skripsi" required={true} />
                    <TextField
                        id="essay_title"
                        name="essay_title"
                        type="string"
                        value={formValues.essay_title}
                        onChange={handleChangeForm}
                        placeholder="Masukkan Judul Skripsi"
                        fullWidth
                        multiline
                        rows={2}
                        error={errors.essay_title ? true : false}
                        helperText={errors.essay_title ?? ""}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
