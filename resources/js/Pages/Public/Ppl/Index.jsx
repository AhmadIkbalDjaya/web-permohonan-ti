import React, { useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {
    AppBar,
    Breadcrumbs,
    ButtonGroup,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    Toolbar,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import FooterComponent from "../component/footerComponent";
import ReactSignatureCanvas from "react-signature-canvas";

export default function Ppl() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [signature, setSignatur] = useState();
    const [emptySignature, setEmptySignature] = useState(false);
    const [jmlMhs, setJmlMhs] = useState(1);

    const clearSignatur = () => {
        signature.clear();
    };
    const saveSignature = () => {
        if (signature.isEmpty()) {
            setEmptySignature(true);
        } else {
            setEmptySignature(false);
            const result = signature
                .getTrimmedCanvas()
                .toDataURL("applicant_sign");
            const image = dataURLtoBlob(result);
            setFormValues((values) => {
                return {
                    ...values,
                    applicant_sign: image,
                };
            });
        }
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const { errors } = usePage().props;
    const [formValues, setFormValues] = useState([
        { name: '', nim: '', pob: '', dob: '', semester: '', phone: '' }
      ]);
    
      const handleChange = (event) => {
        const value = event.target.value;
        setJmlMhs(value);
        setFormValues(Array.from({ length: value }, () => ({ name: '', nim: '', pob: '', dob: '', semester: '', phone: '' })));
      };
    
      const handleChangeForm = (index, event) => {
        const { name, value } = event.target;
        const newFormValues = [...formValues];
        newFormValues[index][name] = value;
        setFormValues(newFormValues);
      };

    function handleSubmitForm(e) {
        console.log(formValues);
        console.log(errors);
        const formData = new FormData();
        for (const [key, value] of Object.entries(formValues)) {
            if (key == "files") {
                for (const [key, file] of Object.entries(value)) {
                    formData.append(key, file);
                }
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            } else {
                formData.append(key, value);
            }
        }
        // router.post("/admin/proposal", formValues);
        router.post("/admin/proposal", formData, {
            headers: {
                "Content-Type": "multipart/form-formValues",
            },
        });
    }

   
    return (
        <>
            <Head title="Praktek Kerja Lapangan" />
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
                            href="/ppl"
                        >
                            <Typography color="text.primary">
                                Praktek Kerja Lapangan
                            </Typography>
                        </Link>
                    </Breadcrumbs>
                    <Typography variant="h5" component="h1">
                    Praktek Kerja Lapangan
                    </Typography>
                </Box>
                <Box>
                    <Button
                        onClick={handleSubmitForm}
                        variant="contained"
                        color="primary"
                        sx={{
                            background: "#1976d2",
                            textTransform: "none",
                            display: {
                                // xs: "none",
                                sm: "inherit",
                            },
                        }}
                    >
                        <FaPlus /> Simpan
                    </Button>
                </Box>
            </Box>

            <Box>
                <Grid item container>
                    <Grid item xs={12} md={8}>
                        <Box display={"flex"} justifyContent={"center"}>
                            <Box
                                sx={{
                                    background: "white",
                                    // border: ".5px solid",
                                    // borderColor: "slate-300",
                                    boxShadow: 2,
                                    marginTop: 2,
                                    borderRadius: "4px",
                                    width: "93%",
                                    padding: 1,
                                }}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Jumlah Mahasiswa
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={jmlMhs}
                                        label="Jumlah Mahasiswa"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        {formValues.map((formValues, index) => (
                        <Box display={"flex"} key={index} justifyContent={"center"}>
                            <Box
                                sx={{
                                    mt: 2,
                                    width: "90%",
                                    boxShadow: "3",
                                    p: { xs: 1, md: 3 },
                                    borderRadius: 2,
                                }}
                            >
                                <Typography mb={2}>Mahasiswa {index + 1}</Typography>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    variant="outlined"
                                    value={formValues.name}
                                    sx={{ mb: 2 }}
                                    id="name"
                                    type="string"
                                    name="name"
                                    onChange={handleChangeForm}
                                />
                                <TextField
                                    label="Nim"
                                    fullWidth
                                    variant="outlined"
                                    value={formValues.nim}
                                    id="nim"
                                    name="nim"
                                    type="string"
                                    sx={{ mb: 2 }}
                                    onChange={handleChangeForm}
                                />
                                <Box>
                                    <Grid item container>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Tempat Lahir"
                                                fullWidth
                                                variant="outlined"
                                                value={formValues.pob}
                                                id="pob"
                                                type="string"
                                                name="pob"
                                                onChange={handleChangeForm}
                                                sx={{ mb: 2, width: "99.5%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                        <Box display={"flex"} alignItems={"center"}>
                                        <InputLabel sx={{mb: 2}} id="dob">
                                        Tanggal Lahir : 
                                        </InputLabel>
                                            <TextField
                                                // label="Tempat Lahir"
                                                active
                                                fullWidth
                                                variant="outlined"
                                                type="date"
                                                value={formValues.dob}
                                                id="dob"
                                                name="dob"
                                                onChange={handleChangeForm}
                                                sx={{ mb: 2, width: "75.5%" }}
                                            />
                                            </Box>
                                        </Grid>
                                        
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={8}>
                                            <TextField
                                                label="Jurusan"
                                                fullWidth
                                                variant="outlined"
                                                value={"Teknik Informatika"}
                                                disabled
                                                sx={{ mb: 2, width: "99.5%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="semester"
                                                fullWidth
                                                variant="outlined"
                                                value={formValues.tempatLahir}
                                                id="semester"
                                                type="string"
                                                name="semester"
                                                onChange={handleChangeForm}
                                                sx={{ mb: 2, width: "99.5%" }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <TextField
                                        label="Nomor Hp"
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                        id="phone"
                                        name="phone"
                                        type="number"
                                        value={formValues.phone}
                                        onChange={handleChangeForm}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    ))}
                    </Grid>
                    <Grid item xs={12} md={4}>

                        <Box display={"flex"} justifyContent={"center"}>
                            <Box
                                sx={{
                                    background: "white",
                                    // border: ".5px solid",
                                    // borderColor: "slate-300",
                                    boxShadow: 2,
                                    marginTop: 2,
                                    borderRadius: "4px",
                                    width: "90%",
                                    padding: 1,
                                }}
                            >
                                <Typography mb={2}>Waktu/Tempat</Typography>
                                <Grid container>
                                    <Grid xs={6} spacing={4}>
                                        <InputLabel id="phone">
                                            Tanggal Mulai
                                        </InputLabel>
                                        <TextField
                                            // label="Tanggal Mulai"
                                            // multiline
                                            fullWidth
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                            id="phone"
                                            name="phone"
                                            type="date"
                                            // value={formValues.phone}
                                            onChange={handleChangeForm}
                                        />
                                    </Grid>
                                    <Grid xs={6}>
                                        <InputLabel id="phone">
                                            Tanggal Selesai
                                        </InputLabel>
                                        <TextField
                                            // label="Tanggal Mulai"
                                            // multiline
                                            id="phone"
                                            fullWidth
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                            name="phone"
                                            type="date"
                                            // value={formValues.phone}
                                            onChange={handleChangeForm}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container>
                                    <TextField
                                        label="Nama Instansi"
                                        fullWidth
                                        variant="outlined"
                                        value={formValues.tempatLahir}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        sx={{ mb: 2, width: "99.5%" }}
                                    />
                                    <TextField
                                        label="Alamat Instansi"
                                        fullWidth
                                        variant="outlined"
                                        value={formValues.tempatLahir}
                                        onChange={(e) =>
                                            setData(
                                                "tempatLahir",
                                                e.target.value
                                            )
                                        }
                                        sx={{ mb: 2, width: "99.5%" }}
                                    />
                                </Grid>
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"center"}>
                            <Box
                                sx={{
                                    background: "white",
                                    // border: ".5px solid",
                                    // borderColor: "slate-300",
                                    boxShadow: 2,
                                    marginTop: 2,
                                    borderRadius: "4px",
                                    width: "90%",
                                    padding: 1,
                                }}
                            >
                                <Box
                                    sx={{ p: "15px" }}
                                    borderBottom={"1px solid"}
                                    // borderColor={"slate-300"}
                                >
                                    <Box display={"flex"} height={"fit"}>
                                        <Typography
                                            variant="body2"
                                            color="initial"
                                            fontWeight={600}
                                        >
                                            Tanda Tangan Pemohon
                                        </Typography>
                                        <Typography color="red">
                                            &nbsp; *
                                        </Typography>
                                    </Box>
                                    {errors.applicant_sign ? (
                                        <InputErrorMessage px={0}>
                                            {errors.applicant_sign}
                                        </InputErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                    {emptySignature ? (
                                        <InputErrorMessage px={0}>
                                            Anda Belum Tanda Tangan
                                        </InputErrorMessage>
                                    ) : (
                                        ""
                                    )}
                                </Box>
                                <Box display={"flex"} justifyContent={"center"}>
                                    <ReactSignatureCanvas
                                        ref={(ref) => {
                                            setSignatur(ref);
                                        }}
                                        penColor="black"
                                        backgroundColor="#F4F6F8"
                                        canvasProps={{
                                            width: 300,
                                            height: 200,
                                            className: "sigCanvas",
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <ButtonGroup
                                        variant="contained"
                                        // color="slate-300"
                                        fullWidth
                                    >
                                        <Button onClick={clearSignatur}>
                                            Bersihkan
                                        </Button>
                                        <Button onClick={saveSignature}>
                                            Simpan
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                            </Box>
                        </Box>
                        
                    </Grid>
                </Grid>
            </Box>

            <FooterComponent sx={{ marginTop: "100px" }} />
        </>
    );
}
