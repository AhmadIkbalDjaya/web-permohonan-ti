import React from "react";
import {
    Box,
    Grid,
    Select,
    TextField,
    MenuItem,
    Typography,
} from "@mui/material";
import AppInputLabel from "../elements/input/AppInputLabel";
import InputErrorMessage from "../elements/input/InputErrorMessage";
import { semesterListItems } from "../elements/input/SemesterListItems";

export default function PplForm({
    formType = "create",
    pplCode = "",
    formValues,
    handleChangeForm,
    errors,
    lecturers,
    statuses,
    status_descriptions,
}) {
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
                <Box
                    sx={{ p: "15px" }}
                    borderBottom={"1px solid"}
                    borderColor={"slate-300"}
                    display={"flex"}
                    justifyContent={"space-between"}
                >
                    <Typography variant="body2" sx={{ fontWeight: "600" }}>
                        Data PPL
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: "600" }}>
                        {pplCode}
                    </Typography>
                </Box>
                <Grid container spacing={2} padding={"15px"}>
                    <Grid item xs={12} sm={6}>
                        <AppInputLabel
                            label="Status Permohonan"
                            required={true}
                        />
                        <Select
                            id="status_id"
                            name="status_id"
                            value={formValues.status_id}
                            onChange={handleChangeForm}
                            displayEmpty
                            error={errors.status_id ? true : false}
                            fullWidth
                            sx={{
                                textTransform: "capitalize",
                            }}
                        >
                            <MenuItem value="" disabled>
                                <Typography
                                    variant="body2"
                                    color="#ababab"
                                    fontWeight={"600"}
                                    display={"flex"}
                                >
                                    Status Permohonan
                                </Typography>
                            </MenuItem>
                            {statuses.map((status, index) => (
                                <MenuItem
                                    key={index}
                                    value={status.id}
                                    sx={{
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {status.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.status_id && (
                            <InputErrorMessage>
                                {errors.status_id}
                            </InputErrorMessage>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppInputLabel label="Deskripsi Status" />
                        <Select
                            id="status_description_id"
                            name="status_description_id"
                            value={formValues.status_description_id}
                            onChange={handleChangeForm}
                            displayEmpty
                            error={errors.status_description_id ? true : false}
                            fullWidth
                        >
                            <MenuItem value="" disabled>
                                <Typography
                                    variant="body2"
                                    color="#ababab"
                                    fontWeight={"600"}
                                    display={"flex"}
                                >
                                    Deskripsi Status
                                </Typography>
                            </MenuItem>
                            {status_descriptions.map((description, index) => {
                                if (
                                    description.status_id ==
                                    formValues.status_id
                                ) {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={description.id}
                                            sx={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {description.description}
                                        </MenuItem>
                                    );
                                }
                            })}
                        </Select>
                        {errors.status_description_id && (
                            <InputErrorMessage>
                                {errors.status_description_id}
                            </InputErrorMessage>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppInputLabel label="Nomor Surat Pembimbing" />
                        <TextField
                            id="letter_number_mentor"
                            name="letter_number_mentor"
                            type="string"
                            value={formValues.letter_number_mentor}
                            onChange={handleChangeForm}
                            placeholder="Masukkan Nomor Surat"
                            fullWidth
                            error={errors.letter_number_mentor ? true : false}
                            helperText={errors.letter_number_mentor ?? ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppInputLabel label="Nomor Surat Pengantar" />
                        <TextField
                            id="letter_number_introduction"
                            name="letter_number_introduction"
                            type="string"
                            value={formValues.letter_number_introduction}
                            onChange={handleChangeForm}
                            placeholder="Masukkan Nomor Surat"
                            fullWidth
                            error={
                                errors.letter_number_introduction ? true : false
                            }
                            helperText={errors.letter_number_introduction ?? ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppInputLabel label="Tanggal Surat" />
                        <TextField
                            id="letter_date"
                            name="letter_date"
                            type="date"
                            value={formValues.letter_date}
                            onChange={handleChangeForm}
                            placeholder="Masukkan Nomor Surat"
                            fullWidth
                            error={errors.letter_date ? true : false}
                            helperText={errors.letter_date ?? ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppInputLabel label="Ditujukan Kepada" />
                        <TextField
                            id="addressed_to"
                            name="addressed_to"
                            type="string"
                            value={formValues.addressed_to}
                            onChange={handleChangeForm}
                            placeholder="Surat Ditujukan Kepada"
                            fullWidth
                            error={errors.addressed_to ? true : false}
                            helperText={errors.addressed_to ?? ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="body2"
                            color="initial"
                            sx={{ fontWeight: "600" }}
                        >
                            Data PPL :
                        </Typography>
                    </Grid>
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
                    <Grid item xs={12} sm={6}>
                        <AppInputLabel label="Pembimbing PPL" />
                        <Select
                            id="mentor_id"
                            name="mentor_id"
                            value={formValues.mentor_id}
                            onChange={handleChangeForm}
                            displayEmpty
                            error={errors.mentor_id ? true : false}
                            fullWidth
                            sx={{ textTransform: "capitalize" }}
                        >
                            <MenuItem value="" disabled>
                                <Typography
                                    variant="body2"
                                    color="#ababab"
                                    fontWeight={"600"}
                                    display={"flex"}
                                >
                                    Pembimbing
                                </Typography>
                            </MenuItem>
                            {lecturers.map((lecturer, index) => (
                                <MenuItem
                                    key={index}
                                    value={lecturer.id}
                                    sx={{
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {lecturer.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.mentor_id && (
                            <InputErrorMessage>
                                {errors.mentor_id}
                            </InputErrorMessage>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                        sx={{ p: "15px", fontWeight: "600" }}
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
