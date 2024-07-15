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
} from "@mui/material";
import { HiOutlineEye } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
    tableCellStyle,
    tableCheckboxStyle,
    tableHeadStyle,
} from "../../styles/tableStyles";
import {
    convertGenderToID,
    convertRoleToID,
} from "../../../../../helper/dataToIdHelper";
import AppLink from "../../AppLink";
import { Perpage } from "../../Perpage";

export default function LecturerDataTable({
    lecturers,
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
                                            href={route("admin.lecturer.show", {
                                                lecturer: lecturer.id,
                                            })}
                                        >
                                            <HiOutlineEye size={22} />
                                        </AppLink>
                                        <AppLink
                                            color={"black"}
                                            href={route("admin.lecturer.edit", {
                                                lecturer: lecturer.id,
                                            })}
                                        >
                                            <TbEdit size={22} />
                                        </AppLink>
                                        <RiDeleteBin6Line
                                            cursor={"pointer"}
                                            size={22}
                                            onClick={() => {
                                                handleOpenDelete(lecturer.id);
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
