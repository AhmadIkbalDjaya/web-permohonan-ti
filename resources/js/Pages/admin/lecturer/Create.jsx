import React from "react";
import { Head } from "@inertiajs/react";
import { Box, Button, Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa";

import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import { SigantureInputCard } from "../components/SigantureInputCard";
import LecturerForm from "../components/lecturer/LecturerForm";
import useCreateLecturer from "./use_lecturer/useCreateLecturer";

export default function CreateLecturer() {
    const {
        errors,
        formValues,
        handleChangeForm,
        handleSubmitForm,
        setSignatur,
        emptySignature,
        clearSignatur,
        saveSignature,
    } = useCreateLecturer();
    return (
        <>
            <Head title="Tambah Staff" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.lecturer.index")}>Staf</AppLink>
                    <AppLink
                        href={route("admin.lecturer.create")}
                        color="black"
                    >
                        Tambah Staf
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
                            Tambah Staf
                        </Typography>
                        <Typography variant="caption">
                            Isi Form Tambah Dosen / Staf Baru
                        </Typography>
                    </Box>
                    <Button
                        onClick={handleSubmitForm}
                        variant="contained"
                        size="small"
                        startIcon={<FaPlus />}
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
                        <LecturerForm
                            formValues={formValues}
                            errors={errors}
                            handleChangeForm={handleChangeForm}
                        />
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
                            formType=""
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
                            startIcon={<FaPlus />}
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
