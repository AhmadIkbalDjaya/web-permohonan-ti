import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@mui/material";
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

export default function ConfirmDeleteModal({
    open,
    handleClose,
    handleDelete,
}) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent sx={{ textAlign: "center" }}>
                <RiDeleteBinLine size={70} color="red" />
                <DialogContentText
                    id="alert-dialog-description"
                    sx={{ color: "black", fontSize: "12px", fontWeight: "600" }}
                >
                    Data Akan Terhapus Permanent, <br /> apakah anda yakin ingin{" "}
                    <br /> menghapusnya?
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginX: "20px",
                    gap: 1,
                }}
            >
                <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={handleDelete}
                    autoFocus
                    sx={{
                        textTransform: "capitalize",
                        borderRadius: "25px",
                        fontWeight: "600",
                    }}
                    fullWidth
                >
                    Ya, Hapus
                </Button>
                <Button
                    size="small"
                    color="error"
                    onClick={handleClose}
                    sx={{
                        textTransform: "capitalize",
                        borderRadius: "25px",
                        fontWeight: "600",
                    }}
                    fullWidth
                >
                    Batal
                </Button>
            </DialogActions>
        </Dialog>
    );
}
