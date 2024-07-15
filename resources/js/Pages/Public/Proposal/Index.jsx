import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import TextField from "@mui/material/TextField";
import {
    Box,
    MenuItem,
    Typography,
    ButtonGroup,
    Button,
    Container,
    Grid,
    FormHelperText,
    Select,
} from "@mui/material";
import ReactSignatureCanvas from "react-signature-canvas";
import { FaPlus } from "react-icons/fa";
import InputErrorMessage from "../../admin/components/elements/input/InputErrorMessage";
import { semesterListItems } from "../../admin/components/elements/input/SemesterListItems";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import AppInputLabel from "../../admin/components/elements/input/AppInputLabel";
import InputFileUpload from "../../admin/components/elements/input/InputFileUpload";
import PublicBaseLayout from "../base_layout/PublicBaseLayout";
import AppBreadcrumbs from "../../admin/components/elements/AppBreadcrumbs";
import AppLink from "../../admin/components/AppLink";

export default function Proposal({ file_requirements, lecturers }) {
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
        name: "",
        nim: "",
        pob: "",
        dob: "",
        semester: "",
        phone: "",
        essay_title: "",
        mentor_ids: ["", ""],
        files: {},
    });

    function handleChangeForm(e, index = null) {
        const name = e.target.name;
        const value = e.target.value;
        if (["mentor_ids"].includes(name) && index != null) {
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
        router.post(route("proposal.store"), formData, {
            headers: {
                "Content-Type": "multipart/form-formValues",
            },
        });
    }

    return (
        <>
            <Head title="Seminar Proposal" />
            <PublicBaseLayout>
                <Container maxWidth="lg" sx={{ marginTop: "85px" }}>
                    <AppBreadcrumbs>
                        <AppLink href={route("home")}>Home</AppLink>
                        <AppLink href={route("home")}>Daftar</AppLink>
                        <AppLink href={route("proposal")} color="black">
                            Proposal
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
                                Buat Permohonan
                            </Typography>
                            <Typography variant="caption">
                                Isi Formulir Permohonan Seminar Proposal
                            </Typography>
                        </Box>
                        <Button
                            onClick={handleSubmitForm}
                            variant="contained"
                            size="small"
                            startIcon={<FaPlus size={16} />}
                            sx={{
                                textTransform: "none",
                                display: {
                                    xs: "none",
                                    sm: "inherit",
                                },
                            }}
                        >
                            Daftar
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
                            <Grid container spacing={2} padding={"15px"}>
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
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel
                                        label="Pembimbing 1"
                                        required={true}
                                    />
                                    <Select
                                        id="mentor_ids0"
                                        name="mentor_ids"
                                        value={formValues.mentor_ids[0]}
                                        onChange={(e) => {
                                            handleChangeForm(e, 0);
                                        }}
                                        displayEmpty
                                        error={
                                            errors["mentor_ids.0"]
                                                ? true
                                                : false
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
                                    <AppInputLabel
                                        label="Pembimbing 2"
                                        required={true}
                                    />
                                    <Select
                                        id="mentor_ids1"
                                        name="mentor_ids"
                                        value={formValues.mentor_ids[1]}
                                        onChange={(e) => {
                                            handleChangeForm(e, 1);
                                        }}
                                        displayEmpty
                                        error={
                                            errors["mentor_ids.1"]
                                                ? true
                                                : false
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
                            </Grid>
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
                            {file_requirements.length > 0 && (
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
                                    <Grid
                                        container
                                        spacing={2}
                                        padding={"15px"}
                                    >
                                        {file_requirements.map(
                                            (file_requirement, index) => {
                                                return (
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        key={index}
                                                    >
                                                        <AppInputLabel
                                                            label={
                                                                file_requirement.name
                                                            }
                                                            required={
                                                                file_requirement.is_required
                                                            }
                                                        />
                                                        <InputFileUpload
                                                            id="name"
                                                            name={
                                                                file_requirement.slug
                                                            }
                                                            type="file"
                                                            accept={".pdf"}
                                                            onChange={
                                                                handleChangeForm
                                                            }
                                                        />
                                                        {formValues.files[
                                                            file_requirement
                                                                .slug
                                                        ] ? (
                                                            <FormHelperText
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    justifyContent:
                                                                        "space-between",
                                                                }}
                                                            >
                                                                <Typography variant="">
                                                                    File:{" "}
                                                                    {formValues.files[
                                                                        file_requirement
                                                                            .slug
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
                                                                                .slug
                                                                        ].size /
                                                                        1024
                                                                    ).toFixed(
                                                                        0
                                                                    )}{" "}
                                                                    KB
                                                                </Typography>
                                                            </FormHelperText>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {errors[
                                                            file_requirement
                                                                .slug
                                                        ] && (
                                                            <InputErrorMessage
                                                                px={"0px"}
                                                            >
                                                                {
                                                                    errors[
                                                                        file_requirement
                                                                            .slug
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
                            )}
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
                                onClick={handleSubmitForm}
                                variant="contained"
                                startIcon={<FaPlus size={16} />}
                                fullWidth
                                sx={{ textTransform: "none" }}
                            >
                                Daftar
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </PublicBaseLayout>
        </>
    );
}
