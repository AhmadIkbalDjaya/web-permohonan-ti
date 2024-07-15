import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { IoMdClose } from "react-icons/io";
import AppInputLabel from "../elements/input/AppInputLabel";
import InputErrorMessage from "../elements/input/InputErrorMessage";

export default function FileRequirementFormModal({
    formValues,
    handleChangeForm,
    handleCloseForm,
    errors,
    handleSubmitForm,
}) {
    return (
        <Dialog
            open={formValues.modal_open}
            onClose={handleCloseForm}
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant="" color="initial">
                        {formValues.form_type == "update" ? "Edit" : "Tambah"}{" "}
                        Berkas
                    </Typography>
                    <IoMdClose
                        style={{ cursor: "pointer" }}
                        onClick={handleCloseForm}
                    />
                </Box>
            </DialogTitle>
            <DialogContent>
                <AppInputLabel label="Nama Berkas" required />
                <TextField
                    id="name"
                    name="name"
                    type="string"
                    value={formValues.name}
                    onChange={handleChangeForm}
                    placeholder="Masukkan Nama Berkas"
                    fullWidth
                    error={errors.name ? true : false}
                    helperText={errors.name ?? ""}
                />
                <AppInputLabel label="Status" required />
                <Select
                    id="is_required"
                    name="is_required"
                    value={formValues.is_required}
                    onChange={handleChangeForm}
                    displayEmpty
                    error={errors.is_required ? true : false}
                    fullWidth
                    sx={{ textTransform: "capitalize" }}
                >
                    <MenuItem value="" disabled>
                        <Typography
                            variant="body2"
                            color="#ababab"
                            fontWeight={"600"}
                            display={"flex"}
                        >
                            Pilih Status
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        value={1}
                        sx={{
                            textTransform: "capitalize",
                        }}
                    >
                        Wajib
                    </MenuItem>
                    <MenuItem
                        value={0}
                        sx={{
                            textTransform: "capitalize",
                        }}
                    >
                        Opsinal
                    </MenuItem>
                </Select>
                {errors.is_required && (
                    <InputErrorMessage>{errors.is_required}</InputErrorMessage>
                )}
            </DialogContent>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                mx={2}
                mb={2}
            >
                <Button
                    color="error"
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    onClick={handleCloseForm}
                >
                    Cancel
                </Button>
                <Button
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitForm}
                >
                    Simpan
                </Button>
            </Box>
        </Dialog>
    );
}
