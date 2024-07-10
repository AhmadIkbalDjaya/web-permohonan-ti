import { Box, Grid } from "@mui/material";
import React from "react";
import { MdArticle } from "react-icons/md";
import { RiArticleFill, RiComputerFill } from "react-icons/ri";
import { HiClipboardDocumentList } from "react-icons/hi2";
import RegisCard from "./RegisCard";
export function RegisSection({ headerRef, cardRefs }) {
    return (
        <Box id="regis-section">
            <Box
                ref={(el) => (headerRef.current[1] = el)}
                sx={{
                    marginBottom: 4,
                    textAlign: "center",
                    transition: "all 0.5s ease-out",
                }}
                className="hidden"
            >
                <h2>Daftar</h2>
                <hr
                    style={{
                        width: "10%",
                        margin: "auto",
                        border: "2px solid black",
                    }}
                />
            </Box>
            <Box
                sx={{
                    margin: "auto",
                    width: "85%",
                }}
                id="daftar-card"
            >
                <Grid container justifyContent="space-between" spacing={2}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        ref={(el) => (cardRefs.current[0] = el)}
                        className="hidden"
                        sx={{
                            transition: "all 0.5s ease-out",
                        }}
                    >
                        <RegisCard
                            title="Seminar Proposal"
                            subtitle="Presentasikan Rencana Riset Anda di Seminar Proposal!"
                            target_page={route("proposal")}
                            color="#375DFB"
                            icon={<MdArticle size={30} />}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        ref={(el) => (cardRefs.current[1] = el)}
                        className="hidden"
                        sx={{
                            transition: "all 0.5s ease-out",
                        }}
                    >
                        <RegisCard
                            title="Seminar Hasil"
                            subtitle="Presentasikan Hasil Riset Anda di Seminar Hasil!"
                            target_page={route("result")}
                            color="#CA8A04"
                            icon={<RiArticleFill size={30} />}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        ref={(el) => (cardRefs.current[2] = el)}
                        className="hidden"
                        sx={{
                            transition: "all 0.5s ease-out",
                        }}
                    >
                        <RegisCard
                            title="Ujian Komprehensif"
                            subtitle="Persiapkan Diri Anda untuk Ujian Komprehensif!"
                            target_page={route("comprehensive")}
                            color="#DC2626"
                            icon={<HiClipboardDocumentList size={30} />}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        ref={(el) => (cardRefs.current[3] = el)}
                        className="hidden"
                        sx={{
                            transition: "all 0.5s ease-out",
                        }}
                    >
                        <RegisCard
                            title="PPL"
                            subtitle="Segera Daftarkan Diri Anda untuk Praktek Kerja Lapangan!"
                            target_page={route("ppl")}
                            color="#16A34A"
                            icon={<RiComputerFill size={30} />}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
