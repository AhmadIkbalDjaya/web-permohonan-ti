import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import Uinam from "../assets/logoUinam.png";
import "./style.css";
import { convertToHHMM, getDateDay, idFormatDate } from "../../../helper/dateTimeHelper";

const CetakSemhas = forwardRef((props, ref) => {
    const result = props.result;
    const hodSignature = props.hodSignature;
    return (
        <div ref={ref} className="print-container font-pdf">
            <Box
                style={{
                    paddingLeft: "3.17cm",
                    paddingRight: "3.17cm",
                    paddingTop: "0.54cm",
                    fontFamily: "Arial",
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            sx={{ fontSize: "21.28px", fontWeight: "bold" }}
                            component="div"
                            align="center"
                        >
                            KEMENTERIAN AGAMA REPUBLIK INDONESIA
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 18.62,
                                fontWeight: "bold",
                                marginTop: "-6px",
                            }}
                            component="div"
                            align="center"
                        >
                            UNIVERSITAS ISLAM NEGERI ALAUDDIN MAKASSAR
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 18.62,
                                fontWeight: "bold",
                                marginTop: "-6px",
                            }}
                            component="div"
                            align="center"
                        >
                            FAKULTAS SAINS DAN TEKNOLOGI
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 18.62,
                                fontWeight: "bold",
                                marginTop: "-6px",
                                fontFamily: "Arial",
                            }}
                            component="div"
                            align="center"
                        >
                            JURUSAN TEKNIK INFORMATIKA
                        </Typography>
                        <Typography
                            sx={{ fontSize: 10.64, fontWeight: "bold" }}
                            component="div"
                            align="center"
                        >
                            Kampus II : Jl. H.M. Yasin Limpo No. 36 Romang Polng
                            Gowa Telp. 1500363, (0411) 841879, Fax 8221400
                        </Typography>
                        <Typography
                            sx={{ fontSize: 10.64 }}
                            component="div"
                            align="center"
                        >
                            Website : fst.uin-alauddin.ac.id
                        </Typography>
                    </Grid>
                    <img
                        src={Uinam}
                        alt="LOGO"
                        style={{
                            width: "70px",
                            position: "absolute",
                            top: "20px",
                            left: 10,
                        }}
                    />
                    <span
                        style={{
                            height: "1px",
                            width: "100%",
                            backgroundColor: "black",
                        }}
                    />
                    <span
                        style={{
                            height: "3px",
                            width: "100%",
                            backgroundColor: "black",
                            marginTop: "3px",
                        }}
                    />
                    <Grid
                        container
                        sx={{ fontFamily: "Arial", marginTop: "5px" }}
                    >
                        <Grid item xs={8}>
                            <table
                                cellPadding="-10px"
                                cellSpacing={0}
                                style={{ fontSize: "13.3px" }}
                            >
                                <tbody>
                                    <tr>
                                        <td>Nomor </td>
                                        <td>: </td>
                                        <td>
                                            <Typography
                                                sx={{
                                                    fontSize: "13.3px",
                                                }}
                                            >
                                                {result.letter_number ?? "-"}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr style={{ marginTop: "-100px" }}>
                                        <td style={{ width: 50 }}>Hal </td>
                                        <td style={{ width: 10 }}>: </td>
                                        <td style={{ paddingTop: "-20px" }}>
                                            <Typography
                                                sx={{
                                                    fontSize: "13.3px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Permohonan Penerbitan SK Seminar
                                                Hasil
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <Typography
                                                sx={{
                                                    fontSize: "13.3px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                dan Undangan
                                            </Typography>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{ fontSize: "13.3px" }}>
                                Romang Polong,{" "}
                                {result.letter_date
                                    ? idFormatDate(result.letter_date)
                                    : "-"}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{ marginTop: "10px" }}>
                        <Typography sx={{ fontSize: "13.3px" }}>
                            Kepada Yth,
                        </Typography>
                        <Typography sx={{ fontSize: "13.3px" }}>
                            Dekan Fakultas Sains dan Teknologi
                        </Typography>
                        <Typography sx={{ fontSize: "13.3px" }}>
                            Cq. Wakil Dekan Bidang Akademik,
                        </Typography>
                        <Typography sx={{ fontSize: "13.3px" }}>Di-</Typography>
                        <Typography
                            sx={{ marginLeft: "50px", fontSize: "13.3px" }}
                        >
                            Tempat
                        </Typography>
                        <Typography
                            sx={{
                                marginTop: "10px",
                                fontWeight: "bold",
                                fontStyle: "italic",
                                fontSize: "13.3px",
                            }}
                        >
                            Assalamualaikum Warahmatullahi Wabarakatuh
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: "justify",
                                marginTop: "10px",
                                fontSize: "13.3px",
                                lineHeight: 1.5,
                            }}
                        >
                            Dalam rangka penyelesaian Tugas Akhir mahasiswa
                            Fakultas Sains dan Teknologi UIN Alauddin Makassar,
                            maka bersama ini kami memohon kepada Dekan kiranya
                            berkenan menerbitkan Surat Keputusan dan jadwal
                            pelaksanaan Seminar Hasil Mahasiswa dibawah ini :
                        </Typography>
                        <table
                            style={{
                                fontSize: "13.3px",
                                fontFamily: "Arial",
                                marginTop: "10px",
                            }}
                            cellPadding={4}
                        >
                            <tbody>
                                <tr>
                                    <td style={{ width: 150 }}>Nama</td>
                                    <td>:</td>
                                    <td>{result.student.name}</td>
                                </tr>
                                <tr>
                                    <td>Nim</td>
                                    <td>:</td>
                                    <td>{result.student.nim}</td>
                                </tr>
                                <tr>
                                    <td>Jurusan/Prodi</td>
                                    <td>:</td>
                                    <td>Teknik Informatika</td>
                                </tr>
                                <tr>
                                    <td style={{ verticalAlign: "top" }}>
                                        Judul Skripsi
                                    </td>
                                    <td style={{ verticalAlign: "top" }}>:</td>
                                    <td style={{ textAlign: "justify" }}>
                                        {result.essay_title}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Typography sx={{ fontSize: "13.3px" }}>
                            Adapun Komposisi Dewan Penguji dan Pelaksana Seminar
                            Proposal tersebut adalah sebagai berikut :
                        </Typography>
                        <table
                            style={{
                                fontSize: "13.3px",
                                fontFamily: "Arial",
                                marginTop: "10px",
                            }}
                            cellPadding={4}
                        >
                            <tbody>
                                <tr>
                                    <td style={{ width: 150 }}>Ketua</td>
                                    <td>:</td>
                                    <td>
                                        {result.chairman
                                            ? result.chairman.name
                                            : "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Sekretaris</td>
                                    <td>:</td>
                                    <td>
                                        {result.secretary
                                            ? result.secretary.name
                                            : "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Pembimbing I</td>
                                    <td>:</td>
                                    <td>
                                        {result.mentors[0].lecturer
                                            ? result.mentors[0].lecturer.name
                                            : "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Pembimbing II</td>
                                    <td>:</td>
                                    <td>
                                        {result.mentors[1].lecturer
                                            ? result.mentors[1].lecturer.name
                                            : "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Penguji I</td>
                                    <td>:</td>
                                    <td>
                                        {result.testers[0].lecturer
                                            ? result.testers[0].lecturer.name
                                            : "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Penguji II</td>
                                    <td>:</td>
                                    <td>
                                        {result.testers[1].lecturer
                                            ? result.testers[1].lecturer.name
                                            : "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Pelaksana</td>
                                    <td>:</td>
                                    <td>
                                        {result.executor
                                            ? result.executor.name
                                            : "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Hari dan Tanggal</td>
                                    <td>:</td>
                                    <td>
                                        {result.schedule.date
                                            ? `${getDateDay(
                                                  result.schedule.date
                                              )}, 
                                        ${idFormatDate(result.schedule.date)}`
                                            : ""}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Waktu</td>
                                    <td>:</td>
                                    <td>
                                        {result.schedule.start_time
                                            ? `${convertToHHMM(
                                                  result.schedule.start_time
                                              )} - ${convertToHHMM(
                                                  result.schedule.end_time
                                              )} ${result.schedule.time_zone}`
                                            : "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tempat Pelaksanaan</td>
                                    <td>:</td>
                                    <td>{result.schedule.location ?? "-"}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Typography
                            sx={{
                                fontSize: "13.3px",
                                fontFamily: "Arial",
                                marginLeft: 0.7,
                                marginTop: 2,
                            }}
                        >
                            Demikian, atas perhatian dan dukungan Bapak, kami
                            ucapkan terima kasih.
                        </Typography>
                        <Box
                            sx={{
                                marginLeft: 42,
                                marginTop: 2,
                                position: "absolute",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "13.3px",
                                    fontStyle: "italic",
                                }}
                            >
                                Wassalam
                            </Typography>
                            <Typography
                                sx={{ fontWeight: "bold", fontSize: "13.3px" }}
                            >
                                Ketua
                            </Typography>
                            <Typography
                                sx={{ fontWeight: "bold", fontSize: "13.3px" }}
                            >
                                Jurusan Teknik Informatika
                            </Typography>
                            {hodSignature ? (
                                <Box
                                    component={"img"}
                                    sx={{
                                        height: "120px",
                                        width: "175px",
                                        position: "relative",
                                        top: "-26px",
                                        left: "-10px",
                                    }}
                                    src={result.hod.signature}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        height: "120px",
                                        width: "175px",
                                        position: "relative",
                                        top: "-26px",
                                        left: "-10px",
                                    }}
                                ></Box>
                            )}
                            <Box sx={{ position: "relative", bottom: "60px" }}>
                                <Typography
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: "13.3px",
                                    }}
                                >
                                    {result.hod.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: "13.3px",
                                    }}
                                >
                                    {result.hod.nip}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </div>
    );
});

export default CetakSemhas;
