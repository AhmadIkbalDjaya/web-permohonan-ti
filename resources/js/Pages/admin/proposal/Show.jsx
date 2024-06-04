import React, { useRef, useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import StatusBox from "../components/StatusBox";
import { Head, router } from "@inertiajs/react";
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import CetakProposal from "../cetak/cetakProposal";
import {
    convertToHHMM,
    getDateDay,
    idFormatDate,
} from "../../../helper/dateTimeHelper";
import { ShowRowData } from "../components/ShowRowData";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function ShowProposal({ proposal, file_requirements }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const handleOpenDelete = (id) => {
        setConfirmDelete(true);
    };
    const handleCloseDelete = () => {
        setConfirmDelete(false);
    };
    const handleDeleteData = () => {
        router.delete(
            route("admin.proposal.delete", {
                proposal: proposal.id,
            })
        );
        setConfirmDelete(false);
    };

    const componentRef = useRef();
    const [hodSignature, setHodSignature] = useState(false);
    return (
        <>
            <Head title="Detail Permohonan" />
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
                            color="primary"
                            size="small"
                            startIcon={<MdDelete />}
                            sx={{
                                background: "#B20600",
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
                            color="primary"
                            size="small"
                            startIcon={<MdModeEdit />}
                            sx={{
                                background: "#B20600",
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
                            display={"flex"}
                            justifyContent={"space-between"}
                        >
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "600" }}
                            >
                                Data Seminar
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "600" }}
                            >
                                {proposal.code}
                            </Typography>
                        </Box>
                        <Grid container spacing={1} padding={"15px"}>
                            <ShowRowData
                                name={"Status Permohonan"}
                                value={
                                    <>
                                        <StatusBox status={proposal.status} />
                                        <br />
                                        {proposal.status_description}
                                    </>
                                }
                            />
                            <ShowRowData
                                name={"Nomor Surat"}
                                value={proposal.letter_number}
                            />
                            <ShowRowData
                                name={"Tanggal Surat"}
                                value={
                                    proposal.letter_date
                                        ? idFormatDate(proposal.letter_date)
                                        : null
                                }
                            />

                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    color="initial"
                                    sx={{ fontWeight: "600" }}
                                >
                                    Data Mahasiswa :
                                </Typography>
                            </Grid>
                            <ShowRowData
                                name={"Nama"}
                                value={proposal.student.name}
                            />
                            <ShowRowData
                                name={"NIM"}
                                value={proposal.student.nim}
                            />
                            <ShowRowData
                                name={"Tempat, Tanggal Lahir"}
                                value={
                                    `${proposal.student.pob}, ` +
                                    idFormatDate(proposal.student.dob)
                                }
                            />
                            <ShowRowData
                                name={"Jurusan, Semester"}
                                value={`Teknik Informatika, ${proposal.student.semester}`}
                            />
                            <ShowRowData
                                name={"Judul Skripsi"}
                                value={proposal.essay_title}
                            />
                            <Grid item xs={12} marginTop={"15px"}>
                                <Typography
                                    variant="body2"
                                    color="initial"
                                    sx={{ fontWeight: "600" }}
                                >
                                    Dewan Penguji dan Pelaksana :
                                </Typography>
                            </Grid>
                            <ShowRowData
                                name={"Ketua"}
                                value={proposal.chairman}
                            />
                            <ShowRowData
                                name={"Sekertaris"}
                                value={proposal.secretary}
                            />
                            <Grid item xs={12} container spacing={1}>
                                {proposal.mentors.map((mentor, index) => (
                                    <ShowRowData
                                        key={`mentor${index}`}
                                        name={`Pembimbing ${index + 1}`}
                                        value={mentor.name}
                                    />
                                ))}
                                {proposal.testers.map((tester, index) => (
                                    <ShowRowData
                                        key={`tester${index}`}
                                        name={`Penguji ${index + 1}`}
                                        value={tester.name}
                                    />
                                ))}
                            </Grid>
                            <ShowRowData
                                name={"Pelaksana"}
                                value={proposal.executor}
                            />
                            <Grid item xs={12} marginTop={"15px"}>
                                <Typography
                                    variant="body2"
                                    color="initial"
                                    sx={{ fontWeight: "600" }}
                                >
                                    Jadwal Pelaksanaan :
                                </Typography>
                            </Grid>
                            <ShowRowData
                                name={"Hari dan Tanggal"}
                                value={`${getDateDay(
                                    proposal.schedule.date
                                )}, ${idFormatDate(proposal.schedule.date)}`}
                            />
                            <ShowRowData
                                name={"Waktu"}
                                value={
                                    proposal.schedule.start_time
                                        ? `${convertToHHMM(
                                              proposal.schedule.start_time
                                          )} - ${convertToHHMM(
                                              proposal.schedule.end_time
                                          )} ${proposal.schedule.time_zone}`
                                        : null
                                }
                            />
                            <ShowRowData
                                name={"Tempat Pelaksanaan"}
                                value={proposal.schedule.location}
                            />
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
                            <Typography
                                variant="body2"
                                color="initial"
                                sx={{ p: "15px", fontWeight: "600" }}
                                borderBottom={"1px solid"}
                                borderColor={"slate-300"}
                            >
                                Berkas Pemohon
                            </Typography>
                            <Grid container spacing={2} padding={"15px"}>
                                {file_requirements.map(
                                    (file_requirement, index) => (
                                        <Grid
                                            item
                                            xs={12}
                                            container
                                            key={index}
                                        >
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="body2"
                                                    color="initial"
                                                    fontWeight={"600"}
                                                    display={"flex"}
                                                    sx={{
                                                        textTransform:
                                                            "capitalize",
                                                    }}
                                                >
                                                    {file_requirement.name.replaceAll(
                                                        "_",
                                                        " "
                                                    )}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {proposal.files.some(
                                                    (file) =>
                                                        file.name ==
                                                        file_requirement.name
                                                ) ? (
                                                    <Button
                                                        variant="contained"
                                                        color="gray-100"
                                                        startIcon={
                                                            <FaFilePdf />
                                                        }
                                                        sx={{
                                                            height: "33px",
                                                            textTransform:
                                                                "capitalize",
                                                        }}
                                                        fullWidth
                                                    >
                                                        Lihat
                                                    </Button>
                                                ) : (
                                                    <Typography variant="body2">
                                                        Tidak Ada Berkas
                                                    </Typography>
                                                )}
                                            </Grid>
                                        </Grid>
                                    )
                                )}
                            </Grid>
                        </Box>
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
                                Tanda Tangan Pemohon
                            </Typography>
                            <Box display={"flex"} justifyContent={"center"}>
                                <Box
                                    component={"img"}
                                    sx={{
                                        height: "200px",
                                        width: "300px",
                                    }}
                                    src={proposal.applicant_sign}
                                />
                            </Box>
                        </Box>
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
                                color="primary"
                                size="small"
                                startIcon={<MdDelete />}
                                sx={{
                                    background: "#B20600",
                                    textTransform: "none",
                                }}
                            >
                                Hapus
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<MdModeEdit />}
                                sx={{
                                    background: "#B20600",
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
