import {
    ThemeProvider,
    Grid,
    Box,
    CssBaseline,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import { themeColor } from "../../../theme/ColorTheme";
import AppInputLabel from "../components/elements/input/AppInputLabel";
import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";

export default function Login() {
    const { errors, flash } = usePage().props;
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
        router.post(route("login.check"), formValues);
    }
    return (
        <>
            <Head title={"Login"} />
            <ThemeProvider theme={themeColor}>
                <CssBaseline />
                <Grid
                    container
                    height={"100vh"}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                    sx={{ background: "#B20600" }}
                >
                    <Box
                        sx={{
                            p: "50px 40px",
                            background: "white",
                            borderRadius: "15px",
                            minWidth: "425px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            fontWeight={"600"}
                        >
                            Login to Admin
                        </Typography>
                        <Typography
                            variant="body2"
                            fontWeight={"600"}
                            fontSize={"12px"}
                            textAlign={"center"}
                            color={"gray-500"}
                        >
                            Please enter your email and password to continue
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
                        <Box sx={{ py: "25px" }}>
                            <Box sx={{ pb: "25px" }}>
                                <AppInputLabel
                                    label="Email address"
                                    color={"gray-500"}
                                    fontWeight={"500"}
                                />
                                <TextField
                                    id="email"
                                    name="email"
                                    type="string"
                                    value={formValues.email}
                                    onChange={handleChangeForm}
                                    placeholder="Enter your email"
                                    fullWidth
                                    error={errors.email ? true : false}
                                    helperText={errors.email ?? ""}
                                />
                            </Box>
                            <Box>
                                <AppInputLabel
                                    label="Password"
                                    color={"gray-500"}
                                    fontWeight={"500"}
                                />
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formValues.password}
                                    onChange={handleChangeForm}
                                    placeholder="Enter your password"
                                    fullWidth
                                    error={errors.password ? true : false}
                                    helperText={errors.password ?? ""}
                                />
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"center"}>
                            <Button
                                onClick={handleSubmitForm}
                                variant="contained"
                                color="primary"
                                size="small"
                                sx={{
                                    width: "80%",
                                    textTransform: "capitalize",
                                }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </ThemeProvider>
        </>
    );
}
