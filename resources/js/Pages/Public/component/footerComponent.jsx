import { Container, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import * as React from "react";
import { RiFacebookLine, RiInstagramLine, RiTwitterLine } from "react-icons/ri";

export default function FooterComponent () {
    return (
        <footer style={{ marginTop: 60 }}>
                <Paper elevation={2}>
                    <Container maxWidth={"lg"}>
                        <Grid
                            container
                            spacing={2}
                            justifyContent={"space-between"}
                        >
                            <Grid item xs={12} sm={6} md={3}>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="Alamat"
                                            secondary="JI. H.M. Yasin Limpo No. 36 Samata, Kab Gowa, Sulawesi Selatan, Indonesia"
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="KONTAK"
                                            secondary="(0411) 841879"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="(0411) 8221400" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="kontak@uin-alauddin.ac.id" />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                        <h3>Social Media</h3>
                                        <IconButton
                                            href="https://www.facebook.com/"
                                            aria-label="Facebook"
                                        >
                                             <RiFacebookLine/>
                                        </IconButton>
                                        <IconButton
                                            href="https://twitter.com/"
                                            aria-label="Twitter"
                                        >
                                            <RiTwitterLine/>
                                        </IconButton>
                                        <IconButton
                                            href="https://www.instagram.com/"
                                            aria-label="Instagram"
                                        >
                                            <RiInstagramLine/>
                                        </IconButton>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container alignItems="center">
                            <Grid item>
                                <Typography
                                    variant="body2"
                                    sx={{ textAlign: "center" }}
                                >
                                    Copyright &copy; 2024 Inready Workgroup. All
                                    Rights Reserved.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </footer>
    )
}