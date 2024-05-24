import React from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head } from "@inertiajs/react";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import AppInputLabel from "../components/elements/input/AppInputLabel";
import Typography from "@mui/material/Typography";
import {
    Box,
    Button,
    FormLabel,
    Grid,
    InputLabel,
    Select,
    TextField,
    ThemeProvider,
    MenuItem,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { themeTextField } from "../../../theme/TextFieldTheme";

export default function CreateProposal({ file_requirements }) {
    return (
        <>
            <Head title="Tambah Permohonan Proposal" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href="/admin">Home</AppLink>
                    <AppLink href="/admin/proposal">Proposal</AppLink>
                    <AppLink href="/admin/proposal" color="black">
                        Tambah Permohonan
                    </AppLink>
                </AppBreadcrumbs>
                <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    justifyContent={"space-between"}
                    my={1}
                >
                    <Box>
                        <Typography variant="h5" fontWeight={"600"}>
                            Tambah Permohonan
                        </Typography>
                        <Typography variant="caption">
                            Isi Formulir Permohonan Seminar Proposal Baru
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<FaPlus />}
                        sx={{
                            background: "#B20600",
                            textTransform: "none",
                            display: {
                                xs: "none",
                                sm: "inherit",
                            },
                        }}
                    >
                        Simpan
                    </Button>
                </Box>
                <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    gap={2}
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
                            Data Seminar
                        </Typography>
                        <ThemeProvider theme={themeTextField}>
                            <Grid container spacing={2} padding={"15px"}>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel
                                        label="Nama"
                                        required={true}
                                    />
                                    <TextField
                                        id="name"
                                        type="string"
                                        label=""
                                        placeholder="Masukkan Nama Mahasiswa"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel
                                        label="NIM"
                                        required={true}
                                    />
                                    <TextField
                                        id="nim"
                                        type="number"
                                        label=""
                                        placeholder="Masukkan NIM"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel
                                        label="Tempat Lahir"
                                        required={true}
                                    />
                                    <TextField
                                        id="pob"
                                        type="string"
                                        label=""
                                        placeholder="Masukkan Tempat Lahir"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel
                                        label="Tanggal Lahir"
                                        required={true}
                                    />
                                    <TextField
                                        id="pob"
                                        type="date"
                                        label=""
                                        placeholder="Masukkan Tempat Lahir"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel
                                        label="Semester"
                                        required={true}
                                    />
                                    <Select
                                        value={""}
                                        displayEmpty
                                        renderValue={(selected) => {
                                            if (selected) {
                                                return (
                                                    <Typography
                                                        variant="body2"
                                                        color="initial"
                                                        fontWeight={"600"}
                                                        display={"flex"}
                                                    >
                                                        {selected}
                                                    </Typography>
                                                );
                                            }
                                            return (
                                                <Typography
                                                    variant="body2"
                                                    color="#ababab"
                                                    fontWeight={"600"}
                                                    display={"flex"}
                                                >
                                                    Semester Saat Ini
                                                </Typography>
                                            );
                                        }}
                                        fullWidth
                                    >
                                        <MenuItem value={1}>Satu</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel
                                        label="Nomor Telepon"
                                        required={true}
                                    />
                                    <TextField
                                        id="pob"
                                        type="number"
                                        label=""
                                        placeholder="Masukkan Nomor Telpon"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <AppInputLabel
                                        label="Judul Skripsi"
                                        required={true}
                                    />
                                    <TextField
                                        id="pob"
                                        type="string"
                                        label=""
                                        placeholder="Masukkan Judul Skripsi"
                                        fullWidth
                                        multiline
                                        rows={2}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel
                                        label="Pembimbing 1"
                                        required={true}
                                    />
                                    <TextField
                                        id="pob"
                                        type="string"
                                        label=""
                                        placeholder="Nama Pembimbing 1"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel
                                        label="Pembimbing 2"
                                        required={true}
                                    />
                                    <TextField
                                        id="pob"
                                        type="string"
                                        label=""
                                        placeholder="Nama Pembimbing 2"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel label="Penguji 1" />
                                    <TextField
                                        id="pob"
                                        type="string"
                                        label=""
                                        placeholder="Nama Penguji 1"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel label="Penguji 2" />
                                    <TextField
                                        id="pob"
                                        type="string"
                                        label=""
                                        placeholder="Nama Penguji 2"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel label="Tanggal" />
                                    <TextField
                                        id="pob"
                                        type="date"
                                        label=""
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AppInputLabel label="Jam" />
                                    <TextField
                                        id="pob"
                                        type="time"
                                        label=""
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <AppInputLabel label="Lokasi Seminar" />
                                    <TextField
                                        id="pob"
                                        type="string"
                                        label=""
                                        placeholder="Masukkan Lokasi Seminar"
                                        fullWidth
                                        multiline
                                        rows={2}
                                    />
                                </Grid>
                            </Grid>
                        </ThemeProvider>
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
                        <Typography
                            variant="body2"
                            color="initial"
                            sx={{ p: "15px", fontWeight: "600" }}
                            borderBottom={"1px solid"}
                            borderColor={"slate-300"}
                        >
                            Berkas
                        </Typography>
                        <ThemeProvider theme={themeTextField}>
                            <Grid container spacing={2} padding={"15px"}>
                                {file_requirements.map((file_requirement) => {
                                    return (
                                        <Grid item xs={12}>
                                            <AppInputLabel
                                                label={file_requirement.name.replaceAll(
                                                    "_",
                                                    " "
                                                )}
                                                required={
                                                    file_requirement.is_required
                                                }
                                            />
                                            <TextField
                                                id="name"
                                                type="file"
                                                label=""
                                                placeholder="Masukkan Nama Mahasiswa"
                                                fullWidth
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </ThemeProvider>
                    </Box>
                </Box>
            </BaseLayout>
        </>
    );
}
