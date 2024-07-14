import { Button } from "@mui/material";
import React from "react";
import { FaPlus } from "react-icons/fa";

export default function ButtonCreateData({
    text,
    startIcon = <FaPlus />,
    handleClick,
}) {
    return (
        <Button
            variant="contained"
            startIcon={startIcon}
            size="small"
            sx={{
                textTransform: "none",
            }}
            onClick={handleClick}
        >
            {text}
        </Button>
    );
}
