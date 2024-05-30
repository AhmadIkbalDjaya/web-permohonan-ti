import React from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head, router } from "@inertiajs/react";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import {
    Box,
    Button,
    Checkbox,
    InputBase,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { tableHeadStyle } from "../components/styles/tableHeadStyle";
import { idFormatDate } from "../../../helper/idFormatDate";
import { HiOutlineEye } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";

export default function Comprehensive({ comprehensives, meta }) {
    return (
        <>
            <Head title="Comprehensive" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink
                        href={route("admin.comprehensive.index")}
                        color="black"
                    >
                        Kompren
                    </AppLink>
                </AppBreadcrumbs>
                <Box display={"flex"} alignItems={"center"} gap={1} mt={1}>
                    <Typography variant="h5" fontWeight={"600"}>
                        Permohonan Komprehensif
                    </Typography>
                    <Typography
                        variant="caption"
                        fontWeight={"600"}
                        color={"#637381"}
                        border={1.5}
                        borderColor={"#637381"}
                        padding={"0px 5px"}
                        borderRadius={10}
                    >
                        {meta.total_item}
                    </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} my={1}>
                    <AppLink href={route("admin.comprehensive.create")}>
                        <Button
                            variant="contained"
                            startIcon={<FaPlus />}
                            size="small"
                            color="primary"
                            sx={{
                                background: "#B20600",
                                textTransform: "none",
                            }}
                        >
                            Permohonan
                        </Button>
                    </AppLink>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                        sx={{
                            backgroundColor: "gray-100",
                            width: "200px",
                            padding: "0 10px",
                            boxSizing: "border-box",
                            borderRadius: "3px",
                        }}
                        border={"1px solid #DFE3E8"}
                    >
                        <FiSearch color="#637381" />
                        <InputBase
                            name="search"
                            // value={search.current}
                            // onChange={handleChangeSearch}
                            placeholder="Cari Data ..."
                            sx={{
                                flexGrow: 1,
                                color: "gray-500",
                                fontWeight: "600",
                                fontSize: "12px",
                                placeholder: {
                                    color: "gray-500",
                                    fontWeight: "600",
                                    fontSize: "12px",
                                },
                            }}
                        />
                    </Box>
                </Box>
                <TableContainer
                    sx={{
                        margin: "20px 0 10px 0",
                        border: "1px solid #C4CDD5",
                        borderRadius: "3px",
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "gray-100" }}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        sx={{
                                            color: "zinc-200",
                                            "&.Mui-checked": {
                                                color: "primary2",
                                            },
                                        }}
                                    ></Checkbox>
                                </TableCell>
                                <TableCell align="left" sx={tableHeadStyle}>
                                    Nama
                                </TableCell>
                                <TableCell sx={tableHeadStyle}>NIM</TableCell>
                                <TableCell sx={tableHeadStyle}>Judul</TableCell>
                                <TableCell sx={tableHeadStyle}>
                                    Tanggal Pengajuan
                                </TableCell>
                                <TableCell sx={tableHeadStyle}>
                                    Status
                                </TableCell>
                                <TableCell sx={tableHeadStyle}>Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {comprehensives.data.map((comprehensive, index) => (
                                <TableRow key={index}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            sx={{
                                                color: "zinc-200",
                                                "&.Mui-checked": {
                                                    color: "primary2",
                                                },
                                            }}
                                        ></Checkbox>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: "0 10px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        {comprehensive.student.name}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: "0 10px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {comprehensive.student.nim}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: "0 10px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {comprehensive.essay_title}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: "0 10px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {idFormatDate(comprehensive.created_at)}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: "0 10px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Pending
                                    </TableCell>
                                    <TableCell
                                        sx={{ padding: "0 10px" }}
                                        align="center"
                                    >
                                        <Box
                                            display={"flex"}
                                            justifyContent={"space-between"}
                                            alignItems={"center"}
                                        >
                                            <HiOutlineEye size={22} />
                                            <AppLink
                                                color={"black"}
                                                href={route(
                                                    "admin.comprehensive.edit",
                                                    {
                                                        comprehensive:
                                                            comprehensive.id,
                                                    }
                                                )}
                                            >
                                                <TbEdit size={22} />
                                            </AppLink>
                                            <RiDeleteBin6Line
                                                size={22}
                                                onClick={() => {
                                                    router.delete(
                                                        route(
                                                            "admin.proposal.delete",
                                                            {
                                                                proposal:
                                                                    proposal.id,
                                                            }
                                                        )
                                                    );
                                                }}
                                            />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </BaseLayout>
            ;
        </>
    );
}
