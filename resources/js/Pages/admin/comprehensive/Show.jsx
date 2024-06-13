import React, { useRef, useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
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
import StatusBox from "../components/StatusBox";
import { idFormatDate } from "../../../helper/dateTimeHelper";
import { ShowRowData } from "../components/ShowRowData";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import CetakKompren from "../cetak/cetakKompren";

export default function ShowComprehensive({
    comprehensive,
    file_requirements,
}) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const handleOpenDelete = (id) => {
        setConfirmDelete(true);
    };
    const handleCloseDelete = () => {
        setConfirmDelete(false);
    };
    const handleDeleteData = () => {
        router.delete(
            route("admin.comprehensive.delete", {
                comprehensive: comprehensive.id,
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
                                Data Kompren
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "600" }}
                            >
                                {comprehensive.code}
                            </Typography>
                        </Box>
                        <Grid container spacing={1} padding={"15px"}>
                            <ShowRowData
                                name={"Status Permohonan"}
                                value={
                                    <>
                                        <StatusBox
                                            status={comprehensive.status.name}
                                        />
                                        <br />
                                        {comprehensive.status_description
                                            ? comprehensive.status_description
                                                  .description
                                            : ""}
                                    </>
                                }
                            />
                            <ShowRowData
                                name={"Nomor Surat"}
                                value={comprehensive.letter_number}
                            />
                            <ShowRowData
                                name={"Tanggal Surat"}
                                value={
                                    comprehensive.letter_date
                                        ? idFormatDate(
                                              comprehensive.letter_date
                                          )
                                        : null
                                }
                            />
                            <Grid item xs={12} marginTop={"15px"}>
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
                                value={comprehensive.student.name}
                            />
                            <ShowRowData
                                name={"NIM"}
                                value={comprehensive.student.nim}
                            />
                            <ShowRowData
                                name={"Tempat, Tanggal Lahir"}
                                value={
                                    `${comprehensive.student.pob}, ` +
                                    idFormatDate(comprehensive.student.dob)
                                }
                            />
                            <ShowRowData
                                name={"Jurusan, Semester"}
                                value={`Teknik Informatika, ${comprehensive.student.semester}`}
                            />
                            <ShowRowData
                                name={"Judul Skripsi"}
                                value={comprehensive.essay_title}
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
                                value={
                                    comprehensive.chairman &&
                                    comprehensive.chairman.name
                                }
                            />
                            <ShowRowData
                                name={"Sekertaris"}
                                value={
                                    comprehensive.secretary &&
                                    comprehensive.secretary.name
                                }
                            />
                            <Grid item xs={12} container spacing={1}>
                                {comprehensive.testers.map((tester, index) => (
                                    <ShowRowData
                                        key={`tester${index}`}
                                        name={`Penguji ${index + 1} (${
                                            tester.description
                                        })`}
                                        value={
                                            tester.lecturer &&
                                            tester.lecturer.name
                                        }
                                    />
                                ))}
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
                                Tanda Tangan Pemohon
                            </Typography>
                            <Box display={"flex"} justifyContent={"center"}>
                                <Box
                                    component={"img"}
                                    sx={{
                                        height: "200px",
                                        width: "300px",
                                    }}
                                    src={comprehensive.applicant_sign}
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
