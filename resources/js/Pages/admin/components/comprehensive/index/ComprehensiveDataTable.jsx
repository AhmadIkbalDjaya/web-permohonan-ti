import { Perpage } from "../../Perpage";
import React from "react";
import AppLink from "../../AppLink";
import StatusBox from "../../StatusBox";
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
} from "@mui/material";
import { HiOutlineEye } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { idFormatDate } from "../../../../../helper/dateTimeHelper";
import {
    tableCellStyle,
    tableCheckboxStyle,
    tableHeadStyle,
} from "../../styles/tableStyles";

export default function ComprehensiveDataTable({
    comprehensives,
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
                            <TableCell sx={tableHeadStyle}>Status</TableCell>
                            <TableCell sx={tableHeadStyle}>Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comprehensives.data.map((comprehensive, index) => (
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
                                    {comprehensive.student.name}
                                </TableCell>
                                <TableCell sx={tableCellStyle}>
                                    {comprehensive.student.nim}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        padding: "0 10px",
                                        fontWeight: "600",
                                        minWidth: "250px",
                                        maxWidth: "250px",
                                    }}
                                >
                                    {comprehensive.essay_title}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        padding: "0 10px",
                                        fontWeight: "600",
                                        minWidth: "150px",
                                        maxWidth: "200px",
                                    }}
                                >
                                    {idFormatDate(comprehensive.created_at)}
                                </TableCell>
                                <TableCell sx={tableCellStyle}>
                                    <StatusBox
                                        status={comprehensive.status.name}
                                    />
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
                                            href={route(
                                                "admin.comprehensive.show",
                                                {
                                                    comprehensive:
                                                        comprehensive.id,
                                                }
                                            )}
                                        >
                                            <HiOutlineEye size={22} />
                                        </AppLink>
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
                                            cursor={"pointer"}
                                            size={22}
                                            onClick={() => {
                                                handleOpenDelete(
                                                    comprehensive.id
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
