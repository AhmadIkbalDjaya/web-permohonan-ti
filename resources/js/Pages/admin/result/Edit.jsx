import React from "react";
import { Head } from "@inertiajs/react";
import { Box, Button, Typography } from "@mui/material";
import { MdModeEdit } from "react-icons/md";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import ShowPDFModal from "../components/ShowPDFModal";
import { DocumentsEditFormCard } from "../components/DocumentsEditFormCard";
import { SigantureInputCard } from "../components/SigantureInputCard";
import ResultForm from "../components/result/ResultForm";
import useEditResult from "./use_result/useEditResult";

export default function EditResult({
    result,

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
        showPDF,
        handleClickShowPDF,
        handleCloseShowPDF,
    } = useEditResult({ result });
    return (
        <>
            <Head title="Edit Permohonan Hasil" />
            <ShowPDFModal
                handleClose={handleCloseShowPDF}
                open={showPDF.open}
                name={showPDF.name}
                file={showPDF.file}
            />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.result.index")}>Hasil</AppLink>
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
                            Edit Formulir Permohonan Seminar Hasil
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
                        <ResultForm
                            formType="update"
                            proposalCode={result.code}
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
                        <DocumentsEditFormCard
                            file_requirements={file_requirements}
                            handleChangeForm={handleChangeForm}
                            formValues={formValues}
                            errors={errors}
                            files={result.files}
                            handleClickShowPDF={handleClickShowPDF}
                        />
                        <SigantureInputCard
                            formType={"edit"}
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
