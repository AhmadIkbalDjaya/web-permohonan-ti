import {
    Grid,
    Box,
    CssBaseline,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";

export default function Login() {
    const { errors, flash, url } = usePage().props;
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    function handleChangeForm(e) {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues((values) => ({
            ...values,
            [name]: value,
        }));
    }

    function handleSubmitForm(e) {
        e.preventDefault();
        router.post(route("login.check"), formValues);
    }
    return (
        <>
            <Head title={"Login"} />
            <CssBaseline />
            <Grid
                container
                height={"100vh"}
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                wrap="wrap"
                sx={{ background: "#DFE3E8", boxShadow: 3 }}
            >
                <Box
                    sx={{
                        background: "white",
                        borderRadius: "20px",
                        minWidth: {
                            xs: "100%",
                            md: "900px",
                        },
                        maxWidth: {
                            md: "900px",
                        },
                    }}
                    display={"flex"}
                >
                    <Grid
                        container
                        direction={"column"}
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            flex: 4,
                            p: "50px 40px",
                            background: "#003399",
                            borderTopLeftRadius: "20px",
                            borderBottomLeftRadius: "20px",
                            display: {
                                xs: "none",
                                md: "inherit",
                            },
                        }}
                    >
                        <Box
                            component={"img"}
                            sx={{
                                width: "150px",
                            }}
                            src={`${url}/images/uinam.png`}
                        />
                        <Typography
                            variant="h6"
                            fontSize={22}
                            fontWeight={500}
                            color={"white"}
                        >
                            Teknik Informatika
                        </Typography>
                    </Grid>
                    <Box
                        sx={{
                            flex: 5,
                            py: "70px",
                            px: {
                                xs: "10px",
                                md: "50px",
                            },
                        }}
                    >
                        <Typography
                            variant="body1"
                            textAlign={"center"}
                            fontWeight={"600"}
                            fontSize={20}
                        >
                            Admin
                        </Typography>
                        <Typography
                            variant="body1"
                            textAlign={"center"}
                            fontWeight={"600"}
                            fontSize={{ xs: 30, md: 45 }}
                        >
                            Login
                        </Typography>
                        {flash.error && (
                            <Typography
                                variant="body2"
                                fontWeight={"600"}
                                fontSize={"12px"}
                                textAlign={"center"}
                                color={"red"}
                            >
                                {flash.error}
                            </Typography>
                        )}
                        <form onSubmit={handleSubmitForm}>
                            <Box
                                sx={{ py: "40px" }}
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                            >
                                <TextField
                                    id="email"
                                    name="email"
                                    type="string"
                                    value={formValues.email}
                                    onChange={handleChangeForm}
                                    placeholder="Email"
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            md: "75%",
                                        },
                                        mb: 2,
                                    }}
                                    error={errors.email ? true : false}
                                    helperText={errors.email ?? ""}
                                />
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formValues.password}
                                    onChange={handleChangeForm}
                                    placeholder="Password"
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            md: "75%",
                                        },
                                    }}
                                    error={errors.password ? true : false}
                                    helperText={errors.password ?? ""}
                                />
                            </Box>
                            <Box display={"flex"} justifyContent={"center"}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            md: "75%",
                                        },
                                        textTransform: "capitalize",
                                        fontSize: 18,
                                        fontWeight: 600,
                                    }}
                                >
                                    Login
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Grid>
        </>
    );
}
