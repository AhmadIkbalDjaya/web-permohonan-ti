import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import Uinam from "../assets/logoUinam.png";
import "./style.css";

const CetakSemhas = forwardRef((props, ref) => {
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
                                fontFamily:"Arial"
                            }}
                            component="div"
                            align="center"
                        >
                            JURUSAN TEKNIK INFORMATIKA
                        </Typography>
                        <Typography
                            sx={{ fontSize: 10.64, fontWeight:"bold" }}
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
                                <tr>
                                    <td>Nomor </td>
                                    <td>: </td>
                                    <td>
                                        <Typography
                                            sx={{
                                                fontSize: "13.3px",
                                            }}
                                        >
                                            712/TI-UINAM/V/2024
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
                            </table>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{ fontSize: "13.3px" }}>
                                Romang Polong, 15 Mei 2024
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
                                    <td>Erni Rosiyanti</td>
                                </tr>
                                <tr>
                                    <td>Nim</td>
                                    <td>:</td>
                                    <td>60200120138</td>
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
                                        Implementasi Teknologi Deep Learning
                                        dengan Convolutional Neural Network
                                        dalam Meningkatkan Keterampilan Karateka
                                        di International Black Panther Karate
                                        Indonesia
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
                                    <td> Aidil</td>
                                </tr>
                                <tr>
                                    <td>Sekretaris</td>
                                    <td>:</td>
                                    <td>Darmatasia, S.Pd., M.Kom.</td>
                                </tr>
                                <tr>
                                    <td>Pembimbing I</td>
                                    <td>:</td>
                                    <td>Faisal Akib, S.Kom., M.Kom.</td>
                                </tr>
                                <tr>
                                    <td>Pembimbing II</td>
                                    <td>:</td>
                                    <td>Faisal Akib, S.Kom., M.Kom.</td>
                                </tr>
                                <tr>
                                    <td>Penguji I</td>
                                    <td>:</td>
                                    <td>Faisal Akib, S.Kom., M.Kom.</td>
                                </tr>
                                <tr>
                                    <td>Penguji II</td>
                                    <td>:</td>
                                    <td>Faisal Akib, S.Kom., M.Kom.</td>
                                </tr>
                                <tr>
                                    <td>Pelaksana</td>
                                    <td>:</td>
                                    <td>Faisal Akib, S.Kom., M.Kom.</td>
                                </tr>
                                <tr>
                                    <td>Hari dan Tanggal</td>
                                    <td>:</td>
                                    <td>Senin, 25 April 2024</td>
                                </tr>
                                <tr>
                                    <td>Waktu</td>
                                    <td>:</td>
                                    <td>14.30 - 16.00 Wita</td>
                                </tr>
                                <tr>
                                    <td>Tempat Pelaksanaan</td>
                                    <td>:</td>
                                    <td>
                                        Ruang Seminar Jurusan Teknik Informatika
                                    </td>
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
                        <Box sx={{ marginLeft: 42, marginTop: 2 }}>
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
                        </Box>
                        <Box sx={{ marginLeft: 42, marginTop: 7 }}>
                            <Typography
                                sx={{ fontWeight: "bold", fontSize: "13.3px" }}
                            >
                                Mustikasari, S.Kom., M.Kom.
                            </Typography>
                            <Typography
                                sx={{ fontWeight: "bold", fontSize: "13.3px" }}
                            >
                                19781106 200604 2 001
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </div>
    );
});

export default CetakSemhas;
