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
import { idFormatDate } from "../../../helper/dateTimeHelper";
import { ShowRowData } from "../components/ShowRowData";
import StatusBox from "../components/StatusBox";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function ShowPPL({ ppl }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const handleOpenDelete = (id) => {
        setConfirmDelete(true);
    };
    const handleCloseDelete = () => {
        setConfirmDelete(false);
    };
    const handleDeleteData = () => {
        router.delete(
            route("admin.ppl.delete", {
                ppl: ppl.id,
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
            ;
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.ppl.index")}>PPL</AppLink>
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
                            href={route("admin.ppl.edit", {
                                ppl: ppl.id,
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
                                Data PPL
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "600" }}
                            >
                                {ppl.code}
                            </Typography>
                        </Box>
                        <Grid container spacing={1} padding={"15px"}>
                            <ShowRowData
                                name={"Status Permohonan"}
                                value={
                                    <>
                                        <StatusBox status={ppl.status} />
                                        <br />
                                        {ppl.status_description}
                                    </>
                                }
                            />
                            <ShowRowData
                                name={"Nomor Surat Pembimbing"}
                                value={ppl.letter_number_mentor}
                            />
                            <ShowRowData
                                name={"Nomor Surat Pengantar"}
                                value={ppl.letter_number_introduction}
                            />
                            <ShowRowData
                                name={"Ditujukan Kepada"}
                                value={ppl.addressed_to}
                            />
                            <ShowRowData
                                name={"Tanggal Surat"}
                                value={
                                    ppl.letter_date
                                        ? idFormatDate(ppl.letter_date)
                                        : null
                                }
                            />
                            <ShowRowData
                                name={"Lokasi PPL"}
                                value={ppl.location}
                            />
                            <ShowRowData
                                name={"Alamat"}
                                value={ppl.location_address}
                            />
                            <ShowRowData
                                name={"Jadwal PPL"}
                                value={`${idFormatDate(
                                    ppl.start_date
                                )} - ${idFormatDate(ppl.start_date)}`}
                            />
                            <ShowRowData
                                name={"Pembimbing"}
                                value={ppl.mentor}
                            />
                            {ppl.students.map((student, index) => (
                                <Grid
                                    item
                                    container
                                    spacing={2}
                                    marginTop={"10px"}
                                    key={index}
                                >
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            color="initial"
                                            sx={{ fontWeight: "600" }}
                                        >
                                            Data Mahasiswa Ke-{index + 1} :
                                        </Typography>
                                    </Grid>
                                    <ShowRowData
                                        name={"Nama"}
                                        value={student.name}
                                    />
                                    <ShowRowData
                                        name={"NIM"}
                                        value={student.nim}
                                    />
                                    <ShowRowData
                                        name={"Tempat, Tanggal Lahir"}
                                        value={
                                            `${student.pob}, ` +
                                            idFormatDate(student.dob)
                                        }
                                    />
                                    <ShowRowData
                                        name={"Jurusan, Semester"}
                                        value={`Teknik Informatika, ${student.semester}`}
                                    />
                                </Grid>
                            ))}
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
                                    src={ppl.applicant_sign}
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
                                href={route("admin.ppl.edit", {
                                    ppl: ppl.id,
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
                            {/* <CetakProposal ref={componentRef} /> */}
                        </Box>
                    </Box>
                </Box>
            </BaseLayout>
        </>
    );
}
