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
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
} from "@mui/material";
import Model from "../assets/model.png";
import CardComponent from "../component/cardComponent";
import "./style.css";
import useIntersectionObserver from "./animasi";

import React, { useEffect, useRef } from "react";
import { Head } from "@inertiajs/react";

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

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
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
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Grid container spacing={1} alignItems="center" justifyContent="center">
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
                fontSize: { xs: "35px", sm: "45px", md: "55px", lg: "60px" },
                textAlign: "left",
                fontFamily: "poppins",
                fontWeight: "60px",
              }}
            >
              Daftarkan diri anda segera! Untuk menjadi teknokrat sejati
            </Typography>
            <p style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
              tempora optio. Facere, quisquam sunt excepturi incidunt recusandae
              maxime optio ipsam minima beatae provident unde quidem, non porro
              quam ipsa velit. Quam praesentium molestiae animi minima atque
              repellat esse sed corporis error autem quos mollitia qui at
              molestias, dignissimos dolorum ex labore ratione quidem ducimus?
              Earum dolor sunt exercitationem nulla officiis. Perspiciatis quam
              eius, qui deserunt eum quidem sint cumque modi ratione voluptatum,
              ex doloremque minima vitae quod dolore quos dolorum aut mollitia?
              Voluptatum doloremque beatae commodi excepturi accusamus saepe ab.
            </p>
            <Grid container justifyContent="flex-start">
              <Button
                variant="contained"
                sx={{ display: { sm: "none", md: "flex", lg: "flex" } }}
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
          style={{ width: "10%", margin: "auto", border: "2px solid black" }}
        />
      </Box>
      <Box width="99%" sx={{ margin: "auto" }}>
        <Grid container justifyContent="space-evenly" spacing={2}>
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
              hreff="/ppl"
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
              title="Seminar Proposal"
              isi="Presentasikan Rencana Riset Anda di Seminar Proposal!"
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
              title="Seminar Proposal"
              isi="Presentasikan Rencana Riset Anda di Seminar Proposal!"
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
              title="Seminar Proposal"
              isi="Presentasikan Rencana Riset Anda di Seminar Proposal!"
            />
          </Grid>
        </Grid>
      </Box>
      <footer style={{marginTop:20}} >
        <Paper elevation={2}>
          <Container maxWidth={"lg"}>
            <Grid container spacing={2} justifyContent={"space-between"}>
              <Grid item xs={12} sm={6} md={3}>
                <List>
                  <ListItem>
                    <ListItemText
                    primary="Alamat"
                    secondary="JI. H.M. Yasin Limpo No. 36 Samata, Kab Gowa, Sulawesi Selatan, Indonesia"

                    />
                    
                  </ListItem>
                
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <List>
                  <ListItem>
                    <ListItemText primary="KONTAK" secondary="(0411) 841879" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="(0411) 8221400" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="kontak@uin-alauddin.ac.id" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <List>
                  <ListItem>
                    <h3>Social Media</h3>
                  </ListItem>
                  <ListItem>
                    <IconButton
                      href="https://www.facebook.com/"
                      aria-label="Facebook"
                    >
                      Facebook
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton
                      href="https://twitter.com/"
                      aria-label="Twitter"
                    >
                      Twitter
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton
                      href="https://www.instagram.com/"
                      aria-label="Instagram"
                    >
                      Instagram
                    </IconButton>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Divider />
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body2" sx={{textAlign:"center"}}>
                  Copyright &copy; 2024 Inready Workgroup. All Rights
                  Reserved.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </footer>
    </>
  );
}
export default Home;
