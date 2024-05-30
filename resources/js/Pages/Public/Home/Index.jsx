// import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {
    Grid,
  
} from "@mui/material";
import Model from "../assets/model.png";
import CardComponent from "../component/cardComponent";
import "./style.css";
import useIntersectionObserver from "./animasi";

import React, { useEffect, } from "react";
import { Head, Link } from "@inertiajs/react";
import FooterComponent from "../component/footerComponent";

const pages = ["Products", "Pricing", "Blog"];

function Home() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const headerRef = useIntersectionObserver({ threshold: 0.5 });
    const cardRefs = useIntersectionObserver({ threshold: 0.1 });

    useEffect(() => {
        const animateOnScroll = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                } else {
                    entry.target.style.opacity = "0";
                    entry.target.style.transform = "translateY(20px)";
                }
            });
        };

        const headerObserver = new IntersectionObserver(animateOnScroll, {
            threshold: 0.5,
        });
        const cardObserver = new IntersectionObserver(animateOnScroll, {
            threshold: 0.1,
        });

        headerRef.current.forEach((el) => {
            if (el) headerObserver.observe(el);
        });

        cardRefs.current.forEach((el) => {
            if (el) cardObserver.observe(el);
        });

        return () => {
            headerObserver.disconnect();
            cardObserver.disconnect();
        };
    }, [headerRef, cardRefs]);

    return (
        <>
            <Head title="TI-UINAM"></Head>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            TI-UINAM
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                <MenuItem
                                    key="Home"
                                    onClick={handleCloseNavMenu}
                                >
                                    <Link
                                        key="Home"
                                        onClick={handleCloseNavMenu}
                                        style={{
                                            marginRight: 10,
                                            textDecoration: "none",
                                        }}
                                        href="/"
                                        className="link-head-mobile"
                                    >
                                        Home
                                    </Link>
                                </MenuItem>
                                <MenuItem
                                    key="Daftar"
                                    onClick={handleCloseNavMenu}
                                >
                                    <Link
                                        key="Daftar"
                                        onClick={handleCloseNavMenu}
                                        style={{
                                            marginRight: 10,
                                            textDecoration: "none",
                                        }}
                                        href="/"
                                        className="link-head-mobile"
                                    >
                                        Daftar
                                    </Link>
                                </MenuItem>
                                <MenuItem
                                    key="Tentang Kami"
                                    onClick={handleCloseNavMenu}
                                >
                                    <Link
                                        key="Tentang Kami"
                                        onClick={handleCloseNavMenu}
                                        style={{
                                            marginRight: 10,
                                            textDecoration: "none",
                                        }}
                                        href="/"
                                        className="link-head-mobile"
                                    >
                                        Tentang Kami
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            TI-UINAM
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                                justifyContent: "end",
                            }}
                        >
                            <Link
                                key="Home"
                                onClick={handleCloseNavMenu}
                                style={{
                                    marginRight: 10,
                                    textDecoration: "none",
                                }}
                                href="/"
                                className="link-head"
                            >
                                Home
                            </Link>
                            <Link
                                key="daftar"
                                onClick={handleCloseNavMenu}
                                style={{
                                    textDecoration: "none",
                                    marginRight: 10,
                                }}
                                href="#daftar-card"
                                className="link-head"
                            >
                                Daftar
                            </Link>
                            <Link
                                key="tentang-kami"
                                onClick={handleCloseNavMenu}
                                style={{
                                    textDecoration: "none",
                                    marginRight: 10,
                                }}
                                href="#tentang"
                                className="link-head"
                            >
                                Tentang Kami
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="center"
            >
                <Grid
                    item
                    xs={12}
                    lg={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    sx={{ order: { xs: 2, lg: 1 } }}
                >
                    <Box
                        ref={(el) => (headerRef.current[0] = el)}
                        sx={{
                            marginLeft: { sm: "30px", lg: "100px" },
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
                                    md: "55px",
                                    lg: "60px",
                                },
                                textAlign: "left",
                                fontFamily: "poppins",
                                fontWeight: "60px",
                            }}
                        >
                            Daftarkan diri anda segera! Untuk menjadi teknokrat
                            sejati
                        </Typography>
                        <p style={{ textAlign: "justify" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Possimus, tempora optio. Facere, quisquam sunt
                            excepturi incidunt recusandae maxime optio ipsam
                            minima beatae provident unde quidem, non porro quam
                            ipsa velit. Quam praesentium molestiae animi minima
                            atque repellat esse sed corporis error autem quos
                            mollitia qui at molestias, dignissimos dolorum ex
                            labore ratione quidem ducimus? Earum dolor sunt
                            exercitationem nulla officiis. Perspiciatis quam
                            eius, qui deserunt eum quidem sint cumque modi
                            ratione voluptatum, ex doloremque minima vitae quod
                            dolore quos dolorum aut mollitia? Voluptatum
                            doloremque beatae commodi excepturi accusamus saepe
                            ab.
                        </p>
                        <Grid container justifyContent="flex-start">
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
                        </Grid>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={6}
                    sx={{ display: "flex", order: { xs: 1, lg: 2 } }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box
                        sx={{
                            width: { sm: "60%", lg: "80%" },
                            marginTop: "60px",
                        }}
                    >
                        <img
                            src={Model}
                            style={{ width: "100%" }} // Set width to 100% to inherit from the Box
                            alt="Model"
                        />
                    </Box>
                </Grid>
            </Grid>
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
            <Box  sx={{ margin: "auto",width:"85%" }} id="daftar-card">
                <Grid container justifyContent="space-between" spacing={2}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        ref={(el) => (cardRefs.current[0] = el)}
                        className="hidden"
                        sx={{ transition: "all 0.5s ease-out" }}
                    >
                        <CardComponent
                            title="Seminar Proposal"
                            isi="Presentasikan Rencana Riset Anda di Seminar Proposal!"
                            hreff="/proposal"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        ref={(el) => (cardRefs.current[1] = el)}
                        className="hidden"
                        sx={{ transition: "all 0.5s ease-out" }}
                    >
                        <CardComponent
                            title="Seminar Hasil"
                            isi="Presentasikan Rencana Riset Anda di Seminar Proposal!"
                            hreff="hasil"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        ref={(el) => (cardRefs.current[2] = el)}
                        className="hidden"
                        sx={{ transition: "all 0.5s ease-out" }}
                    >
                        <CardComponent
                            title="Ujian Komprehensif"
                            isi="Presentasikan Rencana Riset Anda di Seminar Proposal!"
                            hreff="kompren"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        ref={(el) => (cardRefs.current[3] = el)}
                        className="hidden"
                        sx={{ transition: "all 0.5s ease-out" }}
                    >
                        <CardComponent
                            title="PPL"
                            isi="Presentasikan Rencana Riset Anda di Seminar Proposal!"
                            hreff="ppl"
                        />
                    </Grid>
                </Grid>
            </Box>
            <FooterComponent></FooterComponent>
            </>
    );
}
export default Home;
