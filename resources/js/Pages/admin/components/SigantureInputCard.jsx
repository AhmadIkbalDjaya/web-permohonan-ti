import {
    Box,
    Button,
    ButtonGroup,
    FormHelperText,
    Typography,
} from "@mui/material";
import React from "react";
import InputErrorMessage from "./elements/input/InputErrorMessage";
import ReactSignatureCanvas from "react-signature-canvas";
export function SigantureInputCard({
    title = "Tanda Tangan Pemohon",
    formType = "create",
    emptySignature,
    setSignatur,
    clearSignatur,
    saveSignature,
    errors,
    isRequired = true,
}) {
    return (
        <Box
            sx={{
                background: "white",
                border: ".5px solid",
                borderColor: "slate-300",
                borderRadius: "4px",
            }}
        >
            <Box
                sx={{
                    p: "15px",
                }}
                borderBottom={"1px solid"}
                borderColor={"slate-300"}
            >
                <Box display={"flex"} height={"fit"}>
                    <Typography
                        variant="body2"
                        color="initial"
                        fontWeight={600}
                    >
                        {title}
                    </Typography>
                    {formType == "create" && (
                        <Typography color="red">&nbsp; *</Typography>
                    )}
                    {isRequired && (
                        <Typography color="red">&nbsp; *</Typography>
                    )}
                </Box>
                {formType == "edit" && (
                    <FormHelperText>
                        Kosongkan jika tidak ingin mengganti
                    </FormHelperText>
                )}
                {errors.applicant_sign && (
                    <InputErrorMessage px={0}>
                        {errors.applicant_sign}
                    </InputErrorMessage>
                )}
                {emptySignature && (
                    <InputErrorMessage px={0}>
                        Anda Belum Tanda Tangan
                    </InputErrorMessage>
                )}
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
                <ReactSignatureCanvas
                    ref={(ref) => {
                        setSignatur(ref);
                    }}
                    penColor="black"
                    backgroundColor="#F4F6F8"
                    canvasProps={{
                        width: 300,
                        height: 200,
                        className: "sigCanvas",
                    }}
                />
            </Box>
            <Box>
                <ButtonGroup variant="contained" color="slate-300" fullWidth>
                    <Button onClick={clearSignatur}>Bersihkan</Button>
                    <Button onClick={saveSignature}>Simpan</Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
}
