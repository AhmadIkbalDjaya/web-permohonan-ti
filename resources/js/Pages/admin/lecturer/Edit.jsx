import { Head, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import {
    Box,
    Button,
    ButtonGroup,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { MdModeEdit } from "react-icons/md";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import AppInputLabel from "../components/elements/input/AppInputLabel";
import ReactSignatureCanvas from "react-signature-canvas";
import InputErrorMessage from "../components/elements/input/InputErrorMessage";

export default function EditLecturer({ lecturer }) {
    const { errors } = usePage().props;

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
                    signature: image,
                };
            });
        }
    };

    const [formValues, setFormValues] = useState({
        name: lecturer.name,
        nip: lecturer.nip || "",
        gender: lecturer.gender || "",
        role: lecturer.role || "",
    });
    const handleChangeForm = (e, index = null) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues((values) => ({
            ...values,
            [name]: value,
        }));
    };
    const handleSubmitForm = (e) => {
        router.post(route("admin.lecturer.update", { lecturer: lecturer.id }), {
            ...formValues,
            _method: "put",
        });
    };
    return (
        <>
            <Head title="Edit Staf" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.lecturer.index")}>
                        Staff
                    </AppLink>
                    <AppLink color="black">Edit Staf</AppLink>
                </AppBreadcrumbs>
                <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    justifyContent={"space-between"}
                    my={1}
                >
                    <Box>
                        <Typography variant="h5" fontWeight={"600"}>
                            Edit Staf
                        </Typography>
                        <Typography variant="caption">
                            Edit Data dosen / staff
                        </Typography>
                    </Box>
                    <Button
                        onClick={handleSubmitForm}
                        variant="contained"
                        size="small"
                        startIcon={<MdModeEdit />}
                        sx={{
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
                                    <InputErrorMessage>
                                        {errors.gender}
                                    </InputErrorMessage>
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
                                    <InputErrorMessage>
                                        {errors.role}
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
                                </Box>
                                <FormHelperText>
                                    Kosongkan jika tidak ingin mengganti
                                </FormHelperText>
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
                            startIcon={<MdModeEdit />}
                            fullWidth
                            color="primary"
                            sx={{ textTransform: "none" }}
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
