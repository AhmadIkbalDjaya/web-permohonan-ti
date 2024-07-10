import { usePage } from "@inertiajs/react";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { RiFacebookLine, RiInstagramLine, RiTwitterLine } from "react-icons/ri";

export default function PublicFooter() {
    const { url } = usePage().props;
    return (
        <>
            <Box
                id="footer"
                sx={{
                    mt: "100px",
                    backgroundImage: `url(${url}/images/footer-bg.png)`,
                    paddingBottom: "50px",
                }}
            >
                <Container maxWidth={"lg"}>
                    <Grid
                        container
                        spacing={5}
                        justifyContent={"space-between"}
                    >
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                color={"gray-500"}
                                variant="body1"
                                fontWeight={700}
                            >
                                Lokasi Prodi Teknik Informatika
                            </Typography>
                            <Typography
                                ml={"15px"}
                                color={"gray-500"}
                                variant="body2"
                                mt={"25px"}
                                fontWeight={500}
                            >
                                Jl.H.M. Yasin Limpo No.36 Kec. Romangpolong Kab.
                                Gowa Sulawesi Selatan Gedung Fakultas Sains dan
                                Teknologi Lantai 4
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                color={"gray-500"}
                                variant="body1"
                                fontWeight={700}
                            >
                                Kontak
                            </Typography>
                            <Grid container mt={"25px"} ml={"15px"}>
                                <Grid
                                    item
                                    xs={2}
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        color: "gray-500",
                                    }}
                                >
                                    Telepon
                                </Grid>
                                <Grid
                                    item
                                    xs={10}
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        color: "gray-500",
                                    }}
                                >
                                    : 1500363
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        color: "gray-500",
                                    }}
                                >
                                    Fax
                                </Grid>
                                <Grid
                                    item
                                    xs={10}
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        color: "gray-500",
                                    }}
                                >
                                    : 0411-8221400
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        color: "gray-500",
                                    }}
                                >
                                    E-mail
                                </Grid>
                                <Grid
                                    item
                                    xs={10}
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        color: "gray-500",
                                    }}
                                >
                                    : teknik.informatika@uin-alauddin.ac.id
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                color={"gray-500"}
                                variant="body1"
                                fontWeight={700}
                            >
                                Social Media
                            </Typography>
                            <Box mt={"25px"}>
                                <IconButton
                                    href="https://www.facebook.com/"
                                    aria-label="Facebook"
                                >
                                    <RiFacebookLine />
                                </IconButton>
                                <IconButton
                                    href="https://twitter.com/"
                                    aria-label="Twitter"
                                >
                                    <RiTwitterLine />
                                </IconButton>
                                <IconButton
                                    href="https://www.instagram.com/"
                                    aria-label="Instagram"
                                >
                                    <RiInstagramLine />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box sx={{ background: "black" }} padding={"25px 0"}>
                <Container maxWidth="lg">
                    <Typography
                        variant="body2"
                        color="gray-500"
                        fontSize={"10px"}
                    >
                        &copy; COPYRIGHT PROGRAM STUDI TEKNIK INFORMATIKA |
                        FAKULTAS SAINS DAN TEKNOLOGI | UNIVESITAS ISLAM NEGERI
                        ALAUDDIN MAKASSAR
                    </Typography>
                </Container>
            </Box>
        </>
    );
}
