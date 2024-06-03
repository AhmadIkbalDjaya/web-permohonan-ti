import React, { useRef } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import { Head } from "@inertiajs/react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import CetakProposal from "../cetak/cetakProposal";
import { getDateDay, idFormatDate } from "../../../helper/dateTimeHelper";

export default function ShowProposal({ proposal, file_requirements }) {
    const componentRef = useRef();
    return (
        <>
            <Head title="Detail Permohonan" />
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
                        <Typography
                            variant="body2"
                            color="initial"
                            sx={{ p: "15px", fontWeight: "600" }}
                            borderBottom={"1px solid"}
                            borderColor={"slate-300"}
                        >
                            Data Seminar
                        </Typography>
                        <Grid container spacing={1} padding={"15px"}>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Status Permohonan
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {/* {proposal.status} */}Diterima <br />
                                    {/* ({proposal.status.description}){" "} */}
                                    (Deskripsi Status)
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Nomor Surat
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {/* {proposal.letter_number} */}
                                    347/TI-UINAM/V/2024
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Tanggal Surat
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {/* {proposal.letter_number} */}
                                    15 Mei 2024
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Kode Pengajuan
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {/* {proposal.letter_number} */}
                                    PROPO200524121231
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    color="initial"
                                    sx={{ fontWeight: "600" }}
                                >
                                    Data Mahasiswa :
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Nama
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {proposal.student.name}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    NIM
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {proposal.student.nim}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Tempat, Tanggal Lahir
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {proposal.student.pob},{" "}
                                    {idFormatDate(proposal.student.dob)}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Jurusan, Semester
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    Teknik Informatika,{" "}
                                    {proposal.student.semester}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Judul Skripsi
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {proposal.essay_title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} marginTop={"15px"}>
                                <Typography
                                    variant="body2"
                                    color="initial"
                                    sx={{ fontWeight: "600" }}
                                >
                                    Dewan Penguji dan Pelaksana :
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Ketua
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {/* {proposal.essay_title} */}-
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Sekretaris
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {/* {proposal.essay_title} */}-
                                </Typography>
                            </Grid>
                            {proposal.mentors.map((mentor, index) => (
                                <>
                                    <Grid
                                        key={`mentor${index}`}
                                        item
                                        xs={5}
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight={"500"}
                                        >
                                            Pembimbing {index + 1}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight={"500"}
                                        >
                                            :
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={7}
                                        key={`mentor_name${index}`}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight={"500"}
                                        >
                                            {mentor.name ?? "-"}
                                        </Typography>
                                    </Grid>
                                </>
                            ))}
                            {proposal.testers.map((tester, index) => (
                                <>
                                    <Grid
                                        key={`tester${index}`}
                                        item
                                        xs={5}
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight={"500"}
                                        >
                                            Penguji {index + 1}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight={"500"}
                                        >
                                            :
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={7}
                                        key={`tester_name${index}`}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight={"500"}
                                        >
                                            {tester.name ?? "-"}
                                        </Typography>
                                    </Grid>
                                </>
                            ))}
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Pelaksana
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {/* {proposal.essay_title} */}-
                                </Typography>
                            </Grid>
                            <Grid item xs={12} marginTop={"15px"}>
                                <Typography
                                    variant="body2"
                                    color="initial"
                                    sx={{ fontWeight: "600" }}
                                >
                                    Jadwal Pelaksanaan :
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Hari dan Tanggal
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {getDateDay(proposal.schedule.date)},{" "}
                                    {idFormatDate(proposal.schedule.date)}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Waktu
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {proposal.schedule.time} - xx:xx wita
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="body2" fontWeight={"500"}>
                                    Tempat Pelaksanaan
                                </Typography>
                                <Typography variant="body2" fontWeight={"500"}>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={"500"}>
                                    {proposal.schedule.location}
                                </Typography>
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
                                        <>
                                            <Grid
                                                key={`label${index}`}
                                                item
                                                xs={12}
                                            >
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
                                            <Grid
                                                key={`viewButton${index}`}
                                                item
                                                xs={12}
                                            >
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
                                        </>
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
                            <CetakProposal ref={componentRef} />
                        </Box>
                    </Box>
                </Box>
            </BaseLayout>
        </>
    );
}
