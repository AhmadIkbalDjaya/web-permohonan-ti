import { usePage } from "@inertiajs/react";
import { IconButton, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ShowSnackbar() {
    const { flash } = usePage().props;
    const [open, setOpen] = useState({
        open: false,
        type: null,
        color: "#546e7a",
    });
    useEffect(() => {
        if (flash.success != null) {
            setOpen({
                open: true,
                type: "success",
                color: "#43a047",
            });
        } else if (flash.error != null) {
            setOpen({
                open: true,
                type: "error",
                color: "#e53935",
            });
        } else if (flash.warning != null) {
            setOpen({
                open: true,
                type: "warning",
                color: "#fdd835",
            });
        } else if (flash.info != null) {
            setOpen({
                open: true,
                type: "info",
                color: "#00acc1",
            });
        } else if (flash.message != null) {
            setOpen({
                open: true,
                type: "message",
                color: "#546e7a",
            });
        } else {
            setOpen({
                open: false,
                type: null,
                color: "#546e7a",
            });
        }
    }, [flash]);
    const handleClose = (event, reason) => {
        if (reason == "clickaway") {
            return;
        }
        setOpen({
            open: false,
            type: null,
            color: "#546e7a",
        });
    };
    return (
        <Snackbar
            open={open.open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={`${flash[open.type]}`}
            action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <IoClose />
                </IconButton>
            }
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            ContentProps={{
                sx: {
                    background: open.color,
                },
            }}
        />
    );
}
