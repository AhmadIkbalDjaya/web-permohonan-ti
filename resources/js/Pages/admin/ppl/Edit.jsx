import React from "react";
import { Head } from "@inertiajs/react";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import { Box, Button, Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import ShowPDFModal from "../components/ShowPDFModal";
import { DocumentsEditFormCard } from "../components/DocumentsEditFormCard";
import { SigantureInputCard } from "../components/SigantureInputCard";
import PplForm from "../components/ppl/PplForm";
import useEditPpl from "./use_ppl/useEditPpl";

export default function EditPpl({
    ppl,
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
    } = useEditPpl({ ppl });
    return (
        <>
            <Head title="Edit PPL" />
            <ShowPDFModal
                handleClose={handleCloseShowPDF}
                open={showPDF.open}
                name={showPDF.name}
                file={showPDF.file}
            />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.ppl.index")}>PPL</AppLink>
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
                            Edit Formulir Permohonan PPL
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
                        display={"flex"}
                        flexDirection={"column"}
                        gap={2}
                    >
                        <PplForm
                            formType="update"
                            pplCode={ppl.code}
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
                            files={ppl.files}
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
