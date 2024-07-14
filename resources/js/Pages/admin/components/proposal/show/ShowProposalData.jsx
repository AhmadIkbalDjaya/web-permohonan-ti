import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { ShowRowData } from "../../ShowRowData";
import StatusBox from "../../StatusBox";
import {
    convertToHHMM,
    getDateDay,
    idFormatDate,
} from "../../../../../helper/dateTimeHelper";
export function ShowProposalData({ proposal }) {
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
                sx={{
                    p: "15px",
                }}
                borderBottom={"1px solid"}
                borderColor={"slate-300"}
                display={"flex"}
                justifyContent={"space-between"}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: "600",
                    }}
                >
                    Data Seminar
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: "600",
                    }}
                >
                    {proposal.code}
                </Typography>
            </Box>
            <Grid container spacing={1} padding={"15px"}>
                <ShowRowData
                    name={"Status Permohonan"}
                    value={
                        <>
                            <StatusBox status={proposal.status.name} />
                            <br />
                            {proposal.status_description
                                ? proposal.status_description.description
                                : ""}
                        </>
                    }
                />
                <ShowRowData
                    name={"Nomor Surat"}
                    value={proposal.letter_number}
                />
                <ShowRowData
                    name={"Tanggal Surat"}
                    value={
                        proposal.letter_date
                            ? idFormatDate(proposal.letter_date)
                            : null
                    }
                />

                <Grid item xs={12}>
                    <Typography
                        variant="body2"
                        color="initial"
                        sx={{
                            fontWeight: "600",
                        }}
                    >
                        Data Mahasiswa :
                    </Typography>
                </Grid>
                <ShowRowData name={"Nama"} value={proposal.student.name} />
                <ShowRowData name={"NIM"} value={proposal.student.nim} />
                <ShowRowData
                    name={"Tempat, Tanggal Lahir"}
                    value={
                        `${proposal.student.pob}, ` +
                        idFormatDate(proposal.student.dob)
                    }
                />
                <ShowRowData
                    name={"Jurusan, Semester"}
                    value={`Teknik Informatika, ${proposal.student.semester}`}
                />
                <ShowRowData
                    name={"Judul Skripsi"}
                    value={proposal.essay_title}
                />
                <Grid item xs={12} marginTop={"15px"}>
                    <Typography
                        variant="body2"
                        color="initial"
                        sx={{
                            fontWeight: "600",
                        }}
                    >
                        Dewan Penguji dan Pelaksana :
                    </Typography>
                </Grid>
                <ShowRowData
                    name={"Ketua"}
                    value={proposal.chairman && proposal.chairman.name}
                />
                <ShowRowData
                    name={"Sekertaris"}
                    value={proposal.secretary && proposal.secretary.name}
                />
                <Grid item xs={12} container spacing={1}>
                    {proposal.mentors.map((mentor, index) => (
                        <ShowRowData
                            key={`mentor${index}`}
                            name={`Pembimbing ${index + 1}`}
                            value={mentor.lecturer && mentor.lecturer.name}
                        />
                    ))}
                    {proposal.testers.map((tester, index) => (
                        <ShowRowData
                            key={`tester${index}`}
                            name={`Penguji ${index + 1}`}
                            value={tester.lecturer && tester.lecturer.name}
                        />
                    ))}
                </Grid>
                <ShowRowData
                    name={"Pelaksana"}
                    value={proposal.executor && proposal.executor.name}
                />
                <Grid item xs={12} marginTop={"15px"}>
                    <Typography
                        variant="body2"
                        color="initial"
                        sx={{
                            fontWeight: "600",
                        }}
                    >
                        {/* Jadwal Pelaksanaan : */}
                        {proposal.schedule.date}
                    </Typography>
                </Grid>
                <ShowRowData
                    name={"Hari dan Tanggal"}
                    value={
                        proposal.schedule.date
                            ? `${getDateDay(
                                  proposal.schedule.date
                              )}, ${idFormatDate(proposal.schedule.date)}`
                            : null
                    }
                />
                <ShowRowData
                    name={"Waktu"}
                    value={
                        proposal.schedule.start_time &&
                        proposal.schedule.end_time
                            ? `${convertToHHMM(
                                  proposal.schedule.start_time
                              )} - ${convertToHHMM(
                                  proposal.schedule.end_time
                              )} ${proposal.schedule.time_zone}`
                            : null
                    }
                />
                <ShowRowData
                    name={"Tempat Pelaksanaan"}
                    value={proposal.schedule.location}
                />
            </Grid>
        </Box>
    );
}
