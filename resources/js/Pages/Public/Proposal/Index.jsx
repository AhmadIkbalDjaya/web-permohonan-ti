import React from "react";
import { Head, useForm } from "@inertiajs/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { Grid } from "@mui/material";

export default function Ppl() {
    const { data, setData, post, progress } = useForm({
        name: "",
        avatar: null,
    });

    function submit(e) {
        e.preventDefault();
        post("/users");
    }

    return (
        <>
            <Head title="Seminar Proposal" />
            <Typography variant="h4" component="h1" gutterBottom>
                Seminar Proposal
            </Typography>
            <Box display={"flex"} justifyContent={"center"}>
            <Box component="form"  onSubmit={submit} sx={{ mt: 2, width:"90%", boxShadow:"3", p:{xs:1 ,md:3}, borderRadius:2 }}>
                <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Nim"
                    fullWidth
                    variant="outlined"
                    value={data.nim}
                    onChange={(e) => setData("nim", e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Box>
                <Grid container >
                    <Grid xs={6} >
                        <TextField
                            label="Tempat Lahir"
                            fullWidth
                            variant="outlined"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            sx={{ mb: 2, width:"99.5%" }}
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            //   label="Tempat Lahir"
                            fullWidth
                            variant="outlined"
                            type="date"
                            value={data.tempatLahir}
                            onChange={(e) => setData("tempatLahir", e.target.value)}
                            sx={{ mb: 2 , width:"99.5%" }}
                        />
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid xs={8} >
                        <TextField
                            label="Jurusan"
                            fullWidth
                            variant="outlined"
                            value={"Teknik Informatika"}
                            disabled
                            onChange={(e) => setData("name", e.target.value)}
                            sx={{ mb: 2, width:"99.5%" }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            label="semester"
                            fullWidth
                            variant="outlined"
                            value={data.tempatLahir}
                            onChange={(e) => setData("tempatLahir", e.target.value)}
                            sx={{ mb: 2 , width:"99.5%" }}
                        />
                    </Grid>
                </Grid>
                <TextField
                    label="Nomor Hp"
                    fullWidth
                    variant="outlined"
                    value={data.nim}
                    onChange={(e) => setData("nim", e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Nomor Hp"
                    fullWidth
                    type="text"
                    variant="outlined"
                    value={data.nim}
                    onChange={(e) => setData("nim", e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Grid container >
                    <Grid xs={6} >
                        <TextField
                            label="Pembimbing 1"
                            fullWidth
                            variant="outlined"
                            value={data.tempatLahir}
                            onChange={(e) => setData("name", e.target.value)}
                            sx={{ mb: 2, width:"99.5%" }}
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            label="pembimbing 2"
                            fullWidth
                            variant="outlined"
                            value={data.tempatLahir}
                            onChange={(e) => setData("tempatLahir", e.target.value)}
                            sx={{ mb: 2 , width:"99.5%" }}
                        />
                    </Grid>
                </Grid>

                </Box>
              
                <Button type="submit" variant="contained" style={{width:"100%"}} color="primary">
                    Submit
                </Button>
            </Box>
            </Box>
        </>
    );
}
