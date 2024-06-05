import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    styled,
} from "@mui/material";
import React from "react";
import { IoClose } from "react-icons/io5";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));
export default function ShowPDFModal({ open, handleClose, name, file }) {
    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            scroll={"paper"}
        >
            <DialogTitle
                sx={{
                    m: 0,
                    p: 2,
                    textTransform: "capitalize",
                    fontSize: "14px",
                }}
                id="customized-dialog-title"
            >
                {name}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <IoClose />
            </IconButton>
            <DialogContent dividers>
                <Box
                    component={"embed"}
                    src={file}
                    sx={{
                        width: "500px",
                        height: {
                            xs: "200px",
                            md: "600px",
                        },
                        display: {
                            xs: "none",
                            md: "inherit",
                        },
                    }}
                ></Box>
                <Typography
                    sx={{
                        dispay: {
                            xs: "inherit",
                            md: "none",
                        },
                        textAlign: "center",
                        fontWeight: "500",
                        fontSize: "14px",
                    }}
                    color={"black"}
                    variant="body1"
                >
                    Tidak dapat menampilkan pdf pada perangkat
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Tutup</Button>
                <Button
                    onClick={() => {
                        const link = document.createElement("a");
                        link.download = `${name}`;
                        link.href = `${file}`;
                        link.click();
                    }}
                >
                    Download
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}
