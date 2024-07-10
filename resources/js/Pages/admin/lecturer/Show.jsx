import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { ShowRowData } from "../components/ShowRowData";
import {
    convertGenderToID,
    convertRoleToID,
} from "../../../helper/dataToIdHelper";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function ShowLecturer({ lecturer }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const handleOpenDelete = (id) => {
        setConfirmDelete(true);
    };
    const handleCloseDelete = () => {
        setConfirmDelete(false);
    };
    const handleDeleteData = () => {
        router.delete(
            route("admin.lecturer.destroy", {
                lecturer: lecturer.id,
            })
        );
        setConfirmDelete(false);
    };
    return (
        <>
            <Head title="Detail Staf" />
            <BaseLayout>
                <ConfirmDeleteModal
                    open={confirmDelete}
                    handleClose={handleCloseDelete}
                    handleDelete={handleDeleteData}
                />
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.lecturer.index")}>Staf</AppLink>
                    <AppLink color="black">Detail Staf</AppLink>
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
                            href={route("admin.lecturer.edit", {
                                lecturer: lecturer.id,
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
                        >
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "600" }}
                            >
                                Data Staf
                            </Typography>
                        </Box>
                        <Grid container spacing={1} padding={"15px"}>
                            <ShowRowData name={"Nama"} value={lecturer.name} />
                            <ShowRowData name={"NIP"} value={lecturer.nip} />
                            <ShowRowData
                                name={"Jenis Kelamin"}
                                value={
                                    lecturer.gender
                                        ? convertGenderToID(lecturer.gender)
                                        : ""
                                }
                            />
                            <ShowRowData
                                name={"Role"}
                                value={
                                    lecturer.role
                                        ? convertRoleToID(lecturer.role)
                                        : ""
                                }
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
                                Tanda Tangan
                            </Typography>
                            <Box display={"flex"} justifyContent={"center"}>
                                {lecturer.signature ? (
                                    <Box
                                        component={"img"}
                                        sx={{
                                            height: "200px",
                                            width: "300px",
                                        }}
                                        src={lecturer.signature}
                                    />
                                ) : (
                                    <Box py={5}>
                                        <Typography
                                            variant="body2"
                                            color="initial"
                                        >
                                            Tanda tangan belum ditambahkan
                                        </Typography>
                                    </Box>
                                )}
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
                                onClick={handleOpenDelete}
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
                                href={route("admin.lecturer.edit", {
                                    lecturer: lecturer.id,
                                })}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </BaseLayout>
        </>
    );
}
