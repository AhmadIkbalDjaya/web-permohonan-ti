import {
    Box,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import AppInputLabel from "../../admin/components/elements/input/AppInputLabel";
import { semesterListItems } from "../../admin/components/elements/input/SemesterListItems";
import InputErrorMessage from "../../admin/components/elements/input/InputErrorMessage";

export default function PplForm({ formValues, handleChangeForm, errors }) {
    return (
        <>
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
                    Data PPL
                </Typography>
                <Grid container spacing={2} padding={"15px"}>
                    <Grid item xs={12}>
                        <AppInputLabel label="Lokasi PPL" required={true} />
                        <TextField
                            id="location"
                            name="location"
                            type="string"
                            value={formValues.location}
                            onChange={handleChangeForm}
                            placeholder="Masukkan Nama Instansi PPL"
                            fullWidth
                            error={errors.location ? true : false}
                            helperText={errors.location ?? ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AppInputLabel label="Alamat Lokasi" required={true} />
                        <TextField
                            id="location_address"
                            name="location_address"
                            type="string"
                            multiline
                            rows={2}
                            value={formValues.location_address}
                            onChange={handleChangeForm}
                            placeholder="Masukkan Alamat Lokasi PPL"
                            fullWidth
                            error={errors.location_address ? true : false}
                            helperText={errors.location_address ?? ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppInputLabel label="Tanggal Mulai" required={true} />
                        <TextField
                            id="start_date"
                            name="start_date"
                            type="date"
                            value={formValues.start_date}
                            onChange={handleChangeForm}
                            fullWidth
                            error={errors.start_date ? true : false}
                            helperText={errors.start_date ?? ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppInputLabel
                            label="Tanggal Selesai"
                            required={true}
                        />
                        <TextField
                            id="end_date"
                            name="end_date"
                            type="date"
                            value={formValues.end_date}
                            onChange={handleChangeForm}
                            fullWidth
                            error={errors.end_date ? true : false}
                            helperText={errors.end_date ?? ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AppInputLabel
                            label="Jumlah Mahasiswa PPL"
                            required={true}
                        />
                        <TextField
                            id="student_count"
                            name="student_count"
                            type="number"
                            value={formValues.student_count}
                            onChange={handleChangeForm}
                            inputProps={{
                                min: 1,
                                max: 3,
                            }}
                            onKeyDown={(e) => {
                                e.preventDefault();
                            }}
                            fullWidth
                            error={errors.student_count ? true : false}
                            helperText={errors.student_count ?? ""}
                        />
                    </Grid>
                </Grid>
            </Box>
            {Array.from({ length: formValues.student_count }, (e, index) => (
                <Box
                    key={index}
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
                        Data Mahasiswa Ke-{index + 1}
                    </Typography>
                    <Grid container spacing={2} padding={"15px"}>
                        <Grid item xs={12} sm={6}>
                            <AppInputLabel label="Nama" required={true} />
                            <TextField
                                id="name"
                                name="names"
                                type="string"
                                value={formValues.names[index]}
                                onChange={(e) => {
                                    handleChangeForm(e, index);
                                }}
                                placeholder="Masukkan Nama Mahasiswa"
                                fullWidth
                                error={errors[`names.${index}`] ? true : false}
                                helperText={errors[`names.${index}`] ?? ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppInputLabel label="NIM" required={true} />
                            <TextField
                                id="nim"
                                name="nims"
                                type="number"
                                value={formValues.nims[index]}
                                onChange={(e) => {
                                    handleChangeForm(e, index);
                                }}
                                placeholder="Masukkan NIM"
                                fullWidth
                                error={errors[`nims.${index}`] ? true : false}
                                helperText={errors[`nims.${index}`] ?? ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppInputLabel
                                label="Tempat Lahir"
                                required={true}
                            />
                            <TextField
                                id="pob"
                                name="pobs"
                                type="string"
                                value={formValues.pobs[index]}
                                onChange={(e) => {
                                    handleChangeForm(e, index);
                                }}
                                placeholder="Masukkan Tempat Lahir"
                                fullWidth
                                error={errors[`pobs.${index}`] ? true : false}
                                helperText={errors[`pobs.${index}`] ?? ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppInputLabel
                                label="Tanggal Lahir"
                                required={true}
                            />
                            <TextField
                                id="dob"
                                name="dobs"
                                type="date"
                                value={formValues.dobs[index]}
                                onChange={(e) => {
                                    handleChangeForm(e, index);
                                }}
                                placeholder="Masukkan Tanggal Lahir"
                                fullWidth
                                error={errors[`dobs.${index}`] ? true : false}
                                helperText={errors[`dobs.${index}`] ?? ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppInputLabel label="Semester" required={true} />
                            <Select
                                id="semester"
                                name="semesters"
                                value={formValues.semesters[index]}
                                onChange={(e) => {
                                    handleChangeForm(e, index);
                                }}
                                fullWidth
                                displayEmpty
                                error={
                                    errors[`semesters.${index}`] ? true : false
                                }
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
                                        <MenuItem
                                            key={i}
                                            value={semester.value}
                                        >
                                            {semester.body}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            {errors[`semesters.${index}`] && (
                                <InputErrorMessage>
                                    {errors[`semesters.${index}`]}
                                </InputErrorMessage>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppInputLabel
                                label="Nomor Telepon"
                                required={true}
                            />
                            <TextField
                                id="phone"
                                name="phones"
                                type="number"
                                value={formValues.phones[index]}
                                onChange={(e) => {
                                    handleChangeForm(e, index);
                                }}
                                placeholder="Masukkan Nomor Telepon"
                                fullWidth
                                error={errors[`phones.${index}`] ? true : false}
                                helperText={errors[`phones.${index}`] ?? ""}
                            />
                        </Grid>
                    </Grid>
                </Box>
            ))}
        </>
    );
}
