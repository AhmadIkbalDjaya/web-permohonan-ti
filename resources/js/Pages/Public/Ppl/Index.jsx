import React, { useState } from "react";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
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
    ThemeProvider,
    Toolbar,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import FooterComponent from "../component/footerComponent";
import ReactSignatureCanvas from "react-signature-canvas";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import AppInputLabel from "../../admin/components/elements/input/AppInputLabel";
import { semesterListItems } from "../../admin/components/elements/input/SemesterListItems";
import InputErrorMessage from "../../admin/components/elements/input/InputErrorMessage";
import appTheme from "../../../theme/AppTheme";

export default function Ppl({ lecturers }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [signature, setSignatur] = useState();
    const [emptySignature, setEmptySignature] = useState(false);

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
    const [formValues, setFormValues] = useState({
        start_date: "",
        end_date: "",
        location: "",
        location_address: "",
        student_count: 1,

        names: [""],
        nims: [""],
        pobs: [""],
        dobs: [""],
        semesters: [""],
        phones: [""],
    });

    function handleChangeForm(e, index = null) {
        const name = e.target.name;
        const value = e.target.value;
        if (
            ["names", "nims", "pobs", "dobs", "semesters", "phones"].includes(
                name
            ) &&
            index != null
        ) {
            setFormValues((values) => {
                const updateArray = [...values[name]];
                updateArray[index] = value;
                return {
                    ...values,
                    [name]: updateArray,
                };
            });
        } else {
            if (name == "student_count") {
                if (value > formValues.student_count) {
                    for (let i = formValues.student_count; i < value; i++) {
                        setFormValues((values) => {
                            let updateNames = [...values.names];
                            updateNames[i] = "";
                            let updateNims = [...values.nims];
                            updateNims[i] = "";
                            let updateDobs = [...values.dobs];
                            updateDobs[i] = "";
                            let updatePobs = [...values.pobs];
                            updatePobs[i] = "";
                            let updateSemesters = [...values.semesters];
                            updateSemesters[i] = "";
                            let updatePhones = [...values.phones];
                            updatePhones[i] = "";
                            return {
                                ...values,
                                names: updateNames,
                                nims: updateNims,
                                dobs: updateDobs,
                                pobs: updatePobs,
                                semesters: updateSemesters,
                                phones: updatePhones,
                            };
                        });
                    }
                }
            }
            setFormValues((values) => {
                return {
                    ...values,
                    [name]: value,
                };
            });
        }
    }
    function handleSubmitForm(e) {
        router.post(route("ppl.store"), formValues);
    }

    return (
        <>
            <Head title="Praktek Kerja Lapangan" />
            <ThemeProvider theme={appTheme}>
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
                    <Box sx={{ marginLeft: { xs: 3, md: 5 } }}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>
                            <Link underline="hover" color="inherit" href="/ppl">
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
                <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    gap={3}
                    sx={{
                        flexWrap: {
                            xs: "wrap",
                            md: "nowrap",
                        },
                    }}
                >
                    <Box
                        flex={{
                            xs: "100%",
                            md: 8,
                        }}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={2}
                    >
                        <Box
                            sx={{
                                background: "white",
                                border: ".5px solid",
                                borderColor: "slate-300",
                                borderRadius: "4px",
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="initial"
                                sx={{ p: "15px", fontWeight: "600" }}
                                borderBottom={"1px solid"}
                                borderColor={"slate-300"}
                            >
                                Data PPL
                            </Typography>
                            <Grid container spacing={2} padding={"15px"}>
                                <Grid item xs={12}>
                                    <AppInputLabel
                                        label="Lokasi PPL"
                                        required={true}
                                    />
                                    <TextField
                                        id="location"
                                        name="location"
                                        type="string"
                                        value={formValues.location}
                                        onChange={handleChangeForm}
                                        placeholder="Masukkan Nama Instansi PPL"
                                        fullWidth
                                        error={errors.location ? true : false}
                                        helperText={errors.location ?? ""}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <AppInputLabel
                                        label="Alamat Lokasi"
                                        required={true}
                                    />
                                    <TextField
                                        id="location_address"
                                        name="location_address"
                                        type="string"
                                        multiline
                                        rows={2}
                                        value={formValues.location_address}
                                        onChange={handleChangeForm}
                                        placeholder="Masukkan Alamat Lokasi PPL"
                                        fullWidth
                                        error={
                                            errors.location_address
                                                ? true
                                                : false
                                        }
                                        helperText={
                                            errors.location_address ?? ""
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel
                                        label="Tanggal Mulai"
                                        required={true}
                                    />
                                    <TextField
                                        id="start_date"
                                        name="start_date"
                                        type="date"
                                        value={formValues.start_date}
                                        onChange={handleChangeForm}
                                        fullWidth
                                        error={errors.start_date ? true : false}
                                        helperText={errors.start_date ?? ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel
                                        label="Tanggal Selesai"
                                        required={true}
                                    />
                                    <TextField
                                        id="end_date"
                                        name="end_date"
                                        type="date"
                                        value={formValues.end_date}
                                        onChange={handleChangeForm}
                                        fullWidth
                                        error={errors.end_date ? true : false}
                                        helperText={errors.end_date ?? ""}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <AppInputLabel
                                        label="Jumlah Mahasiswa PPL"
                                        required={true}
                                    />
                                    <TextField
                                        id="student_count"
                                        name="student_count"
                                        type="number"
                                        value={formValues.student_count}
                                        onChange={handleChangeForm}
                                        inputProps={{
                                            min: 1,
                                            max: 3,
                                        }}
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                        fullWidth
                                        error={
                                            errors.student_count ? true : false
                                        }
                                        helperText={errors.student_count ?? ""}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        {Array.from(
                            { length: formValues.student_count },
                            (e, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        background: "white",
                                        border: ".5px solid",
                                        borderColor: "slate-300",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="initial"
                                        sx={{ p: "15px", fontWeight: "600" }}
                                        borderBottom={"1px solid"}
                                        borderColor={"slate-300"}
                                    >
                                        Data Mahasiswa Ke-{index + 1}
                                    </Typography>
                                    <Grid
                                        container
                                        spacing={2}
                                        padding={"15px"}
                                    >
                                        <Grid item xs={12} sm={6}>
                                            <AppInputLabel
                                                label="Nama"
                                                required={true}
                                            />
                                            <TextField
                                                id="name"
                                                name="names"
                                                type="string"
                                                value={formValues.names[index]}
                                                onChange={(e) => {
                                                    handleChangeForm(e, index);
                                                }}
                                                placeholder="Masukkan Nama Mahasiswa"
                                                fullWidth
                                                error={
                                                    errors[`names.${index}`]
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    errors[`names.${index}`] ??
                                                    ""
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <AppInputLabel
                                                label="NIM"
                                                required={true}
                                            />
                                            <TextField
                                                id="nim"
                                                name="nims"
                                                type="number"
                                                value={formValues.nims[index]}
                                                onChange={(e) => {
                                                    handleChangeForm(e, index);
                                                }}
                                                placeholder="Masukkan NIM"
                                                fullWidth
                                                error={
                                                    errors[`nims.${index}`]
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    errors[`nims.${index}`] ??
                                                    ""
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <AppInputLabel
                                                label="Tempat Lahir"
                                                required={true}
                                            />
                                            <TextField
                                                id="pob"
                                                name="pobs"
                                                type="string"
                                                value={formValues.pobs[index]}
                                                onChange={(e) => {
                                                    handleChangeForm(e, index);
                                                }}
                                                placeholder="Masukkan Tempat Lahir"
                                                fullWidth
                                                error={
                                                    errors[`pobs.${index}`]
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    errors[`pobs.${index}`] ??
                                                    ""
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <AppInputLabel
                                                label="Tanggal Lahir"
                                                required={true}
                                            />
                                            <TextField
                                                id="dob"
                                                name="dobs"
                                                type="date"
                                                value={formValues.dobs[index]}
                                                onChange={(e) => {
                                                    handleChangeForm(e, index);
                                                }}
                                                placeholder="Masukkan Tanggal Lahir"
                                                fullWidth
                                                error={
                                                    errors[`dobs.${index}`]
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    errors[`dobs.${index}`] ??
                                                    ""
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <AppInputLabel
                                                label="Semester"
                                                required={true}
                                            />
                                            <Select
                                                id="semester"
                                                name="semesters"
                                                value={
                                                    formValues.semesters[index]
                                                }
                                                onChange={(e) => {
                                                    handleChangeForm(e, index);
                                                }}
                                                fullWidth
                                                displayEmpty
                                                error={
                                                    errors[`semesters.${index}`]
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <MenuItem value="" disabled>
                                                    <Typography
                                                        variant="body2"
                                                        color="#ababab"
                                                        fontWeight={"600"}
                                                        display={"flex"}
                                                    >
                                                        Semester Saat Ini
                                                    </Typography>
                                                </MenuItem>
                                                {semesterListItems.map(
                                                    (semester, i) => {
                                                        return (
                                                            <MenuItem
                                                                key={i}
                                                                value={
                                                                    semester.value
                                                                }
                                                            >
                                                                {semester.body}
                                                            </MenuItem>
                                                        );
                                                    }
                                                )}
                                            </Select>
                                            {errors[`semesters.${index}`] && (
                                                <InputErrorMessage>
                                                    {
                                                        errors[
                                                            `semesters.${index}`
                                                        ]
                                                    }
                                                </InputErrorMessage>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <AppInputLabel
                                                label="Nomor Telepon"
                                                required={true}
                                            />
                                            <TextField
                                                id="phone"
                                                name="phones"
                                                type="number"
                                                value={formValues.phones[index]}
                                                onChange={(e) => {
                                                    handleChangeForm(e, index);
                                                }}
                                                placeholder="Masukkan Nomor Telepon"
                                                fullWidth
                                                error={
                                                    errors[`phones.${index}`]
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    errors[`phones.${index}`] ??
                                                    ""
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            )
                        )}
                    </Box>
                    <Box
                        flex={{
                            xs: "100%",
                            md: 5,
                        }}
                        sx={{
                            background: "white",
                            border: ".5px solid",
                            borderColor: "slate-300",
                            borderRadius: "4px",
                        }}
                    >
                        <Box
                            sx={{ p: "15px" }}
                            borderBottom={"1px solid"}
                            borderColor={"slate-300"}
                        >
                            <Box display={"flex"} height={"fit"}>
                                <Typography
                                    variant="body2"
                                    color="initial"
                                    fontWeight={600}
                                >
                                    Tanda Tangan Pemohon
                                </Typography>
                                <Typography color="red">&nbsp; *</Typography>
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
                                color="slate-300"
                                fullWidth
                            >
                                <Button onClick={clearSignatur}>
                                    Bersihkan
                                </Button>
                                <Button onClick={saveSignature}>Simpan</Button>
                            </ButtonGroup>
                        </Box>
                    </Box>
                    <Box
                        flex={"100%"}
                        display={{
                            sx: "inherit",
                            md: "none",
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={<FaPlus />}
                            fullWidth
                            color="primary"
                            onClick={handleSubmitForm}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Box>

                <FooterComponent sx={{ marginTop: "100px" }} />
            </ThemeProvider>
        </>
    );
}
