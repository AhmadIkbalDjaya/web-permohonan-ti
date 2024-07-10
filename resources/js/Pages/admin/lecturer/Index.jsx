import React, { useState, useRef } from "react";
import { Head, router } from "@inertiajs/react";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
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
    Typography,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import pickBy from "lodash.pickby";
import {
    tableCellStyle,
    tableCheckboxStyle,
    tableHeadStyle,
} from "../components/styles/tableStyles";
import { HiOutlineEye } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
    convertGenderToID,
    convertRoleToID,
} from "../../../helper/dataToIdHelper";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function Lecturer({ meta, lecturers }) {
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
            route("admin.lecturer.destroy", {
                lecturer: confirmDelete.id,
            })
        );
        setConfirmDelete({
            open: false,
            id: "",
        });
    };
    return (
        <>
            <Head title="Dosen & Staff" />
            <BaseLayout>
                <ConfirmDeleteModal
                    open={confirmDelete.open}
                    handleClose={handleCloseDelete}
                    handleDelete={handleDeleteData}
                />
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.lecturer.index")} color="black">
                        Dosen & Staff
                    </AppLink>
                </AppBreadcrumbs>
                <Box display={"flex"} alignItems={"center"} gap={1} mt={1}>
                    <Typography variant="h5" fontWeight={"600"}>
                        Dosen & Staff
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
                    <AppLink href="/admin/lecturer/create">
                        <Button
                            variant="contained"
                            startIcon={<FaPlus />}
                            size="small"
                            sx={{
                                textTransform: "none",
                            }}
                        >
                            Dosen
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
                                <TableCell sx={tableHeadStyle}>Peran</TableCell>
                                <TableCell sx={tableHeadStyle}>nip</TableCell>
                                <TableCell sx={tableHeadStyle}>
                                    jenis Kelamin
                                </TableCell>
                                <TableCell sx={tableHeadStyle}>Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lecturers.data.map((lecturer, index) => (
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
                                        {lecturer.name}
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        {convertRoleToID(lecturer.role)}
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        {lecturer.nip ?? "-"}
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        {convertGenderToID(lecturer.gender)}
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
                                                    "admin.lecturer.show",
                                                    {
                                                        lecturer: lecturer.id,
                                                    }
                                                )}
                                            >
                                                <HiOutlineEye size={22} />
                                            </AppLink>
                                            <AppLink
                                                color={"black"}
                                                href={route(
                                                    "admin.lecturer.edit",
                                                    {
                                                        lecturer: lecturer.id,
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
                                                        lecturer.id
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
                    <Pagination
                        count={meta.total_page}
                        page={page.current}
                        onChange={handleChangePage}
                        size="small"
                        shape="rounded"
                    ></Pagination>
                </Box>
            </BaseLayout>
        </>
    );
}