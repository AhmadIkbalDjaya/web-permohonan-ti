import React from "react";
import { Head } from "@inertiajs/react";
import {
    Box,
    Button,
    FormControlLabel,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import ReactToPrint from "react-to-print";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import CetakKompren from "../cetak/cetakKompren";
import { ShowApplicantDocumentsCard } from "../components/ShowApplicantDocumentsCard";
import ShowPDFModal from "../components/ShowPDFModal";
import { ShowApplicantSignCard } from "../components/ShowApplicantSignCard";
import ShowComprehensiveData from "../components/comprehensive/show/ShowComprehensiveData";
import useShowComprehensive from "./use_comprehensive/useShowComprehensive";

export default function ShowComprehensive({
    comprehensive,
    file_requirements,
}) {
    const {
        confirmDelete,
        handleOpenDelete,
        handleCloseDelete,
        handleDeleteData,
        componentRef,
        hodSignature,
        setHodSignature,
        showPDF,
        handleClickShowPDF,
        handleCloseShowPDF,
    } = useShowComprehensive({ comprehensive });
    return (
        <>
            <Head title="Detail Permohonan" />
            <ConfirmDeleteModal
                open={confirmDelete}
                handleClose={handleCloseDelete}
                handleDelete={handleDeleteData}
            />
            <ShowPDFModal
                handleClose={handleCloseShowPDF}
                open={showPDF.open}
                name={showPDF.name}
                file={showPDF.file}
            />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.comprehensive.index")}>
                        Kompren
                    </AppLink>
                    <AppLink color="black">Detail Permohonan</AppLink>
                </AppBreadcrumbs>
                <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    justifyContent={"space-between"}
                    my={1}
                >
                    <Box>
                        <Typography variant="h5" fontWeight={"600"}>
                            Detail Permohonan
                        </Typography>
                        <Typography variant="caption">
                            Detail Permohonan Seminar Hasil
                        </Typography>
                    </Box>
                    <Stack direction={"row"} spacing={1}>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<MdDelete />}
                            sx={{
                                textTransform: "none",
                                display: {
                                    xs: "none",
                                    sm: "inherit",
                                },
                            }}
                            onClick={handleOpenDelete}
                        >
                            Hapus
                        </Button>
                        <Button
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
                            href={route("admin.comprehensive.edit", {
                                comprehensive: comprehensive.id,
                            })}
                        >
                            Edit
                        </Button>
                    </Stack>
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
                        <ShowComprehensiveData comprehensive={comprehensive} />
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
                        <ShowApplicantDocumentsCard
                            file_requirements={file_requirements}
                            files={comprehensive.files}
                            handleClickShowPDF={handleClickShowPDF}
                        />
                        <ShowApplicantSignCard
                            signSrc={comprehensive.applicant_sign}
                        />
                        <Box
                            display={"flex"}
                            gap={1}
                            sx={{
                                display: {
                                    xs: "inherit",
                                    sm: "none",
                                },
                            }}
                        >
                            <Button
                                fullWidth
                                variant="contained"
                                size="small"
                                startIcon={<MdDelete />}
                                sx={{
                                    textTransform: "none",
                                }}
                            >
                                Hapus
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                size="small"
                                startIcon={<MdModeEdit />}
                                sx={{
                                    textTransform: "none",
                                }}
                                href={route("admin.comprehensive.edit", {
                                    comprehensive: comprehensive.id,
                                })}
                            >
                                Edit
                            </Button>
                        </Box>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={hodSignature}
                                    onChange={(e) => {
                                        setHodSignature(e.target.checked);
                                    }}
                                />
                            }
                            label="Tanda Tangan kajur"
                        />
                        <ReactToPrint
                            trigger={() => (
                                <Button
                                    variant="contained"
                                    startIcon={<FaFilePdf />}
                                    color="zinc-200"
                                    sx={{ textTransform: "none" }}
                                >
                                    Cetak PDF
                                </Button>
                            )}
                            content={() => componentRef.current}
                            paperSize={{
                                width: "210mm",
                                height: "330mm",
                                unit: "mm",
                            }}
                        />
                        <Box sx={{ display: "none" }}>
                            <CetakKompren
                                ref={componentRef}
                                comprehensive={comprehensive}
                                hodSignature={hodSignature}
                            />
                        </Box>
                    </Box>
                </Box>
            </BaseLayout>
        </>
    );
}
