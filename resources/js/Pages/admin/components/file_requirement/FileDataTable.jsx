import { Perpage } from "../Perpage";
import React from "react";
import {
    Box,
    Checkbox,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
    tableCellStyle,
    tableCheckboxStyle,
    tableHeadStyle,
} from "../styles/tableStyles";

export default function FileDataTable({
    file_requirements,
    meta,
    handleChangePerpage,
    handleChangePage,
    handleOpenDelete,
    handleOpenForm,
}) {
    return (
        <>
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
                            <TableCell sx={tableHeadStyle}>Status</TableCell>
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
                <Perpage
                    value={meta.perpage}
                    handleChangePerpage={handleChangePerpage}
                />
                <Pagination
                    count={meta.total_page}
                    page={meta.page}
                    onChange={handleChangePage}
                    size="small"
                    shape="rounded"
                ></Pagination>
            </Box>
        </>
    );
}
