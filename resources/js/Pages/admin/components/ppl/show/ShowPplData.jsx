import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { ShowRowData } from "../../ShowRowData";
import StatusBox from "../../StatusBox";
import { idFormatDate } from "../../../../../helper/dateTimeHelper";

export default function ShowPplData({ ppl }) {
    return (
        <Box
            sx={{
                background: "white",
                border: ".5px solid",
                borderColor: "slate-300",
                borderRadius: "4px",
            }}
        >
            <Box
                sx={{ p: "15px" }}
                borderBottom={"1px solid"}
                borderColor={"slate-300"}
                display={"flex"}
                justifyContent={"space-between"}
            >
                <Typography variant="body2" sx={{ fontWeight: "600" }}>
                    Data PPL
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "600" }}>
                    {ppl.code}
                </Typography>
            </Box>
            <Grid container spacing={1} padding={"15px"}>
                <ShowRowData
                    name={"Status Permohonan"}
                    value={
                        <>
                            <StatusBox status={ppl.status.name} />
                            <br />
                            {ppl.status_description
                                ? ppl.status_description.description
                                : ""}
                        </>
                    }
                />
                <ShowRowData
                    name={"Nomor Surat Pembimbing"}
                    value={ppl.letter_number_mentor}
                />
                <ShowRowData
                    name={"Nomor Surat Pengantar"}
                    value={ppl.letter_number_introduction}
                />
                <ShowRowData
                    name={"Ditujukan Kepada"}
                    value={ppl.addressed_to}
                />
                <ShowRowData
                    name={"Tanggal Surat"}
                    value={
                        ppl.letter_date ? idFormatDate(ppl.letter_date) : null
                    }
                />
                <ShowRowData name={"Lokasi PPL"} value={ppl.location} />
                <ShowRowData name={"Alamat"} value={ppl.location_address} />
                <ShowRowData
                    name={"Jadwal PPL"}
                    value={
                        ppl.start_date && ppl.end_date
                            ? `${idFormatDate(ppl.start_date)} - ${idFormatDate(
                                  ppl.start_date
                              )}`
                            : null
                    }
                />
                <ShowRowData
                    name={"Pembimbing"}
                    value={ppl.mentor && ppl.mentor.name}
                />
                {ppl.students.map((student, index) => (
                    <Grid
                        item
                        container
                        spacing={2}
                        marginTop={"10px"}
                        key={index}
                    >
                        <Grid item xs={12}>
                            <Typography
                                variant="body2"
                                color="initial"
                                sx={{ fontWeight: "600" }}
                            >
                                Data Mahasiswa Ke-{index + 1} :
                            </Typography>
                        </Grid>
                        <ShowRowData name={"Nama"} value={student.name} />
                        <ShowRowData name={"NIM"} value={student.nim} />
                        <ShowRowData
                            name={"Tempat, Tanggal Lahir"}
                            value={
                                `${student.pob}, ` + idFormatDate(student.dob)
                            }
                        />
                        <ShowRowData
                            name={"Jurusan, Semester"}
                            value={`Teknik Informatika, ${student.semester}`}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
