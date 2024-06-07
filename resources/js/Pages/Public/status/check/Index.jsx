import { Head, router, usePage } from "@inertiajs/react";
import {
    Grid,
    TextField,
    Button,
    Typography,
    ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import AppInputLabel from "../../../admin/components/elements/input/AppInputLabel";
import appTheme from "../../../../theme/AppTheme";

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
            <ThemeProvider theme={appTheme}>
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
