import React from "react";
import { Head } from "@inertiajs/react";
import ReactToPrint from "react-to-print";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import {
    Box,
    Button,
    FormControlLabel,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import { ShowProposalData } from "../components/proposal/show/ShowProposalData";
import { ShowApplicantDocumentsCard } from "../components/ShowApplicantDocumentsCard";
import { ShowApplicantSignCard } from "../components/ShowApplicantSignCard";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import BaseLayout from "../base_layout/BaseLayout";
import AppLink from "../components/AppLink";
import CetakProposal from "../cetak/cetakProposal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ShowPDFModal from "../components/ShowPDFModal";
import useShowProposal from "./use_proposal/useShowProposal";

export default function ShowProposal({ proposal, file_requirements }) {
    const {
        showPDF,
        handleClickShowPDF,
        handleCloseShowPDF,
        confirmDelete,
        handleOpenDelete,
        handleCloseDelete,
        handleDeleteData,
        hodSignature,
        setHodSignature,
        componentRef,
    } = useShowProposal({ proposal });
    return (
        <>
            <Head title="Detail Permohonan" />
            <ShowPDFModal
                handleClose={handleCloseShowPDF}
                open={showPDF.open}
                name={showPDF.name}
                file={showPDF.file}
            />
            <ConfirmDeleteModal
                open={confirmDelete}
                handleClose={handleCloseDelete}
                handleDelete={handleDeleteData}
            />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.proposal.index")}>
                        Proposal
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
                            Detail Permohonan Seminar Proposal
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
                            href={route("admin.proposal.edit", {
                                proposal: proposal.id,
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
                        <ShowProposalData proposal={proposal} />
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
                            files={proposal.files}
                            handleClickShowPDF={handleClickShowPDF}
                        />
                        <ShowApplicantSignCard
                            signSrc={proposal.applicant_sign}
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
                                href={route("admin.proposal.edit", {
                                    proposal: proposal.id,
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
                            <CetakProposal
                                ref={componentRef}
                                proposal={proposal}
                                hodSignature={hodSignature}
                            />
                        </Box>
                    </Box>
                </Box>
            </BaseLayout>
        </>
    );
}
