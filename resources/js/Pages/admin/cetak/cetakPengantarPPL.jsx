import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import Uinam from "../assets/logoUinam.png";
import "./ppl.css";

const CetakPengantarPPL = forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <Box
                style={{
                    marginLeft: "2.6cm",
                    marginRight: "2.6cm",
                    paddingTop: "0.54cm",
                    fontFamily: "Times New Roman",
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            sx={{ fontSize: "15.95px", fontWeight: "bold" }}
                            component="div"
                            align="center"
                        >
                            KEMENTERIAN AGAMA REPUBLIK INDONESIA
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "15.95px",
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
                                fontSize: "15.95px",
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
                                fontSize: 17.29,
                                fontWeight: "bold",
                                marginTop: "-6px",
                                fontFamily: "Times New Roman",
                            }}
                            component="div"
                            align="center"
                        >
                            JURUSAN TEKNIK INFORMATIKA
                        </Typography>
                        <Typography
                            sx={{ fontSize: 10.64, fontStyle: "italic" }}
                            component="div"
                            align="center"
                        >
                            Jl. H.M.YasinLimpo No.36 Gowa, Kampus II Gedung D
                            Lt.4 Telp.(0411) 5622375-424835
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
                        sx={{
                            fontFamily: "Times New Roman",
                            marginTop: "5px",
                            fontSize: "15.96px",
                        }}
                    >
                        <Grid item xs={8}>
                            <table
                                cellPadding="-10px"
                                cellSpacing={0}
                                style={{ fontSize: "15.96px" }}
                            >
                                <tr>
                                    <td>Nomor </td>
                                    <td>: </td>
                                    <td>
                                        <Typography
                                            sx={{
                                                fontSize: "15.96px",
                                            }}
                                        >
                                            712/TI-UINAM/V/2024
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Lamp </td>
                                    <td>: </td>
                                    <td>
                                        <Typography
                                            sx={{
                                                fontSize: "15.96px",
                                            }}
                                        >
                                            -
                                        </Typography>
                                    </td>
                                </tr>
                                <tr style={{ marginTop: "-100px" }}>
                                    <td style={{ width: 50 }}>Hal </td>
                                    <td style={{ width: 10 }}>: </td>
                                    <td style={{ paddingTop: "-20px" }}>
                                        <Typography
                                            sx={{
                                                fontSize: "15.96px",
                                            }}
                                        >
                                            Permohonan Surat Pengantar PPL
                                        </Typography>
                                    </td>
                                </tr>
                            </table>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{ fontSize: "15.96px" }}>
                                Gowa, 15 Mei 2024
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{ marginTop: "10px", fontSize: "15.96px" }}>
                        <Typography>Kepada Yth,</Typography>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Dekan Fakultas Sains dan Teknologi
                        </Typography>
                        <Typography>
                            Cq. Wakil Dekan Bidang Akademik,
                        </Typography>
                        <Typography>Di-</Typography>
                        <Typography sx={{ marginLeft: "50px" }}>
                            Tempat
                        </Typography>
                        <Typography
                            sx={{
                                marginTop: "10px",
                                fontStyle: "italic",
                                fontSize: "15.96px",
                            }}
                        >
                            Assalamu Alaikum Wr.Wb.
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: "justify",
                                marginTop: "10px",
                                fontSize: "15.96px",
                                lineHeight: 1.5,
                            }}
                        >
                            Dengan hormat, sehubungan dengan pelaksanaan kuliah
                            PPL (Praktek Pengalaman Lapangan) mahasiswa Jurusan
                            Teknik Informatika UIN Alauddin Makassar tahun
                            akademik Genap 2023/2024, bersama ini kami
                            mengajukan permohonan Surat Pengantar ke tempat PPL
                            dengan data-data sebagai berikut :
                        </Typography>
                        <table
                            style={{
                                fontSize: "15.96px",
                                fontFamily: "Times New Roman",
                                marginTop: "10px",
                            }}
                            cellPadding={4}
                        >
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            width: 200,
                                            verticalAlign: "top",
                                        }}
                                    >
                                        Nama Mahasiswa/NIM
                                    </td>
                                    <td style={{ verticalAlign: "top" }}>:</td>
                                    <td
                                        style={{
                                            verticalAlign: "top",
                                            marginTop: "-100px",
                                        }}
                                    >
                                        <table style={{ fontSize: "15.96px" }}>
                                            <tr>
                                                <td
                                                    style={{
                                                        marginTop: "-10px",
                                                    }}
                                                >
                                                    ikrar restu gibrani
                                                </td>
                                                <td>/</td>
                                                <td>60200120138</td>
                                            </tr>
                                            <tr>
                                                <td>ikrar restu gibrani</td>
                                                <td>/</td>
                                                <td>60200120138</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Jurusan</td>
                                    <td>:</td>
                                    <td>Teknik Informatika</td>
                                </tr>
                                <tr>
                                    <td style={{ verticalAlign: "top" }}>
                                        Lokasi PPL
                                    </td>
                                    <td style={{ verticalAlign: "top" }}>:</td>
                                    <td style={{ textAlign: "justify" }}>
                                        ditujukan (Kepada PUSTIPAD UIN Alauddin
                                        Makassar) PUSTIPAD UIN Alauddin
                                        Makassar, Jl. H. M. Yasin Limpo No. 36
                                        Romangpolong, Gowa
                                    </td>
                                </tr>
                                <tr>
                                    <td>Jadwal PPL </td>
                                    <td>:</td>
                                    <td>17 Mei 2024 s/d 14 Juni 2024</td>
                                </tr>
                            </tbody>
                        </table>
                        <Typography
                            sx={{
                                fontSize: "15.96px",
                                fontFamily: "Times New Roman",
                                marginLeft: 0.7,
                                marginTop: 2,
                            }}
                        >
                            Demikian penyampaian kami, atas perhatiannya
                            diucapkan banyak terimakasih.
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "15.96px",
                                fontStyle: "italic",
                                marginLeft: 0.7,
                                marginTop:2
                            }}
                        >
                           Wassalamu Alaikum Wr.Wb.
                        </Typography>
                        <Box sx={{ marginLeft: 42, marginTop: 2 }}>
                            <Typography
                                sx={{ fontSize: "15.96px" }}
                            >
                                Ketua Jurusan,
                            </Typography>
                        </Box>
                        <Box sx={{ marginLeft: 42, marginTop: 7 }}>
                            <Typography
                                sx={{ fontSize: "15.96px", textUnderlineOffset:"1px", textDecoration:"underline 1px", fontWeight:"bold" }}
                            >
                                Mustikasari, S.Kom., M.Kom.
                            </Typography>
                            <Typography
                                sx={{ fontSize: "15.96px" }}
                            >
                                NIP. 19781106 200604 2 001
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </div>
    );
});

export default CetakPengantarPPL;
