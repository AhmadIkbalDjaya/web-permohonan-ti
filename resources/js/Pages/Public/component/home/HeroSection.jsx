import { Box, Grid, Typography } from "@mui/material";
import React from "react";
export function HeroSection({ headerRef, Model }) {
    return (
        <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
            id="hero-section"
        >
            <Grid
                item
                xs={12}
                lg={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{
                    order: {
                        xs: 2,
                        lg: 1,
                    },
                }}
            >
                <Box
                    ref={(el) => (headerRef.current[0] = el)}
                    sx={{
                        marginLeft: {
                            sm: "30px",
                            lg: "100px",
                        },
                        textAlign: "center",
                        padding: 2,
                        transition: "all 0.5s ease-out",
                    }}
                    className="hidden"
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: {
                                xs: "35px",
                                sm: "45px",
                                md: "50px",
                            },
                            textAlign: "left",
                            fontFamily: "poppins",
                            fontWeight: "60px",
                            mb: 1,
                        }}
                    >
                        Daftarkan diri anda segera! Untuk menjadi teknokrat
                        sejati
                    </Typography>
                    <Typography
                        style={{
                            textAlign: "justify",
                        }}
                    >
                        Bergabunglah dalam proses pendaftaran untuk Seminar
                        Proposal, Seminar Hasil, Ujian Komprehensif, dan PPL.
                        Ambil langkah pertama menuju masa depan yang gemilang
                        sebagai teknokrat sejati! Jangan lewatkan kesempatan
                        emas ini untuk mengembangkan potensi Anda secara
                        maksimal, memperluas wawasan akademik dan praktis, serta
                        mempersiapkan diri menghadapi tantangan di dunia
                        profesional. Jadilah bagian dari generasi teknokrat yang
                        siap berkontribusi bagi kemajuan ilmu pengetahuan dan
                        teknologi.
                    </Typography>
                    {/* <Grid container justifyContent="flex-start">
             <Button
                 variant="contained"
                 sx={{
                     display: {
                         sm: "none",
                         md: "flex",
                         lg: "flex",
                     },
                 }}
             >
                 Daftar Sekarang
             </Button>
          </Grid> */}
                </Box>
            </Grid>
            <Grid
                item
                xs={12}
                lg={6}
                sx={{
                    display: "flex",
                    order: {
                        xs: 1,
                        lg: 2,
                    },
                }}
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    sx={{
                        width: {
                            sm: "60%",
                            lg: "80%",
                        },
                        marginTop: "60px",
                    }}
                >
                    <img
                        src={Model}
                        style={{
                            width: "100%",
                        }}
                        alt="Model"
                    />
                </Box>
            </Grid>
        </Grid>
    );
}
