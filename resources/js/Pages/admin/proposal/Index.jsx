import React, { useRef, useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head, router } from "@inertiajs/react";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import StatusBox from "../components/StatusBox";
import Typography from "@mui/material/Typography";
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
import { idFormatDate } from "../../../helper/dateTimeHelper";
import pickBy from "lodash.pickby";
import {
    tableCellStyle,
    tableCheckboxStyle,
    tableHeadStyle,
} from "../components/styles/tableStyles";

export default function Proposal({ proposals, meta }) {
    const showItemOptions = [5, 10, 15, 20, 25];
    const [loading, setloading] = useState(false);
    const perpage = useRef(meta.perpage);
    const search = useRef(meta.search ?? "");
    const page = useRef(meta.page);
    const handleChangePerpage = (e) => {
        perpage.current = e.target.value;
        getData();
    };
    const handleChangeSearch = (e) => {
        search.current = e.target.value;
        if (meta.search == "" && search.current != "") {
            page.current = 1;
        }
        getData();
    };
    const handleChangePage = (e, value) => {
        page.current = value;
        getData();
    };
    const getData = () => {
        setloading(true);
        router.get(
            route(route().current()),
            pickBy({
                perpage: perpage.current != 10 ? perpage.current : undefined,
                search: search.current,
                page: page.current != 1 ? page.current : undefined,
            }),
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setloading(false),
            }
        );
    };
    if (page.current > meta.total_page) {
        page.current = meta.total_page;
        getData();
    }

    const [confirmDelete, setConfirmDelete] = useState({
        open: false,
        id: "",
    });
    const handleOpenDelete = (id) => {
        setConfirmDelete({
            open: true,
            id,
        });
    };
    const handleCloseDelete = () => {
        setConfirmDelete({
            open: false,
            id: "",
        });
    };
    const handleDeleteData = () => {
        router.delete(
            route("admin.proposal.delete", {
                proposal: confirmDelete.id,
            })
        );
        setConfirmDelete({
            open: false,
            id: "",
        });
    };
    return (
        <>
            <Head title="Proposal" />
            <Dialog open={confirmDelete.open} onClose={handleCloseDelete}>
                <DialogTitle id="alert-dialog-title">{"Konfimasi"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Yakin Ingin Menghapus Permohonan
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button size="small" onClick={handleCloseDelete}>
                        Batal
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={handleDeleteData}
                        autoFocus
                    >
                        Hapus
                    </Button>
                </DialogActions>
            </Dialog>
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.proposal.index")} color="black">
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
                        {meta.total_item}
                    </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} my={1}>
                    <AppLink href="/admin/proposal/create">
                        <Button
                            variant="contained"
                            startIcon={<FaPlus />}
                            size="small"
                            sx={{
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
                            value={search.current}
                            onChange={handleChangeSearch}
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
                                    <Checkbox sx={tableCheckboxStyle} />
                                </TableCell>
                                <TableCell sx={tableHeadStyle}>Nama</TableCell>
                                <TableCell sx={tableHeadStyle}>NIM</TableCell>
                                <TableCell sx={tableHeadStyle}>
                                    Judul Skripsi
                                </TableCell>
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
                            {proposals.data.map((proposal, index) => (
                                <TableRow key={index}>
                                    <TableCell padding="checkbox">
                                        <Checkbox sx={tableCheckboxStyle} />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: "0 10px",
                                            fontWeight: "600",
                                            minWidth: "150px",
                                            maxWidth: "200px",
                                        }}
                                    >
                                        {proposal.student.name}
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        {proposal.student.nim}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: "0 10px",
                                            fontWeight: "600",
                                            minWidth: "250px",
                                            maxWidth: "250px",
                                        }}
                                    >
                                        {proposal.essay_title}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: "0 10px",
                                            fontWeight: "600",
                                            minWidth: "150px",
                                            maxWidth: "200px",
                                        }}
                                    >
                                        {idFormatDate(proposal.created_at)}
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        <StatusBox
                                            status={proposal.status.name}
                                        />
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        <Box
                                            display={"flex"}
                                            justifyContent={"space-between"}
                                            alignItems={"center"}
                                        >
                                            <AppLink
                                                color="black"
                                                href={route(
                                                    "admin.proposal.show",
                                                    {
                                                        proposal: proposal.id,
                                                    }
                                                )}
                                            >
                                                <HiOutlineEye size={22} />
                                            </AppLink>
                                            <AppLink
                                                color={"black"}
                                                href={route(
                                                    "admin.proposal.edit",
                                                    {
                                                        proposal: proposal.id,
                                                    }
                                                )}
                                            >
                                                <TbEdit size={22} />
                                            </AppLink>
                                            <RiDeleteBin6Line
                                                cursor={"pointer"}
                                                size={22}
                                                onClick={() => {
                                                    handleOpenDelete(
                                                        proposal.id
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
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Box display={"flex"} gap={1}>
                        <Typography color={"gray-500"} fontWeight={"400"}>
                            Tampilkan
                        </Typography>
                        <FormControl size="small">
                            <Select
                                name="perpage"
                                value={perpage.current}
                                onChange={handleChangePerpage}
                                style={{ height: "25px" }}
                                sx={{ border: "1px solid gray-500" }}
                            >
                                {showItemOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        <Typography
                                            color={"gray-500"}
                                            fontSize={"14px"}
                                        >
                                            {option}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography color={"gray-500"} fontWeight={"400"}>
                            Data
                        </Typography>
                    </Box>
                    <ThemeProvider theme={themePagination}>
                        <Pagination
                            count={meta.total_page}
                            page={page.current}
                            onChange={handleChangePage}
                            size="small"
                            shape="rounded"
                        ></Pagination>
                    </ThemeProvider>
                </Box>
            </BaseLayout>
        </>
    );
}
