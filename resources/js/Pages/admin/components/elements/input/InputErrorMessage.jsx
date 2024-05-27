import { FormHelperText } from "@mui/material";
import React from "react";

export default function InputErrorMessage(props) {
    return (
        <FormHelperText
            color="error"
            sx={{
                color: "#d32f2f",
                px: props.px ?? "14px",
            }}
        >
            {props.children}
        </FormHelperText>
    );
}
