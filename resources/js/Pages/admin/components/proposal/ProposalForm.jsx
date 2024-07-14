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

export default function ProposalForm({
    formType = "create",
    proposalCode = "",
    formValues,
    handleChangeForm,
    errors,
    lecturers,
    statuses,
    status_descriptions,
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
            <Box
                sx={{ p: "15px" }}
                borderBottom={"1px solid"}
                borderColor={"slate-300"}
                display={"flex"}
                justifyContent={"space-between"}
            >
                <Typography variant="body2" sx={{ fontWeight: "600" }}>
                    Data Seminar
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "600" }}>
                    {proposalCode}
                </Typography>
            </Box>
            <Grid container spacing={2} padding={"15px"}>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Status Permohonan" />
                    <Select
                        id="status_id"
                        name="status_id"
                        value={formValues.status_id}
                        onChange={handleChangeForm}
                        displayEmpty
                        error={errors.status_id ? true : false}
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
                            if (description.status_id == formValues.status_id) {
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
                    <AppInputLabel label="Nomor Surat" />
                    <TextField
                        id="letter_number"
                        name="letter_number"
                        type="string"
                        value={formValues.letter_number}
                        onChange={handleChangeForm}
                        placeholder="Masukkan Nomor Surat"
                        fullWidth
                        error={errors.letter_number ? true : false}
                        helperText={errors.letter_number ?? ""}
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
                <Grid item xs={12}>
                    <Typography
                        variant="body2"
                        color="initial"
                        sx={{ fontWeight: "600" }}
                    >
                        Data Mahasiswa :
                    </Typography>
                </Grid>
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
                <Grid item xs={12}>
                    <Typography
                        variant="body2"
                        color="initial"
                        sx={{ fontWeight: "600" }}
                    >
                        Dewan Penguji dan Pelaksana :
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <AppInputLabel label="Ketua" />
                    <Select
                        id="chairman_id"
                        name="chairman_id"
                        value={formValues.chairman_id}
                        onChange={handleChangeForm}
                        displayEmpty
                        error={errors.chairman_id ? true : false}
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
                                Ketua Seminar
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
                    {errors.chairman_id && (
                        <InputErrorMessage>
                            {errors.chairman_id}
                        </InputErrorMessage>
                    )}
                </Grid>
                <Grid item xs={12} sm={4}>
                    <AppInputLabel label="Sekertaris" />
                    <Select
                        id="secretary_id"
                        name="secretary_id"
                        value={formValues.secretary_id}
                        onChange={handleChangeForm}
                        displayEmpty
                        error={errors.secretary_id ? true : false}
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
                                Sekertaris Seminar
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
                    {errors.secretary_id && (
                        <InputErrorMessage>
                            {errors.secretary_id}
                        </InputErrorMessage>
                    )}
                </Grid>
                <Grid item xs={12} sm={4}>
                    <AppInputLabel label="Pelaksana" />
                    <Select
                        id="executor_id"
                        name="executor_id"
                        value={formValues.executor_id}
                        onChange={handleChangeForm}
                        displayEmpty
                        error={errors.executor_id ? true : false}
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
                                Pelaksana Seminar
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
                    {errors.executor_id && (
                        <InputErrorMessage>
                            {errors.executor_id}
                        </InputErrorMessage>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Pembimbing 1" required={true} />
                    <Select
                        id="mentor_ids0"
                        name="mentor_ids"
                        value={formValues.mentor_ids[0]}
                        onChange={(e) => {
                            handleChangeForm(e, 0);
                        }}
                        displayEmpty
                        error={errors["mentor_ids.0"] ? true : false}
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
                                Nama Pembimbing 1
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
                    {errors["mentor_ids.0"] && (
                        <InputErrorMessage>
                            {errors["mentor_ids.0"]}
                        </InputErrorMessage>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Pembimbing 2" required={true} />
                    <Select
                        id="mentor_ids1"
                        name="mentor_ids"
                        value={formValues.mentor_ids[1]}
                        onChange={(e) => {
                            handleChangeForm(e, 1);
                        }}
                        displayEmpty
                        error={errors["mentor_ids.1"] ? true : false}
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
                                Nama Pembimbing 2
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
                    {errors["mentor_ids.1"] && (
                        <InputErrorMessage>
                            {errors["mentor_ids.1"]}
                        </InputErrorMessage>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Penguji 1" />
                    <Select
                        id="tester_ids0"
                        name="tester_ids"
                        value={formValues.tester_ids[0]}
                        onChange={(e) => {
                            handleChangeForm(e, 0);
                        }}
                        displayEmpty
                        error={errors["tester_ids.0"] ? true : false}
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
                                Nama Penguji 1
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
                    {errors["tester_ids.0"] && (
                        <InputErrorMessage>
                            {errors["tester_ids.0"]}
                        </InputErrorMessage>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Penguji 2" />
                    <Select
                        id="tester_ids1"
                        name="tester_ids"
                        value={formValues.tester_ids[1]}
                        onChange={(e) => {
                            handleChangeForm(e, 1);
                        }}
                        displayEmpty
                        error={errors["tester_ids.1"] ? true : false}
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
                                Nama Penguji 2
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
                    {errors["tester_ids.1"] && (
                        <InputErrorMessage>
                            {errors["tester_ids.1"]}
                        </InputErrorMessage>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="body2"
                        color="initial"
                        sx={{ fontWeight: "600" }}
                    >
                        Jadwal Pelaksanaan :
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Tanggal" />
                    <TextField
                        id="date"
                        name="date"
                        type="date"
                        fullWidth
                        value={formValues.date}
                        onChange={handleChangeForm}
                        error={errors.date ? true : false}
                        helperText={errors.date ?? ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Zona Waktu" required={true} />
                    <Select
                        id="time_zone"
                        name="time_zone"
                        value={formValues.time_zone}
                        onChange={handleChangeForm}
                        fullWidth
                        displayEmpty
                        error={errors.time_zone ? true : false}
                    >
                        <MenuItem value="" disabled>
                            <Typography
                                variant="body2"
                                color="#ababab"
                                fontWeight={"600"}
                                display={"flex"}
                            >
                                Zona Waktu
                            </Typography>
                        </MenuItem>
                        <MenuItem value="wib">
                            WIB - Waktu Indonesia Barat
                        </MenuItem>
                        <MenuItem value="wita">
                            WITA - Waktu Indonesia Tengah
                        </MenuItem>
                        <MenuItem value="wit">
                            WIT - Waktu Indonesia Timur
                        </MenuItem>
                    </Select>
                    {errors.time_zone && (
                        <InputErrorMessage>
                            {errors.time_zone}
                        </InputErrorMessage>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Jam Mulai" />
                    <TextField
                        id="start_time"
                        name="start_time"
                        type="time"
                        fullWidth
                        value={formValues.start_time}
                        onChange={handleChangeForm}
                        error={errors.start_time ? true : false}
                        helperText={errors.start_time ?? ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppInputLabel label="Jam Selesai" />
                    <TextField
                        id="end_time"
                        name="end_time"
                        type="time"
                        fullWidth
                        value={formValues.end_time}
                        onChange={handleChangeForm}
                        error={errors.end_time ? true : false}
                        helperText={errors.end_time ?? ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AppInputLabel label="Lokasi Seminar" />
                    <TextField
                        id="location"
                        name="location"
                        type="string"
                        placeholder="Masukkan Lokasi Seminar"
                        fullWidth
                        multiline
                        rows={2}
                        value={formValues.location}
                        onChange={handleChangeForm}
                        error={errors.location ? true : false}
                        helperText={errors.location ?? ""}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
