import { Head, router, usePage } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
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
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Select,
    MenuItem,
    FormControl,
    Pagination,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import {
    tableCellStyle,
    tableCheckboxStyle,
    tableHeadStyle,
} from "../components/styles/tableStyles";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import AppInputLabel from "../components/elements/input/AppInputLabel";
import { IoMdClose } from "react-icons/io";
import InputErrorMessage from "../components/elements/input/InputErrorMessage";
import pickBy from "lodash.pickby";

export default function FileRequirement({
    file_requirements,
    meta,
    request_type,
}) {
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

    const { errors } = usePage().props;
    const [formValues, setFormValues] = useState({
        modal_open: false,
        form_type: "create",
        id: "",
        name: "",
        is_required: "",
    });
    const handleOpenForm = ({
        form_type = "create",
        id = "",
        name = "",
        is_required = "",
    }) => {
        setFormValues({
            modal_open: true,
            form_type,
            id,
            name,
            is_required,
        });
    };
    const handleCloseForm = () => {
        setFormValues({
            modal_open: false,
            form_type: "create",
            id: "",
            name: "",
            is_required: "",
        });
    };
    const handleChangeForm = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues((values) => ({
            ...values,
            [name]: value,
        }));
    };
    const handleSubmitForm = (e) => {
        if (formValues.form_type == "update") {
            router.post(
                route("admin.file-requirement.update", {
                    file_requirement: formValues.id,
                }),
                {
                    ...formValues,
                    request_type,
                    _method: "PUT",
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        setFormValues({
                            modal_open: false,
                            form_type: "create",
                            id: "",
                            name: "",
                            is_required: "",
                        });
                    },
                }
            );
        } else {
            router.post(
                route("admin.file-requirement.store"),
                {
                    ...formValues,
                    request_type,
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        setFormValues({
                            modal_open: false,
                            form_type: "create",
                            id: "",
                            name: "",
                            is_required: "",
                        });
                    },
                }
            );
        }
    };

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
            route("admin.file-requirement.delete", {
                file_requirement: confirmDelete.id,
            })
        );
        setConfirmDelete({
            open: false,
            id: "",
        });
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
    return (
        <>
            <Head title="Berkas Pemohonan" />
            <ConfirmDeleteModal
                open={confirmDelete.open}
                handleClose={handleCloseDelete}
                handleDelete={handleDeleteData}
            />
            <BaseLayout>
                <Dialog
                    open={formValues.modal_open}
                    onClose={handleCloseForm}
                    fullWidth
                    maxWidth="xs"
                >
                    <DialogTitle>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Typography variant="" color="initial">
                                Tambah Berkas
                            </Typography>
                            <IoMdClose
                                style={{ cursor: "pointer" }}
                                onClick={handleCloseForm}
                            />
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <AppInputLabel label="Nama Berkas" />
                        <TextField
                            id="name"
                            name="name"
                            type="string"
                            value={formValues.name}
                            onChange={handleChangeForm}
                            placeholder="Masukkan Nama Berkas"
                            fullWidth
                            error={errors.name ? true : false}
                            helperText={errors.name ?? ""}
                        />
                        <AppInputLabel label="Status" />
                        <Select
                            id="is_required"
                            name="is_required"
                            // value={""}
                            value={formValues.is_required}
                            onChange={handleChangeForm}
                            displayEmpty
                            error={errors.is_required ? true : false}
                            fullWidth
                            sx={{ textTransform: "capitalize" }}
                        >
                            <MenuItem value="" disabled>
                                <Typography
                                    variant="body2"
                                    color="#ababab"
                                    fontWeight={"600"}
                                    display={"flex"}
                                >
                                    Pilih Status
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                value={1}
                                sx={{
                                    textTransform: "capitalize",
                                }}
                            >
                                Wajib
                            </MenuItem>
                            <MenuItem
                                value={0}
                                sx={{
                                    textTransform: "capitalize",
                                }}
                            >
                                Opsinal
                            </MenuItem>
                        </Select>
                        {errors.is_required && (
                            <InputErrorMessage>
                                {errors.is_required}
                            </InputErrorMessage>
                        )}
                    </DialogContent>
                    <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        mx={2}
                        mb={2}
                    >
                        <Button
                            color="error"
                            sx={{ textTransform: "none" }}
                            variant="contained"
                            onClick={handleCloseForm}
                            >
                            Cancel
                        </Button>
                        <Button
                            sx={{ textTransform: "none" }}
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitForm}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Dialog>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.proposal.index")}>
                        Proposal
                    </AppLink>
                    <AppLink
                        href={route("admin.proposal.file_requirement")}
                        color="black"
                    >
                        Berkas Pemohonan
                    </AppLink>
                </AppBreadcrumbs>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                    mt={1}
                    mb={5}
                >
                    <Typography variant="h5" fontWeight={"600"}>
                        Berkas Permohonan Proposal
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
                    <Button
                        variant="contained"
                        startIcon={<FaPlus />}
                        size="small"
                        sx={{
                            textTransform: "none",
                        }}
                        onClick={handleOpenForm}
                    >
                        Berkas
                    </Button>
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
                                    <Checkbox
                                        sx={{
                                            color: "zinc-200",
                                            "&.Mui-checked": {
                                                color: "primary2",
                                            },
                                        }}
                                    ></Checkbox>
                                </TableCell>
                                <TableCell sx={tableHeadStyle}>Nama</TableCell>
                                <TableCell sx={tableHeadStyle}>
                                    Status
                                </TableCell>
                                <TableCell sx={tableHeadStyle}>Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {file_requirements.data.map((file, index) => (
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
                                        {file.name}
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        <Typography
                                            variant=""
                                            color={
                                                file.is_required
                                                    ? "#f44336"
                                                    : "#4caf50"
                                            }
                                            backgroundColor={
                                                file.is_required
                                                    ? "#ffebee"
                                                    : "#e8f5e9"
                                            }
                                            padding={"1px 4px"}
                                            borderRadius={"3px"}
                                            sx={{ textTransform: "capitalize" }}
                                        >
                                            {file.is_required
                                                ? "Wajib"
                                                : "Opsional"}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            display={"flex"}
                                            columnGap={1}
                                            alignItems={"center"}
                                        >
                                            <TbEdit
                                                cursor={"pointer"}
                                                size={22}
                                                onClick={() => {
                                                    handleOpenForm({
                                                        form_type: "update",
                                                        id: file.id,
                                                        name: file.name,
                                                        is_required:
                                                            file.is_required,
                                                    });
                                                }}
                                            />
                                            <RiDeleteBin6Line
                                                cursor={"pointer"}
                                                size={22}
                                                onClick={() => {
                                                    handleOpenDelete(file.id);
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
