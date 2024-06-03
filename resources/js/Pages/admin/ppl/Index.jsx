import React, { useRef, useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head, router } from "@inertiajs/react";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
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
    Typography,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import {
    tableCellStyle,
    tableCheckboxStyle,
    tableHeadStyle,
} from "../components/styles/tableStyles";
import { HiOutlineEye } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { themePagination } from "../../../theme/PaginationTheme";
import pickBy from "lodash.pickby";
import { idFormatDate } from "../../../helper/dateTimeHelper";

export default function Ppl({ ppls, meta }) {
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
            route("admin.comprehensive.delete", {
                comprehensive: confirmDelete.id,
            })
        );
        setConfirmDelete({
            open: false,
            id: "",
        });
    };
    return (
        <>
            <Head title="Permohonan PPL" />
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
                    <AppLink href={route("admin.ppl.index")} color="black">
                        PPL
                    </AppLink>
                </AppBreadcrumbs>
                <Box display={"flex"} alignItems={"center"} gap={1} mt={1}>
                    <Typography variant="h5" fontWeight={"600"}>
                        Permohonan PPL
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
                    <AppLink href={route("admin.ppl.create")}>
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
                                    Instansi
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
                            {ppls.data.map((ppl, index) => (
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
                                        {ppl.students[0].name}
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        {ppl.students[0].nim}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: "0 10px",
                                            fontWeight: "600",
                                            minWidth: "250px",
                                            maxWidth: "250px",
                                        }}
                                    >
                                        {ppl.location}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: "0 10px",
                                            fontWeight: "600",
                                            minWidth: "150px",
                                            maxWidth: "200px",
                                        }}
                                    >
                                        {idFormatDate(ppl.created_at)}
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        <Typography
                                            variant=""
                                            // color={"green"}
                                            // color={"red"}
                                            color={"#fbc02d"}
                                            // backgroundColor={"#e8f5e9"}
                                            // backgroundColor={"#ffebee"}
                                            backgroundColor={"#fffde7"}
                                            padding={"0px 3px"}
                                            borderRadius={"3px"}
                                        >
                                            {/* Diterima */}
                                            {/* Ditolak */}
                                            Pending
                                        </Typography>
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
                                            <AppLink
                                                color="black"
                                                href={route("admin.ppl.show", {
                                                    ppl: ppl.id,
                                                })}
                                            >
                                                <HiOutlineEye size={22} />
                                            </AppLink>
                                            <AppLink
                                                color={"black"}
                                                href={route("admin.ppl.edit", {
                                                    ppl: ppl.id,
                                                })}
                                            >
                                                <TbEdit size={22} />
                                            </AppLink>
                                            <RiDeleteBin6Line
                                                cursor={"pointer"}
                                                size={22}
                                                onClick={() => {
                                                    handleOpenDelete(ppl.id);
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
            ;
        </>
    );
}
