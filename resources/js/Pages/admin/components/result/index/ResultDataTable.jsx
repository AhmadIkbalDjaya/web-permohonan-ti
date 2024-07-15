import {
    Box,
    Checkbox,
    FormControl,
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
import React from "react";
import {
    tableCellStyle,
    tableCheckboxStyle,
    tableHeadStyle,
} from "../../styles/tableStyles";
import AppLink from "../../AppLink";
import { idFormatDate } from "../../../../../helper/dateTimeHelper";
import StatusBox from "../../StatusBox";
import { HiOutlineEye } from "react-icons/hi2";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Perpage } from "../../Perpage";

export default function ResultDataTable({
    results,
    meta,
    handleChangePerpage,
    handleChangePage,
    handleOpenDelete,
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
                            <TableCell sx={tableHeadStyle}>NIM</TableCell>
                            <TableCell sx={tableHeadStyle}>
                                Judul Skripsi
                            </TableCell>
                            <TableCell sx={tableHeadStyle}>
                                Tanggal Pengajuan
                            </TableCell>
                            <TableCell sx={tableHeadStyle}>Status</TableCell>
                            <TableCell sx={tableHeadStyle}>Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.data.map((result, index) => (
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
                                    {result.student.name}
                                </TableCell>
                                <TableCell sx={tableCellStyle}>
                                    {result.student.nim}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        padding: "0 10px",
                                        fontWeight: "600",
                                        minWidth: "250px",
                                        maxWidth: "250px",
                                    }}
                                >
                                    {result.essay_title}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        padding: "0 10px",
                                        fontWeight: "600",
                                        minWidth: "150px",
                                        maxWidth: "200px",
                                    }}
                                >
                                    {idFormatDate(result.created_at)}
                                </TableCell>
                                <TableCell sx={tableCellStyle}>
                                    <StatusBox status={result.status.name} />
                                </TableCell>
                                <TableCell sx={tableCellStyle}>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                    >
                                        <AppLink
                                            color="black"
                                            href={route("admin.result.show", {
                                                result: result.id,
                                            })}
                                        >
                                            <HiOutlineEye size={22} />
                                        </AppLink>
                                        <AppLink
                                            color={"black"}
                                            href={route("admin.result.edit", {
                                                result: result.id,
                                            })}
                                        >
                                            <TbEdit size={22} />
                                        </AppLink>
                                        <RiDeleteBin6Line
                                            cursor={"pointer"}
                                            size={22}
                                            onClick={() => {
                                                handleOpenDelete(result.id);
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
                />
            </Box>
        </>
    );
}
