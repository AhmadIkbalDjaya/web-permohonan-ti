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
import {
    convertToHHMM,
    getDateDay,
    idFormatDate,
} from "../../../helper/dateTimeHelper";
import { ShowRowData } from "../components/ShowRowData";

export default function ShowResult({ result, file_requirements }) {
  console.log(result);
    const componentRef = useRef();
    return (
        <>
            <Head title="Detail Permohonan" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.result.index")}>Hasil</AppLink>
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
                            href={route("admin.result.edit", {
                                result: result.id,
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
                            <ShowRowData
                                name={"Status Permohonan"}
                                value={
                                    <>
                                        {/* {result.status} */}Diterima <br />
                                        {/* ({result.status.description}){" "} */}
                                        (Deskripsi Status)
                                    </>
                                }
                            />
                            <ShowRowData
                                name={"Nomor Surat"}
                                value={
                                    <>
                                        {/* {result.letter_number} */}
                                        347/TI-UINAM/V/2024
                                    </>
                                }
                            />
                            <ShowRowData
                                name={"Tanggal Surat"}
                                value={
                                    <>
                                        {/* {result.letter_number} */}
                                        15 Mei 2024
                                    </>
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
                                value={result.student.name}
                            />
                            <ShowRowData
                                name={"NIM"}
                                value={result.student.nim}
                            />
                            <ShowRowData
                                name={"Tempat, Tanggal Lahir"}
                                value={
                                    `${result.student.pob}, ` +
                                    idFormatDate(result.student.dob)
                                }
                            />
                            <ShowRowData
                                name={"Jurusan, Semester"}
                                value={`Teknik Informatika, ${result.student.semester}`}
                            />
                            <ShowRowData
                                name={"Judul Skripsi"}
                                value={result.essay_title}
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
                            <ShowRowData name={"Ketua"} />
                            <ShowRowData name={"Sekertaris"} />
                            <Grid item xs={12} container spacing={1}>
                                {result.mentors.map((mentor, index) => (
                                    <ShowRowData
                                        key={`mentor${index}`}
                                        name={`Pembimbing ${index + 1}`}
                                        value={mentor.name}
                                    />
                                ))}
                                {result.testers.map((tester, index) => (
                                    <ShowRowData
                                        key={`tester${index}`}
                                        name={`Penguji ${index + 1}`}
                                        value={tester.name}
                                    />
                                ))}
                            </Grid>
                            <ShowRowData name={"Pelaksana"} />
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
                                    result.schedule.date
                                )}, ${idFormatDate(result.schedule.date)}`}
                            />
                            <ShowRowData
                                name={"Waktu"}
                                value={`${convertToHHMM(
                                    result.schedule.time
                                )} - ${convertToHHMM(
                                    result.schedule.time
                                )} WITA`}
                            />
                            <ShowRowData
                                name={"Tempat Pelaksanaan"}
                                value={result.schedule.location}
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
                                                {result.files.some(
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
                                    src={result.applicant_sign}
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
                                href={route("admin.result.edit", {
                                    result: result.id,
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
