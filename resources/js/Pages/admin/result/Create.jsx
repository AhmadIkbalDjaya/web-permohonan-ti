import { Head } from "@inertiajs/react";
import React from "react";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import { Box, Button, Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { DocumentsFormCard } from "../components/DocumentsFormCard";
import { SigantureInputCard } from "../components/SigantureInputCard";
import ResultForm from "../components/result/ResultForm";
import useCreateResult from "./use_result/useCreateResult";

export default function CreateResult({
    file_requirements,
    lecturers,
    statuses,
    status_descriptions,
}) {
    const {
        errors,
        formValues,
        handleChangeForm,
        handleSubmitForm,
        setSignatur,
        emptySignature,
        clearSignatur,
        saveSignature,
    } = useCreateResult();
    return (
        <>
            <Head title="Tambah Permohonan Hasil" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.result.index")}>Hasil</AppLink>
                    <AppLink href={route("admin.result.create")} color="black">
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
                        <ResultForm
                            formValues={formValues}
                            handleChangeForm={handleChangeForm}
                            errors={errors}
                            lecturers={lecturers}
                            statuses={statuses}
                            status_descriptions={status_descriptions}
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
                        {file_requirements.length > 0 && (
                            <DocumentsFormCard
                                file_requirements={file_requirements}
                                handleChangeForm={handleChangeForm}
                                formValues={formValues}
                                errors={errors}
                            />
                        )}
                        <SigantureInputCard
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
