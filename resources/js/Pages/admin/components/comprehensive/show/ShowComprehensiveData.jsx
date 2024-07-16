import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ShowRowData } from "../../ShowRowData";
import StatusBox from "../../StatusBox";
import { idFormatDate } from "../../../../../helper/dateTimeHelper";

export default function ShowComprehensiveData({ comprehensive }) {
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
                    Data Kompren
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "600" }}>
                    {comprehensive.code}
                </Typography>
            </Box>
            <Grid container spacing={1} padding={"15px"}>
                <ShowRowData
                    name={"Status Permohonan"}
                    value={
                        <>
                            <StatusBox status={comprehensive.status.name} />
                            <br />
                            {comprehensive.status_description
                                ? comprehensive.status_description.description
                                : ""}
                        </>
                    }
                />
                <ShowRowData
                    name={"Nomor Surat"}
                    value={comprehensive.letter_number}
                />
                <ShowRowData
                    name={"Tanggal Surat"}
                    value={
                        comprehensive.letter_date
                            ? idFormatDate(comprehensive.letter_date)
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
                <ShowRowData name={"Nama"} value={comprehensive.student.name} />
                <ShowRowData name={"NIM"} value={comprehensive.student.nim} />
                <ShowRowData
                    name={"Tempat, Tanggal Lahir"}
                    value={
                        `${comprehensive.student.pob}, ` +
                        idFormatDate(comprehensive.student.dob)
                    }
                />
                <ShowRowData
                    name={"Jurusan, Semester"}
                    value={`Teknik Informatika, ${comprehensive.student.semester}`}
                />
                <ShowRowData
                    name={"Judul Skripsi"}
                    value={comprehensive.essay_title}
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
                    value={
                        comprehensive.chairman && comprehensive.chairman.name
                    }
                />
                <ShowRowData
                    name={"Sekertaris"}
                    value={
                        comprehensive.secretary && comprehensive.secretary.name
                    }
                />
                <Grid item xs={12} container spacing={1}>
                    {comprehensive.testers.map((tester, index) => (
                        <ShowRowData
                            key={`tester${index}`}
                            name={`Penguji ${index + 1} (${
                                tester.description
                            })`}
                            value={tester.lecturer && tester.lecturer.name}
                        />
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}
