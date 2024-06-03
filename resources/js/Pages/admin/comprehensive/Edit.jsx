import { Head, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    MenuItem,
    Select,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import { MdModeEdit } from "react-icons/md";
import { themeTextField } from "../../../theme/TextFieldTheme";
import AppInputLabel from "../components/elements/input/AppInputLabel";
import { semesterListItems } from "../components/elements/input/SemesterListItems";
import ReactSignatureCanvas from "react-signature-canvas";
import InputErrorMessage from "../components/elements/input/InputErrorMessage";

export default function EditComprehensive({ comprehensive, testers }) {
    testers = testers.map((tester) => tester || "");
    const { errors } = usePage().props;
    const [formValues, setFormValues] = useState({
        name: comprehensive.student.name,
        nim: comprehensive.student.nim,
        pob: comprehensive.student.pob,
        dob: comprehensive.student.dob,
        semester: comprehensive.student.semester,
        phone: comprehensive.student.phone,
        essay_title: comprehensive.essay_title,
        testers: testers,
        _method: "PUT",
    });
    function handleChangeForm(e, index = null) {
        const name = e.target.name;
        const value = e.target.value;
        if (["testers"].includes(name) && index != null) {
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
        router.post(
            route("admin.comprehensive.update", {
                comprehensive: comprehensive.id,
            }),
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    }
    return (
        <>
            <Head title="Edit Permohonan Kompren" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.comprehensive.index")}>
                        Kompren
                    </AppLink>
                    <AppLink color="black">Edit Permohonan</AppLink>
                </AppBreadcrumbs>
                <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    justifyContent={"space-between"}
                    my={1}
                >
                    <Box>
                        <Typography variant="h5" fontWeight={"600"}>
                            Edit Permohonan
                        </Typography>
                        <Typography variant="caption">
                            Edit Formulir Permohonan Kompren
                        </Typography>
                    </Box>
                    <Button
                        onClick={handleSubmitForm}
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<MdModeEdit />}
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
                                    <AppInputLabel
                                        label="Status Permohonan"
                                        required={true}
                                    />
                                    <Select
                                        id="status"
                                        name="status"
                                        // value={formValues.status}
                                        // onChange={handleChangeForm}
                                        displayEmpty
                                        error={errors.status ? true : false}
                                        fullWidth
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
                                        <MenuItem>Pending</MenuItem>
                                        <MenuItem>Diterima</MenuItem>
                                        <MenuItem>Ditolak</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel label="Deskripsi Status" />
                                    <Select
                                        id="status_describtion"
                                        name="status_describtion"
                                        // value={formValues.status_describtion}
                                        // onChange={handleChangeForm}
                                        displayEmpty
                                        error={
                                            errors.status_describtion
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
                                        <MenuItem>
                                            Silahkan Membawa Kelengkapan Berkas
                                            Ke Jurusan
                                        </MenuItem>
                                        <MenuItem>
                                            Berkas Tidak Lengkap
                                        </MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel label="Nomor Surat" />
                                    <TextField
                                        id="letter_number"
                                        name="letter_number"
                                        type="string"
                                        // value={formValues.letter_number}
                                        // onChange={handleChangeForm}
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
                                        // value={formValues.letter_date}
                                        // onChange={handleChangeForm}
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
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel label="Ketua" />
                                    <TextField
                                        id="leader"
                                        name="leader"
                                        type="string"
                                        placeholder="Ketua"
                                        fullWidth
                                        value={formValues.leader}
                                        onChange={handleChangeForm}
                                        error={errors.leader ? true : false}
                                        helperText={errors.leader ?? ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel label="Sekertaris" />
                                    <TextField
                                        id="lead"
                                        name="lead"
                                        type="string"
                                        placeholder="Sekertaris"
                                        fullWidth
                                        value={formValues.lead}
                                        onChange={handleChangeForm}
                                        error={errors.lead ? true : false}
                                        helperText={errors.lead ?? ""}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <AppInputLabel
                                        label="Penguji Jarkom"
                                        required={true}
                                    />
                                    <TextField
                                        id="testers1"
                                        name="testers"
                                        type="string"
                                        placeholder="Jarkom"
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
                                <Grid item xs={12} md={4}>
                                    <AppInputLabel
                                        label="Penguji RPL"
                                        required={true}
                                    />
                                    <TextField
                                        id="testers2"
                                        name="testers"
                                        type="string"
                                        placeholder="RPL"
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
                                <Grid item xs={12} md={4}>
                                    <AppInputLabel
                                        label="Penguji Agama"
                                        required={true}
                                    />
                                    <TextField
                                        id="testers3"
                                        name="testers"
                                        type="string"
                                        placeholder="Agama"
                                        fullWidth
                                        value={formValues.testers[2]}
                                        onChange={(e) => {
                                            handleChangeForm(e, 2);
                                        }}
                                        error={
                                            errors["testers.2"] ? true : false
                                        }
                                        helperText={errors["testers.2"] ?? ""}
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
                </Box>
            </BaseLayout>
        </>
    );
}
