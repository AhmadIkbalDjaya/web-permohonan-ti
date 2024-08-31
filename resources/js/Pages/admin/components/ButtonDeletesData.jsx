import { Button } from "@mui/material";
import React from "react";
import { MdDelete } from "react-icons/md";

export default function ButtonDeletesData({
    handleOpenConfirmDeletes = () => {},
    selectedItemsCount = 0,
}) {
    return (
        <Button
            variant="contained"
            startIcon={<MdDelete size={20} color="red" />}
            size="small"
            sx={{
                textTransform: "none",
                backgroundColor: "gray-100",
                mr: "5px",
                boxShadow: "0",
                fontWeight: "bold",
                color: "gray-500",
                border: "1px solid #DFE3E8",
                "&:hover": {
                    backgroundColor: "gray-100",
                },
            }}
            onClick={handleOpenConfirmDeletes}
        >
            Hapus {selectedItemsCount}
        </Button>
    );
}
