import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ShowRowData } from "../../ShowRowData";
import StatusBox from "../../StatusBox";
import {
    convertToHHMM,
    getDateDay,
    idFormatDate,
} from "../../../../../helper/dateTimeHelper";

export default function ShowResultData({ result }) {
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
                    Data Seminar
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "600" }}>
                    {result.code}
                </Typography>
            </Box>
            <Grid container spacing={1} padding={"15px"}>
                <ShowRowData
                    name={"Status Permohonan"}
                    value={
                        <>
                            <StatusBox status={result.status.name} />
                            <br />
                            {result.status_description
                                ? result.status_description.description
                                : ""}
                        </>
                    }
                />
                <ShowRowData
                    name={"Nomor Surat"}
                    value={result.letter_number}
                />
                <ShowRowData
                    name={"Tanggal Surat"}
                    value={
                        result.letter_date
                            ? idFormatDate(result.letter_date)
                            : null
                    }
                />
                <Grid item xs={12} marginTop={"15px"}>
                    <Typography
                        variant="body2"
                        color="initial"
                        sx={{ fontWeight: "600" }}
                    >
                        Data Mahasiswa :
                    </Typography>
                </Grid>
                <ShowRowData name={"Nama"} value={result.student.name} />
                <ShowRowData name={"NIM"} value={result.student.nim} />
                <ShowRowData
                    name={"Tempat, Tanggal Lahir"}
                    value={
                        `${result.student.pob}, ` +
                        idFormatDate(result.student.dob)
                    }
                />
                <ShowRowData
                    name={"Jurusan, Semester"}
                    value={`Teknik Informatika, ${result.student.semester}`}
                />
                <ShowRowData
                    name={"Judul Skripsi"}
                    value={result.essay_title}
                />
                <Grid item xs={12} marginTop={"15px"}>
                    <Typography
                        variant="body2"
                        color="initial"
                        sx={{ fontWeight: "600" }}
                    >
                        Dewan Penguji dan Pelaksana :
                    </Typography>
                </Grid>
                <ShowRowData
                    name={"Ketua"}
                    value={result.chairman && result.chairman.name}
                />
                <ShowRowData
                    name={"Sekertaris"}
                    value={result.secretary && result.secretary.name}
                />
                <Grid item xs={12} container spacing={1}>
                    {result.mentors.map((mentor, index) => (
                        <ShowRowData
                            key={`mentor${index}`}
                            name={`Pembimbing ${index + 1}`}
                            value={mentor.lecturer && mentor.lecturer.name}
                        />
                    ))}
                    {result.testers.map((tester, index) => (
                        <ShowRowData
                            key={`tester${index}`}
                            name={`Penguji ${index + 1}`}
                            value={tester.lecturer && tester.lecturer.name}
                        />
                    ))}
                </Grid>
                <ShowRowData
                    name={"Pelaksana"}
                    value={result.executor && result.executor.name}
                />
                <Grid item xs={12} marginTop={"15px"}>
                    <Typography
                        variant="body2"
                        color="initial"
                        sx={{ fontWeight: "600" }}
                    >
                        Jadwal Pelaksanaan :
                    </Typography>
                </Grid>
                <ShowRowData
                    name={"Hari dan Tanggal"}
                    value={
                        result.schedule.date
                            ? `${getDateDay(
                                  result.schedule.date
                              )}, ${idFormatDate(result.schedule.date)}`
                            : null
                    }
                />
                <ShowRowData
                    name={"Waktu"}
                    value={
                        result.schedule.start_time && result.schedule.end_time
                            ? `${convertToHHMM(
                                  result.schedule.start_time
                              )} - ${convertToHHMM(result.schedule.end_time)} ${
                                  result.schedule.time_zone
                              }`
                            : null
                    }
                />
                <ShowRowData
                    name={"Tempat Pelaksanaan"}
                    value={result.schedule.location}
                />
            </Grid>
        </Box>
    );
}
