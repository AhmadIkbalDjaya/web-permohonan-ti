import { Head, router, usePage } from "@inertiajs/react";
import {
    Grid,
    TextField,
    Button,
    Typography,
    Container,
    Box,
} from "@mui/material";
import React, { useState } from "react";
import AppInputLabel from "../../../admin/components/elements/input/AppInputLabel";
import PublicBaseLayout from "../../base_layout/PublicBaseLayout";
import AppBreadcrumbs from "../../../admin/components/elements/AppBreadcrumbs";
import AppLink from "../../../admin/components/AppLink";

export default function Index() {
    const { errors } = usePage().props;
    const [formValues, setFormValues] = useState({
        code: "",
    });
    const handleChangeForm = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues((values) => ({
            ...values,
            [name]: value,
        }));
    };
    const handleSubmitForm = () => {
        router.post(route("status.check"), formValues);
    };
    const { message } = usePage().props.flash;
    return (
        <>
            <Head title="Cek Status Permohonan" />
            <PublicBaseLayout>
                <Container maxWidth="sm" sx={{ marginTop: "85px" }}>
                    <AppBreadcrumbs>
                        <AppLink href={route("home")}>Home</AppLink>
                        <AppLink href={route("ppl")} color="black">
                            Cek Status
                        </AppLink>
                    </AppBreadcrumbs>
                    <Box
                        mt={2}
                        sx={{
                            background: "white",
                            boxShadow: 1,
                            borderRadius: 1,
                        }}
                    >
                        <Typography
                            variant="body1"
                            color="initial"
                            sx={{ p: "15px", fontWeight: "600" }}
                            borderBottom={"1px solid"}
                            borderColor={"slate-300"}
                        >
                            Cek Status Pendaftaran / Permohonan
                        </Typography>
                        <Grid
                            container
                            spacing={2}
                            marginY={0}
                            sx={{
                                px: "15px",
                                pb: "10px",
                            }}
                            justifyContent={"center"}
                        >
                            <Grid item xs={12} md={7}>
                                {/* <AppInputLabel
                                    label="Code Pendaftaran"
                                    required={true}
                                /> */}
                                <TextField
                                    id="code"
                                    name="code"
                                    type="string"
                                    value={formValues.code}
                                    onChange={handleChangeForm}
                                    placeholder="Masukkan Code Pendaftaran"
                                    fullWidth
                                    error={errors.code ? true : false}
                                    helperText={errors.code ?? ""}
                                />
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmitForm}
                                    fullWidth
                                    sx={{ textTransform: "none" }}
                                >
                                    Cek Status
                                </Button>
                            </Grid>
                            {message && (
                                <Grid item xs={12} md={7}>
                                    <Typography variant="body1">
                                        {message.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        {message.description}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </Container>
            </PublicBaseLayout>
        </>
    );
}
