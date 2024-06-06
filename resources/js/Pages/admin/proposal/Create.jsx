import React, { useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head, router, usePage } from "@inertiajs/react";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import AppInputLabel from "../components/elements/input/AppInputLabel";
import InputFileUpload from "../components/elements/input/InputFileUpload";
import InputErrorMessage from "../components/elements/input/InputErrorMessage";
import Typography from "@mui/material/Typography";
import {
    Box,
    Button,
    Grid,
    Select,
    TextField,
    ThemeProvider,
    MenuItem,
    ButtonGroup,
    FormHelperText,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { themeTextField } from "../../../theme/TextFieldTheme";
import ReactSignatureCanvas from "react-signature-canvas";
import { semesterListItems } from "../components/elements/input/SemesterListItems";
import dataURLtoBlob from "blueimp-canvas-to-blob";

export default function CreateProposal({
    file_requirements,
    lecturers,
    statuses,
    status_descriptions,
}) {
    const [signature, setSignatur] = useState();
    const [emptySignature, setEmptySignature] = useState(false);
    const clearSignatur = () => {
        signature.clear();
    };
    const saveSignature = () => {
        if (signature.isEmpty()) {
            setEmptySignature(true);
        } else {
            setEmptySignature(false);
            const result = signature
                .getTrimmedCanvas()
                .toDataURL("applicant_sign");
            const image = dataURLtoBlob(result);
            setFormValues((values) => {
                return {
                    ...values,
                    applicant_sign: image,
                };
            });
        }
    };

    const { errors } = usePage().props;
    const [formValues, setFormValues] = useState({
        status_id: "1",
        status_description_id: "",
        letter_number: "",
        letter_date: "",
        chairman_id: "",
        secretary_id: "",
        executor_id: "",

        name: "",
        nim: "",
        pob: "",
        dob: "",
        semester: "",
        phone: "",
        essay_title: "",

        mentors: ["", ""],
        testers: ["", ""],

        date: "",
        time_zone: "wita",
        start_time: "",
        end_time: "",
        location: "",
        files: {},
    });

    function handleChangeForm(e, index = null) {
        const name = e.target.name;
        const value = e.target.value;
        if (["mentors", "testers"].includes(name) && index != null) {
            setFormValues((values) => {
                const updateArray = [...values[name]];
                updateArray[index] = value;
                return {
                    ...values,
                    [name]: updateArray,
                };
            });
        } else if (e.target.type == "file") {
            setFormValues((values) => ({
                ...values,
                files: {
                    ...values.files,
                    [name]: e.target.files[0],
                },
            }));
        } else {
            setFormValues((values) => ({
                ...values,
                [name]: value,
            }));
        }
    }
    function handleSubmitForm(e) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(formValues)) {
            if (key == "files") {
                for (const [key, file] of Object.entries(value)) {
                    formData.append(key, file);
                }
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            } else {
                formData.append(key, value);
            }
        }
        router.post(route("admin.proposal.store"), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
    return (
        <>
            <Head title="Tambah Permohonan Proposal" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.proposal.index")}>
                        Proposal
                    </AppLink>
                    <AppLink
                        href={route("admin.proposal.create")}
                        color="black"
                    >
                        Tambah Permohonan
                    </AppLink>
                </AppBreadcrumbs>
                <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    justifyContent={"space-between"}
                    my={1}
                >
                    <Box>
                        <Typography variant="h5" fontWeight={"600"}>
                            Tambah Permohonan
                        </Typography>
                        <Typography variant="caption">
                            Isi Formulir Permohonan Seminar Proposal Baru
                        </Typography>
                    </Box>
                    <Button
                        onClick={handleSubmitForm}
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<FaPlus />}
                        sx={{
                            background: "#B20600",
                            textTransform: "none",
                            display: {
                                xs: "none",
                                sm: "inherit",
                            },
                        }}
                    >
                        Simpan
                    </Button>
                </Box>
                <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    gap={3}
                    sx={{
                        flexWrap: {
                            xs: "wrap",
                            md: "nowrap",
                        },
                    }}
                >
                    <Box
                        flex={{
                            xs: "100%",
                            md: 8,
                        }}
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
                            Data Seminar
                        </Typography>
                        <ThemeProvider theme={themeTextField}>
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
                                        error={
                                            errors.status_description_id
                                                ? true
                                                : false
                                        }
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
                                        {status_descriptions.map(
                                            (description, index) => {
                                                if (
                                                    description.status_id ==
                                                    formValues.status_id
                                                ) {
                                                    return (
                                                        <MenuItem
                                                            key={index}
                                                            value={
                                                                description.id
                                                            }
                                                            sx={{
                                                                textTransform:
                                                                    "capitalize",
                                                            }}
                                                        >
                                                            {
                                                                description.description
                                                            }
                                                        </MenuItem>
                                                    );
                                                }
                                            }
                                        )}
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
                                        error={
                                            errors.letter_number ? true : false
                                        }
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
                                        error={
                                            errors.letter_date ? true : false
                                        }
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
                                    <AppInputLabel
                                        label="Nama"
                                        required={true}
                                    />
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
                                    <AppInputLabel
                                        label="NIM"
                                        required={true}
                                    />
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
                                    <AppInputLabel
                                        label="Tempat Lahir"
                                        required={true}
                                    />
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
                                    <AppInputLabel
                                        label="Tanggal Lahir"
                                        required={true}
                                    />
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
                                    <AppInputLabel
                                        label="Semester"
                                        required={true}
                                    />
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
                                        {semesterListItems.map(
                                            (semester, i) => {
                                                return (
                                                    <MenuItem
                                                        key={i}
                                                        value={semester.value}
                                                    >
                                                        {semester.body}
                                                    </MenuItem>
                                                );
                                            }
                                        )}
                                    </Select>
                                    {errors.semester && (
                                        <InputErrorMessage>
                                            {errors.semester}
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
                                    <AppInputLabel
                                        label="Judul Skripsi"
                                        required={true}
                                    />
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
                                        error={
                                            errors.essay_title ? true : false
                                        }
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
                                        error={
                                            errors.chairman_id ? true : false
                                        }
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
                                        error={
                                            errors.secretary_id ? true : false
                                        }
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
                                        error={
                                            errors.executor_id ? true : false
                                        }
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
                                    <AppInputLabel
                                        label="Pembimbing 1"
                                        required={true}
                                    />
                                    <TextField
                                        id="mentors1"
                                        name="mentors"
                                        type="string"
                                        placeholder="Nama Pembimbing 1"
                                        fullWidth
                                        value={formValues.mentors[0]}
                                        onChange={(e) => {
                                            handleChangeForm(e, 0);
                                        }}
                                        error={
                                            errors["mentors.0"] ? true : false
                                        }
                                        helperText={errors["mentors.0"] ?? ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel
                                        label="Pembimbing 2"
                                        required={true}
                                    />
                                    <TextField
                                        id="mentors2"
                                        name="mentors"
                                        type="string"
                                        placeholder="Nama Pembimbing 2"
                                        fullWidth
                                        value={formValues.mentors[1]}
                                        onChange={(e) => {
                                            handleChangeForm(e, 1);
                                        }}
                                        error={
                                            errors["mentors.1"] ? true : false
                                        }
                                        helperText={errors["mentors.1"] ?? ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel label="Penguji 1" />
                                    <TextField
                                        id="testers1"
                                        name="testers"
                                        type="string"
                                        placeholder="Nama Penguji 1"
                                        fullWidth
                                        value={formValues.testers[0]}
                                        onChange={(e) => {
                                            handleChangeForm(e, 0);
                                        }}
                                        error={
                                            errors["testers.0"] ? true : false
                                        }
                                        helperText={errors["testers.0"] ?? ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel label="Penguji 2" />
                                    <TextField
                                        id="testers2"
                                        name="testers"
                                        type="string"
                                        placeholder="Nama Penguji 2"
                                        fullWidth
                                        value={formValues.testers[1]}
                                        onChange={(e) => {
                                            handleChangeForm(e, 1);
                                        }}
                                        error={
                                            errors["testers.1"] ? true : false
                                        }
                                        helperText={errors["testers.1"] ?? ""}
                                    />
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
                                    <AppInputLabel
                                        label="Zona Waktu"
                                        required={true}
                                    />
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
                        </ThemeProvider>
                    </Box>
                    <Box
                        flex={{
                            xs: "100%",
                            md: 5,
                        }}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={2}
                    >
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
                                Berkas
                            </Typography>
                            <Grid container spacing={2} padding={"15px"}>
                                {file_requirements.map(
                                    (file_requirement, index) => {
                                        return (
                                            <Grid item xs={12} key={index}>
                                                <AppInputLabel
                                                    label={file_requirement.name.replaceAll(
                                                        "_",
                                                        " "
                                                    )}
                                                    required={
                                                        file_requirement.is_required
                                                    }
                                                />
                                                <InputFileUpload
                                                    id="name"
                                                    name={file_requirement.name}
                                                    type="file"
                                                    accept={".pdf"}
                                                    onChange={handleChangeForm}
                                                />
                                                {formValues.files[
                                                    file_requirement.name
                                                ] ? (
                                                    <FormHelperText
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <Typography variant="">
                                                            File:{" "}
                                                            {formValues.files[
                                                                file_requirement
                                                                    .name
                                                            ].name.substring(
                                                                0,
                                                                20
                                                            )}
                                                        </Typography>
                                                        <Typography variant="">
                                                            {(
                                                                formValues
                                                                    .files[
                                                                    file_requirement
                                                                        .name
                                                                ].size / 1024
                                                            ).toFixed(0)}{" "}
                                                            KB
                                                        </Typography>
                                                    </FormHelperText>
                                                ) : (
                                                    ""
                                                )}
                                                {errors[
                                                    file_requirement.name
                                                ] && (
                                                    <InputErrorMessage
                                                        px={"0px"}
                                                    >
                                                        {
                                                            errors[
                                                                file_requirement
                                                                    .name
                                                            ]
                                                        }
                                                    </InputErrorMessage>
                                                )}
                                            </Grid>
                                        );
                                    }
                                )}
                            </Grid>
                        </Box>
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
                            >
                                <Box display={"flex"} height={"fit"}>
                                    <Typography
                                        variant="body2"
                                        color="initial"
                                        fontWeight={600}
                                    >
                                        Tanda Tangan Pemohon
                                    </Typography>
                                    <Typography color="red">
                                        &nbsp; *
                                    </Typography>
                                </Box>
                                {errors.applicant_sign ? (
                                    <InputErrorMessage px={0}>
                                        {errors.applicant_sign}
                                    </InputErrorMessage>
                                ) : (
                                    ""
                                )}
                                {emptySignature ? (
                                    <InputErrorMessage px={0}>
                                        Anda Belum Tanda Tangan
                                    </InputErrorMessage>
                                ) : (
                                    ""
                                )}
                            </Box>
                            <Box display={"flex"} justifyContent={"center"}>
                                <ReactSignatureCanvas
                                    ref={(ref) => {
                                        setSignatur(ref);
                                    }}
                                    penColor="black"
                                    backgroundColor="#F4F6F8"
                                    canvasProps={{
                                        width: 300,
                                        height: 200,
                                        className: "sigCanvas",
                                    }}
                                />
                            </Box>
                            <Box>
                                <ButtonGroup
                                    variant="contained"
                                    color="slate-300"
                                    fullWidth
                                >
                                    <Button onClick={clearSignatur}>
                                        Bersihkan
                                    </Button>
                                    <Button onClick={saveSignature}>
                                        Simpan
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        flex={"100%"}
                        display={{
                            sx: "inherit",
                            md: "none",
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={<FaPlus />}
                            fullWidth
                            color="primary"
                            onClick={handleSubmitForm}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Box>
            </BaseLayout>
        </>
    );
}
