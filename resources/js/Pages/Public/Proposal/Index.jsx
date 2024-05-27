import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import {
    AppBar,
    Breadcrumbs,
    Container,
    Grid,
    IconButton,
    Menu,
    Toolbar,
} from "@mui/material";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export default function Ppl() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const { data, setData, post, progress } = useForm({
        name: "",
        avatar: null,
    });

    function submit(e) {
        e.preventDefault();
        post("/users");
    }

    const [fileNames, setFileNames] = useState({
        skPembimbing: "",
        persetujuanPembimbing: "",
        lembarKonsultasi: "",
    });

    const handleFileChange = (event, key) => {
        if (event.target.files.length > 0) {
            setFileNames((prev) => ({
                ...prev,
                [key]: event.target.files[0].name,
            }));
        } else {
            setFileNames((prev) => ({
                ...prev,
                [key]: "",
            }));
        }
    };

    return (
        <>
            <Head title="Seminar Proposal" />
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
                                href="/proposal"
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
            <Box
                justifyContent={"space-between"}
                display={"flex"}
                sx={{ marginTop: 3, width: "97%" }}
            >
                <Box container sx={{ marginLeft: { xs: 3, md: 5 } }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/proposal"
                        >
                            <Typography color="text.primary">
                                Seminar Proposal
                            </Typography>
                        </Link>
                    </Breadcrumbs>
                    <Typography variant="h5" component="h1" gutterTop>
                        Seminar Proposal
                    </Typography>
                </Box>
                <Box>
                    <Button
                        type="submit"
                        variant="contained"
                        style={{ width: "100%" }}
                        color="primary"
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
            <Box component="form" onSubmit={submit}>
                <Grid container>
                    <Grid xs={12} md={6}>
                        <Box display={"flex"} justifyContent={"center"}>
                            {/* <Grid> */}

                            <Box
                                sx={{
                                    mt: 2,
                                    width: "80%",
                                    boxShadow: "3",
                                    p: { xs: 1, md: 3 },
                                    borderRadius: 2,
                                }}
                            >
                                <TextField
                                    label="Name"
                                    fullWidth
                                    variant="outlined"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Nim"
                                    fullWidth
                                    variant="outlined"
                                    value={data.nim}
                                    onChange={(e) =>
                                        setData("nim", e.target.value)
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <Box>
                                    <Grid container>
                                        <Grid xs={6}>
                                            <TextField
                                                label="Tempat Lahir"
                                                fullWidth
                                                variant="outlined"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ mb: 2, width: "99.5%" }}
                                            />
                                        </Grid>
                                        <Grid xs={6}>
                                            <TextField
                                                //   label="Tempat Lahir"
                                                fullWidth
                                                variant="outlined"
                                                type="date"
                                                value={data.tempatLahir}
                                                onChange={(e) =>
                                                    setData(
                                                        "tempatLahir",
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ mb: 2, width: "99.5%" }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid xs={8}>
                                            <TextField
                                                label="Jurusan"
                                                fullWidth
                                                variant="outlined"
                                                value={"Teknik Informatika"}
                                                disabled
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ mb: 2, width: "99.5%" }}
                                            />
                                        </Grid>
                                        <Grid xs={4}>
                                            <TextField
                                                label="semester"
                                                fullWidth
                                                variant="outlined"
                                                value={data.tempatLahir}
                                                onChange={(e) =>
                                                    setData(
                                                        "tempatLahir",
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ mb: 2, width: "99.5%" }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <TextField
                                        label="Nomor Hp"
                                        fullWidth
                                        variant="outlined"
                                        value={data.nim}
                                        onChange={(e) =>
                                            setData("nim", e.target.value)
                                        }
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        label="Nomor Hp"
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        value={data.nim}
                                        onChange={(e) =>
                                            setData("nim", e.target.value)
                                        }
                                        sx={{ mb: 2 }}
                                    />
                                    <Grid container>
                                        <Grid xs={6}>
                                            <TextField
                                                label="Pembimbing 1"
                                                fullWidth
                                                variant="outlined"
                                                value={data.tempatLahir}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ mb: 2, width: "99.5%" }}
                                            />
                                        </Grid>
                                        <Grid xs={6}>
                                            <TextField
                                                label="pembimbing 2"
                                                fullWidth
                                                variant="outlined"
                                                value={data.tempatLahir}
                                                onChange={(e) =>
                                                    setData(
                                                        "tempatLahir",
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ mb: 2, width: "99.5%" }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Box display={"flex"} justifyContent={"center"}>
                            {/* <Grid> */}

                            <Box
                                sx={{
                                    mt: 2,
                                    width: "80%",
                                    boxShadow: "3",
                                    p: { xs: 1, md: 3 },
                                    borderRadius: 2,
                                }}
                            >
                                <Box>
                                    <Box sx={{ marginBottom: 2 }}>
                                        <label htmlFor="sk-pembimbing">
                                            SK Pembimbing Skripsi (pdf)
                                        </label>
                                    </Box>
                                    {fileNames.skPembimbing && (
                                        <Box mb={2}>
                                            <strong>Selected file:</strong>{" "}
                                            {fileNames.skPembimbing}
                                        </Box>
                                    )}
                                    <Button
                                        component="label"
                                        variant="contained"
                                        startIcon={<CloudUploadIcon />}
                                        id="sk-pembimbing"
                                    >
                                        Upload file
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) =>
                                                handleFileChange(
                                                    e,
                                                    "skPembimbing"
                                                )
                                            }
                                        />
                                    </Button>

                                    <Box my={2}>
                                        <label htmlFor="persetujuan-pembimbing">
                                            Lembar Persetujuan Pembimbing (pdf)
                                        </label>
                                    </Box>
                                    {fileNames.persetujuanPembimbing && (
                                        <Box mb={2}>
                                            <strong>Selected file:</strong>{" "}
                                            {fileNames.persetujuanPembimbing}
                                        </Box>
                                    )}
                                    <Button
                                        component="label"
                                        variant="contained"
                                        startIcon={<CloudUploadIcon />}
                                        id="persetujuan-pembimbing"
                                    >
                                        Upload file
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) =>
                                                handleFileChange(
                                                    e,
                                                    "persetujuanPembimbing"
                                                )
                                            }
                                        />
                                    </Button>

                                    <Box my={2}>
                                        <label htmlFor="lembar-konsultasi">
                                            Lembar Konsultasi (pdf)
                                        </label>
                                    </Box>
                                    {fileNames.lembarKonsultasi && (
                                        <Box mb={2}>
                                            <strong>Selected file:</strong>{" "}
                                            {fileNames.lembarKonsultasi}
                                        </Box>
                                    )}
                                    <Button
                                        component="label"
                                        variant="contained"
                                        startIcon={<CloudUploadIcon />}
                                        id="lembar-konsultasi"
                                    >
                                        Upload file
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) =>
                                                handleFileChange(
                                                    e,
                                                    "lembarKonsultasi"
                                                )
                                            }
                                        />
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
