import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import {
    Typography,
    TextField,
    Button,
    Box,
    ButtonGroup,
    Container,
    Grid,
    MenuItem,
    Select,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import ReactSignatureCanvas from "react-signature-canvas";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import AppInputLabel from "../../admin/components/elements/input/AppInputLabel";
import { semesterListItems } from "../../admin/components/elements/input/SemesterListItems";
import InputErrorMessage from "../../admin/components/elements/input/InputErrorMessage";
import PublicBaseLayout from "../base_layout/PublicBaseLayout";
import AppBreadcrumbs from "../../admin/components/elements/AppBreadcrumbs";
import AppLink from "../../admin/components/AppLink";

export default function Ppl() {
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
        start_date: "",
        end_date: "",
        location: "",
        location_address: "",
        student_count: 1,

        names: [""],
        nims: [""],
        pobs: [""],
        dobs: [""],
        semesters: [""],
        phones: [""],
    });

    function handleChangeForm(e, index = null) {
        const name = e.target.name;
        const value = e.target.value;
        if (
            ["names", "nims", "pobs", "dobs", "semesters", "phones"].includes(
                name
            ) &&
            index != null
        ) {
            setFormValues((values) => {
                const updateArray = [...values[name]];
                updateArray[index] = value;
                return {
                    ...values,
                    [name]: updateArray,
                };
            });
        } else {
            if (name == "student_count") {
                if (value > formValues.student_count) {
                    for (let i = formValues.student_count; i < value; i++) {
                        setFormValues((values) => {
                            let updateNames = [...values.names];
                            updateNames[i] = "";
                            let updateNims = [...values.nims];
                            updateNims[i] = "";
                            let updateDobs = [...values.dobs];
                            updateDobs[i] = "";
                            let updatePobs = [...values.pobs];
                            updatePobs[i] = "";
                            let updateSemesters = [...values.semesters];
                            updateSemesters[i] = "";
                            let updatePhones = [...values.phones];
                            updatePhones[i] = "";
                            return {
                                ...values,
                                names: updateNames,
                                nims: updateNims,
                                dobs: updateDobs,
                                pobs: updatePobs,
                                semesters: updateSemesters,
                                phones: updatePhones,
                            };
                        });
                    }
                }
            }
            setFormValues((values) => {
                return {
                    ...values,
                    [name]: value,
                };
            });
        }
    }
    function handleSubmitForm(e) {
        router.post(route("ppl.store"), formValues);
    }

    return (
        <>
            <Head title="Praktek Kerja Lapangan" />
            <PublicBaseLayout>
                <Container maxWidth="lg" sx={{ marginTop: "85px" }}>
                    <AppBreadcrumbs>
                        <AppLink href={route("home")}>Home</AppLink>
                        <AppLink href={route("home")}>Daftar</AppLink>
                        <AppLink href={route("ppl")} color="black">
                            PPL
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
                                Isi Formulir Permohonan PPL
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
                                    Data PPL
                                </Typography>
                                <Grid container spacing={2} padding={"15px"}>
                                    <Grid item xs={12}>
                                        <AppInputLabel
                                            label="Lokasi PPL"
                                            required={true}
                                        />
                                        <TextField
                                            id="location"
                                            name="location"
                                            type="string"
                                            value={formValues.location}
                                            onChange={handleChangeForm}
                                            placeholder="Masukkan Nama Instansi PPL"
                                            fullWidth
                                            error={
                                                errors.location ? true : false
                                            }
                                            helperText={errors.location ?? ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AppInputLabel
                                            label="Alamat Lokasi"
                                            required={true}
                                        />
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
                                            error={
                                                errors.location_address
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.location_address ?? ""
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <AppInputLabel
                                            label="Tanggal Mulai"
                                            required={true}
                                        />
                                        <TextField
                                            id="start_date"
                                            name="start_date"
                                            type="date"
                                            value={formValues.start_date}
                                            onChange={handleChangeForm}
                                            fullWidth
                                            error={
                                                errors.start_date ? true : false
                                            }
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
                                            error={
                                                errors.end_date ? true : false
                                            }
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
                                            error={
                                                errors.student_count
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.student_count ?? ""
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            {Array.from(
                                { length: formValues.student_count },
                                (e, index) => (
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
                                        <Grid
                                            container
                                            spacing={2}
                                            padding={"15px"}
                                        >
                                            <Grid item xs={12} sm={6}>
                                                <AppInputLabel
                                                    label="Nama"
                                                    required={true}
                                                />
                                                <TextField
                                                    id="name"
                                                    name="names"
                                                    type="string"
                                                    value={
                                                        formValues.names[index]
                                                    }
                                                    onChange={(e) => {
                                                        handleChangeForm(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    placeholder="Masukkan Nama Mahasiswa"
                                                    fullWidth
                                                    error={
                                                        errors[`names.${index}`]
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors[
                                                            `names.${index}`
                                                        ] ?? ""
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AppInputLabel
                                                    label="NIM"
                                                    required={true}
                                                />
                                                <TextField
                                                    id="nim"
                                                    name="nims"
                                                    type="number"
                                                    value={
                                                        formValues.nims[index]
                                                    }
                                                    onChange={(e) => {
                                                        handleChangeForm(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    placeholder="Masukkan NIM"
                                                    fullWidth
                                                    error={
                                                        errors[`nims.${index}`]
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors[
                                                            `nims.${index}`
                                                        ] ?? ""
                                                    }
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
                                                    value={
                                                        formValues.pobs[index]
                                                    }
                                                    onChange={(e) => {
                                                        handleChangeForm(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    placeholder="Masukkan Tempat Lahir"
                                                    fullWidth
                                                    error={
                                                        errors[`pobs.${index}`]
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors[
                                                            `pobs.${index}`
                                                        ] ?? ""
                                                    }
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
                                                    value={
                                                        formValues.dobs[index]
                                                    }
                                                    onChange={(e) => {
                                                        handleChangeForm(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    placeholder="Masukkan Tanggal Lahir"
                                                    fullWidth
                                                    error={
                                                        errors[`dobs.${index}`]
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors[
                                                            `dobs.${index}`
                                                        ] ?? ""
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AppInputLabel
                                                    label="Semester"
                                                    required={true}
                                                />
                                                <Select
                                                    id="semester"
                                                    name="semesters"
                                                    value={
                                                        formValues.semesters[
                                                            index
                                                        ]
                                                    }
                                                    onChange={(e) => {
                                                        handleChangeForm(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    fullWidth
                                                    displayEmpty
                                                    error={
                                                        errors[
                                                            `semesters.${index}`
                                                        ]
                                                            ? true
                                                            : false
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
                                                    {semesterListItems.map(
                                                        (semester, i) => {
                                                            return (
                                                                <MenuItem
                                                                    key={i}
                                                                    value={
                                                                        semester.value
                                                                    }
                                                                >
                                                                    {
                                                                        semester.body
                                                                    }
                                                                </MenuItem>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                                {errors[
                                                    `semesters.${index}`
                                                ] && (
                                                    <InputErrorMessage>
                                                        {
                                                            errors[
                                                                `semesters.${index}`
                                                            ]
                                                        }
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
                                                    value={
                                                        formValues.phones[index]
                                                    }
                                                    onChange={(e) => {
                                                        handleChangeForm(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    placeholder="Masukkan Nomor Telepon"
                                                    fullWidth
                                                    error={
                                                        errors[
                                                            `phones.${index}`
                                                        ]
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors[
                                                            `phones.${index}`
                                                        ] ?? ""
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )
                            )}
                        </Box>
                        <Box
                            flex={{
                                xs: "100%",
                                md: 5,
                            }}
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
                </Container>
            </PublicBaseLayout>
        </>
    );
}
