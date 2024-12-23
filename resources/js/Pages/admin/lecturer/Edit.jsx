import React from "react";
import { Head } from "@inertiajs/react";
import {
    Box,
    Button,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { MdModeEdit } from "react-icons/md";

import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import AppInputLabel from "../components/elements/input/AppInputLabel";
import InputErrorMessage from "../components/elements/input/InputErrorMessage";
import { SigantureInputCard } from "../components/SigantureInputCard";
import useEditLecturer from "./use_lecturer/useEditLecturer";

export default function EditLecturer({ lecturer }) {
    const {
        errors,
        formValues,
        handleChangeForm,
        handleSubmitForm,
        setSignatur,
        emptySignature,
        clearSignatur,
        saveSignature,
    } = useEditLecturer({ lecturer });
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
                                Data Staf
                            </Typography>
                            <Grid container spacing={2} padding={"15px"}>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel
                                        label="Nama Lengkap"
                                        required
                                    />
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
                                    <AppInputLabel
                                        label="Jenis Kelamin"
                                        required
                                    />
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
                        <SigantureInputCard
                            title="Tanda Tangan Staff"
                            isRequired={false}
                            formType="edit"
                            emptySignature={emptySignature}
                            errors={errors}
                            setSignatur={setSignatur}
                            clearSignatur={clearSignatur}
                            saveSignature={saveSignature}
                        />
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
