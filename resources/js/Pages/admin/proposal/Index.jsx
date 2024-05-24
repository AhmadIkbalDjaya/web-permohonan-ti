import React from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head } from "@inertiajs/react";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import Typography from "@mui/material/Typography";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    InputBase,
    MenuItem,
    Pagination,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ThemeProvider,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiOutlineEye } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { themePagination } from "../../../theme/PaginationTheme";

export default function Proposal() {
    const tableHeadStyle = {
        fontWeight: "bold",
        padding: "10px 10px",
    };
    return (
        <>
            <Head title="Proposal" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href="/admin">Home</AppLink>
                    <AppLink href="/admin/proposal" color="black">
                        Proposal
                    </AppLink>
                </AppBreadcrumbs>
                <Box display={"flex"} alignItems={"center"} gap={1} mt={1}>
                    <Typography variant="h5" fontWeight={"600"}>
                        Permohonan Proposal
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
                        125
                    </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} my={1}>
                    <AppLink href="/admin/proposal/create">
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
                            <TableRow>
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
                                    Ahmad Ikbal Djaya
                                </TableCell>
                                <TableCell
                                    sx={{
                                        padding: "0 10px",
                                        fontWeight: "600",
                                    }}
                                >
                                    60200120073
                                </TableCell>
                                <TableCell
                                    sx={{
                                        padding: "0 10px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Tutor Kaya Tanpa Kerja
                                </TableCell>
                                <TableCell
                                    sx={{
                                        padding: "0 10px",
                                        fontWeight: "600",
                                    }}
                                >
                                    01 Juni 2024
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
                                        <TbEdit size={22} />
                                        <RiDeleteBin6Line size={22} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Box display={"flex"} gap={1}>
                        <Typography color={"gray-500"} fontWeight={"400"}>
                            Tampilkan
                        </Typography>
                        <FormControl size="small">
                            <Select
                                value={10}
                                style={{ height: "25px" }}
                                sx={{ border: "1px solid gray-500" }}
                            >
                                <MenuItem value={10}>
                                    <Typography
                                        color={"gray-500"}
                                        fontSize={"14px"}
                                    >
                                        10
                                    </Typography>
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <Typography color={"gray-500"} fontWeight={"400"}>
                            Data
                        </Typography>
                    </Box>
                    <ThemeProvider theme={themePagination}>
                        <Pagination
                            count={4}
                            size="small"
                            shape="rounded"
                        ></Pagination>
                    </ThemeProvider>
                </Box>
            </BaseLayout>
        </>
    );
}
