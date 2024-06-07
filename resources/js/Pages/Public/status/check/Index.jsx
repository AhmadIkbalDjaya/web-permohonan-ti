import { Head, router, usePage } from "@inertiajs/react";
import {
    Grid,
    TextField,
    ThemeProvider,
    Button,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { themeColor } from "../../../../theme/ColorTheme";
import AppInputLabel from "../../component/AppInputLabel";

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
    console.log(message);
    return (
        <>
            <Head title="Cek Status Permohonan" />
            <ThemeProvider theme={themeColor}>
                <Grid container spacing={2} padding={"15px"}>
                    <Grid item xs={12}>
                        <AppInputLabel
                            label="Code Pendaftaran"
                            required={true}
                        />
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
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleSubmitForm}>
                            Cek Status
                        </Button>
                    </Grid>
                    {message && (
                        <Grid>
                            <Typography variant="body1">
                                {message.name}
                            </Typography>
                            <Typography variant="body1">
                                {message.description}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </ThemeProvider>
        </>
    );
}
