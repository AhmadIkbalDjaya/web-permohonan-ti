import { Head, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import {
    Box,
    Button,
    ButtonGroup,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import AppInputLabel from "../components/elements/input/AppInputLabel";
import { themeTextField } from "../../../theme/TextFieldTheme";
import { semesterListItems } from "../components/elements/input/SemesterListItems";
import ReactSignatureCanvas from "react-signature-canvas";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import InputErrorMessage from "../components/elements/input/InputErrorMessage";
import { MdModeEdit } from "react-icons/md";

export default function EditPpl({
    ppl,
    lecturers,
    statuses,
    status_descriptions,
}) {
    const { errors } = usePage().props;
    const [formValues, setFormValues] = useState({
        status_id: ppl.status_id || "",
        status_description_id: ppl.status_description_id || "",
        letter_number_mentor: ppl.letter_number_mentor || "",
        letter_number_introduction: ppl.letter_number_introduction || "",
        letter_date: ppl.letter_date || "",
        addressed_to: ppl.addressed_to || "",
        mentor_id: ppl.mentor_id || "",

        start_date: ppl.start_date,
        end_date: ppl.end_date,
        location: ppl.location,
        location_address: ppl.location_address,
        student_count: ppl.students.length,

        names: ppl.students.map((student) => student.name),
        nims: ppl.students.map((student) => student.nim),
        pobs: ppl.students.map((student) => student.pob),
        dobs: ppl.students.map((student) => student.dob),
        semesters: ppl.students.map((student) => student.semester),
        phones: ppl.students.map((student) => student.phone),

        _method: "PUT",
    });

    function handleChangeForm(e, index = null) {
        const name = e.target.name;
        const value = e.target.value;
        if (
            ["names", "nims", "pobs", "dobs", "semesters", "phones"].includes(
                name
            ) &&
            index != null
        ) {
            setFormValues((values) => {
                const updateArray = [...values[name]];
                updateArray[index] = value;
                return {
                    ...values,
                    [name]: updateArray,
                };
            });
        } else {
            if (name == "student_count") {
                if (value > formValues.student_count) {
                    for (let i = formValues.student_count; i < value; i++) {
                        setFormValues((values) => {
                            let updateNames = [...values.names];
                            updateNames[i] = "";
                            let updateNims = [...values.nims];
                            updateNims[i] = "";
                            let updateDobs = [...values.dobs];
                            updateDobs[i] = "";
                            let updatePobs = [...values.pobs];
                            updatePobs[i] = "";
                            let updateSemesters = [...values.semesters];
                            updateSemesters[i] = "";
                            let updatePhones = [...values.phones];
                            updatePhones[i] = "";
                            return {
                                ...values,
                                names: updateNames,
                                nims: updateNims,
                                dobs: updateDobs,
                                pobs: updatePobs,
                                semesters: updateSemesters,
                                phones: updatePhones,
                            };
                        });
                    }
                }
            }
            setFormValues((values) => {
                return {
                    ...values,
                    [name]: value,
                };
            });
        }
    }
    function handleSubmitForm(e) {
        router.post(route("admin.ppl.update", { ppl: ppl.id }), formValues, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    const [signature, setSignatur] = useState();
    const [emptySignature, setEmptySignature] = useState(false);
    const clearSignatur = () => {
        signature.clear();
    };
    const saveSignature = () => {
        if (signature.isEmpty()) {
            setEmptySignature(true);
        } else {
            setEmptySignature(false);
            const result = signature
                .getTrimmedCanvas()
                .toDataURL("applicant_sign");
            const image = dataURLtoBlob(result);
            setFormValues((values) => {
                return {
                    ...values,
                    applicant_sign: image,
                };
            });
        }
    };
    return (
        <>
            <Head title="Edit PPL" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.ppl.index")}>PPL</AppLink>
                    <AppLink color="black">Edit Permohonan</AppLink>
                </AppBreadcrumbs>
                <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    justifyContent={"space-between"}
                    my={1}
                >
                    <Box>
                        <Typography variant="h5" fontWeight={"600"}>
                            Edit Permohonan
                        </Typography>
                        <Typography variant="caption">
                            Edit Formulir Permohonan PPL
                        </Typography>
                    </Box>
                    <Button
                        onClick={handleSubmitForm}
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<MdModeEdit />}
                        sx={{
                            background: "#B20600",
                            textTransform: "none",
                            display: {
                                xs: "none",
                                sm: "inherit",
                            },
                        }}
                    >
                        Simpan
                    </Button>
                </Box>
                <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    gap={3}
                    sx={{
                        flexWrap: {
                            xs: "wrap",
                            md: "nowrap",
                        },
                    }}
                >
                    <Box
                        flex={{
                            xs: "100%",
                            md: 8,
                        }}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={2}
                    >
                        <Box
                            sx={{
                                background: "white",
                                border: ".5px solid",
                                borderColor: "slate-300",
                                borderRadius: "4px",
                            }}
                        >
                            <Box
                                sx={{ p: "15px" }}
                                borderBottom={"1px solid"}
                                borderColor={"slate-300"}
                                display={"flex"}
                                justifyContent={"space-between"}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: "600" }}
                                >
                                    Data PPL
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: "600" }}
                                >
                                    {ppl.code}
                                </Typography>
                            </Box>
                            <ThemeProvider theme={themeTextField}>
                                <Grid container spacing={2} padding={"15px"}>
                                    <Grid item xs={12} sm={6}>
                                        <AppInputLabel
                                            label="Status Permohonan"
                                            required={true}
                                        />
                                        <Select
                                            id="status_id"
                                            name="status_id"
                                            value={formValues.status_id}
                                            onChange={handleChangeForm}
                                            displayEmpty
                                            error={
                                                errors.status_id ? true : false
                                            }
                                            fullWidth
                                            sx={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            <MenuItem value="" disabled>
                                                <Typography
                                                    variant="body2"
                                                    color="#ababab"
                                                    fontWeight={"600"}
                                                    display={"flex"}
                                                >
                                                    Status Permohonan
                                                </Typography>
                                            </MenuItem>
                                            {statuses.map((status, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={status.id}
                                                    sx={{
                                                        textTransform:
                                                            "capitalize",
                                                    }}
                                                >
                                                    {status.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.status_id && (
                                            <InputErrorMessage>
                                                {errors.status_id}
                                            </InputErrorMessage>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <AppInputLabel label="Deskripsi Status" />
                                        <Select
                                            id="status_description_id"
                                            name="status_description_id"
                                            value={
                                                formValues.status_description_id
                                            }
                                            onChange={handleChangeForm}
                                            displayEmpty
                                            error={
                                                errors.status_description_id
                                                    ? true
                                                    : false
                                            }
                                            fullWidth
                                        >
                                            <MenuItem value="" disabled>
                                                <Typography
                                                    variant="body2"
                                                    color="#ababab"
                                                    fontWeight={"600"}
                                                    display={"flex"}
                                                >
                                                    Deskripsi Status
                                                </Typography>
                                            </MenuItem>
                                            {status_descriptions.map(
                                                (description, index) => {
                                                    if (
                                                        description.status_id ==
                                                        formValues.status_id
                                                    ) {
                                                        return (
                                                            <MenuItem
                                                                key={index}
                                                                value={
                                                                    description.id
                                                                }
                                                                sx={{
                                                                    textTransform:
                                                                        "capitalize",
                                                                }}
                                                            >
                                                                {
                                                                    description.description
                                                                }
                                                            </MenuItem>
                                                        );
                                                    }
                                                }
                                            )}
                                        </Select>
                                        {errors.status_description_id && (
                                            <InputErrorMessage>
                                                {errors.status_description_id}
                                            </InputErrorMessage>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <AppInputLabel label="Nomor Surat Pembimbing" />
                                        <TextField
                                            id="letter_number_mentor"
                                            name="letter_number_mentor"
                                            type="string"
                                            value={
                                                formValues.letter_number_mentor
                                            }
                                            onChange={handleChangeForm}
                                            placeholder="Masukkan Nomor Surat"
                                            fullWidth
                                            error={
                                                errors.letter_number_mentor
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.letter_number_mentor ??
                                                ""
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <AppInputLabel label="Nomor Surat Pengantar" />
                                        <TextField
                                            id="letter_number_introduction"
                                            name="letter_number_introduction"
                                            type="string"
                                            value={
                                                formValues.letter_number_introduction
                                            }
                                            onChange={handleChangeForm}
                                            placeholder="Masukkan Nomor Surat"
                                            fullWidth
                                            error={
                                                errors.letter_number_introduction
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.letter_number_introduction ??
                                                ""
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <AppInputLabel label="Tanggal Surat" />
                                        <TextField
                                            id="letter_date"
                                            name="letter_date"
                                            type="date"
                                            value={formValues.letter_date}
                                            onChange={handleChangeForm}
                                            placeholder="Masukkan Nomor Surat"
                                            fullWidth
                                            error={
                                                errors.letter_date
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.letter_date ?? ""
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <AppInputLabel label="Ditujukan Kepada" />
                                        <TextField
                                            id="addressed_to"
                                            name="addressed_to"
                                            type="string"
                                            value={formValues.addressed_to}
                                            onChange={handleChangeForm}
                                            placeholder="Surat Ditujukan Kepada"
                                            fullWidth
                                            error={
                                                errors.addressed_to
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.addressed_to ?? ""
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            color="initial"
                                            sx={{ fontWeight: "600" }}
                                        >
                                            Data Mahasiswa :
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AppInputLabel
                                            label="Lokasi PPL"
                                            required={true}
                                        />
                                        <TextField
                                            id="location"
                                            name="location"
                                            type="string"
                                            value={formValues.location}
                                            onChange={handleChangeForm}
                                            placeholder="Masukkan Nama Instansi PPL"
                                            fullWidth
                                            error={
                                                errors.location ? true : false
                                            }
                                            helperText={errors.location ?? ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AppInputLabel
                                            label="Alamat Lokasi"
                                            required={true}
                                        />
                                        <TextField
                                            id="location_address"
                                            name="location_address"
                                            type="string"
                                            multiline
                                            rows={2}
                                            value={formValues.location_address}
                                            onChange={handleChangeForm}
                                            placeholder="Masukkan Alamat Lokasi PPL"
                                            fullWidth
                                            error={
                                                errors.location_address
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.location_address ?? ""
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <AppInputLabel
                                            label="Tanggal Mulai"
                                            required={true}
                                        />
                                        <TextField
                                            id="start_date"
                                            name="start_date"
                                            type="date"
                                            value={formValues.start_date}
                                            onChange={handleChangeForm}
                                            fullWidth
                                            error={
                                                errors.start_date ? true : false
                                            }
                                            helperText={errors.start_date ?? ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <AppInputLabel
                                            label="Tanggal Selesai"
                                            required={true}
                                        />
                                        <TextField
                                            id="end_date"
                                            name="end_date"
                                            type="date"
                                            value={formValues.end_date}
                                            onChange={handleChangeForm}
                                            fullWidth
                                            error={
                                                errors.end_date ? true : false
                                            }
                                            helperText={errors.end_date ?? ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <AppInputLabel label="Pembimbing PPL" />
                                        <Select
                                            id="mentor_id"
                                            name="mentor_id"
                                            value={formValues.mentor_id}
                                            onChange={handleChangeForm}
                                            displayEmpty
                                            error={
                                                errors.mentor_id ? true : false
                                            }
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
                                                    Pembimbing
                                                </Typography>
                                            </MenuItem>
                                            {lecturers.map(
                                                (lecturer, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={lecturer.id}
                                                        sx={{
                                                            textTransform:
                                                                "capitalize",
                                                        }}
                                                    >
                                                        {lecturer.name}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        {errors.mentor_id && (
                                            <InputErrorMessage>
                                                {errors.mentor_id}
                                            </InputErrorMessage>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <AppInputLabel
                                            label="Jumlah Mahasiswa PPL"
                                            required={true}
                                        />
                                        <TextField
                                            id="student_count"
                                            name="student_count"
                                            type="number"
                                            value={formValues.student_count}
                                            onChange={handleChangeForm}
                                            inputProps={{
                                                min: 1,
                                                max: 3,
                                            }}
                                            onKeyDown={(e) => {
                                                e.preventDefault();
                                            }}
                                            fullWidth
                                            error={
                                                errors.student_count
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.student_count ?? ""
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </ThemeProvider>
                        </Box>
                        {Array.from(
                            { length: formValues.student_count },
                            (e, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        background: "white",
                                        border: ".5px solid",
                                        borderColor: "slate-300",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="initial"
                                        sx={{ p: "15px", fontWeight: "600" }}
                                        borderBottom={"1px solid"}
                                        borderColor={"slate-300"}
                                    >
                                        Data Mahasiswa Ke-{index + 1}
                                    </Typography>
                                    <ThemeProvider theme={themeTextField}>
                                        <Grid
                                            container
                                            spacing={2}
                                            padding={"15px"}
                                        >
                                            <Grid item xs={12} sm={6}>
                                                <AppInputLabel
                                                    label="Nama"
                                                    required={true}
                                                />
                                                <TextField
                                                    id="name"
                                                    name="names"
                                                    type="string"
                                                    value={
                                                        formValues.names[index]
                                                    }
                                                    onChange={(e) => {
                                                        handleChangeForm(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    placeholder="Masukkan Nama Mahasiswa"
                                                    fullWidth
                                                    error={
                                                        errors[`names.${index}`]
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors[
                                                            `names.${index}`
                                                        ] ?? ""
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AppInputLabel
                                                    label="NIM"
                                                    required={true}
                                                />
                                                <TextField
                                                    id="nim"
                                                    name="nims"
                                                    type="number"
                                                    value={
                                                        formValues.nims[index]
                                                    }
                                                    onChange={(e) => {
                                                        handleChangeForm(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    placeholder="Masukkan NIM"
                                                    fullWidth
                                                    error={
                                                        errors[`nims.${index}`]
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors[
                                                            `nims.${index}`
                                                        ] ?? ""
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AppInputLabel
                                                    label="Tempat Lahir"
                                                    required={true}
                                                />
                                                <TextField
                                                    id="pob"
                                                    name="pobs"
                                                    type="string"
                                                    value={
                                                        formValues.pobs[index]
                                                    }
                                                    onChange={(e) => {
                                                        handleChangeForm(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    placeholder="Masukkan Tempat Lahir"
                                                    fullWidth
                                                    error={
                                                        errors[`pobs.${index}`]
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors[
                                                            `pobs.${index}`
                                                        ] ?? ""
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AppInputLabel
                                                    label="Tanggal Lahir"
                                                    required={true}
                                                />
                                                <TextField
                                                    id="dob"
                                                    name="dobs"
                                                    type="date"
                                                    value={
                                                        formValues.dobs[index]
                                                    }
                                                    onChange={(e) => {
                                                        handleChangeForm(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    placeholder="Masukkan Tanggal Lahir"
                                                    fullWidth
                                                    error={
                                                        errors[`dobs.${index}`]
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors[
                                                            `dobs.${index}`
                                                        ] ?? ""
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AppInputLabel
                                                    label="Semester"
                                                    required={true}
                                                />
                                                <Select
                                                    id="semester"
                                                    name="semesters"
                                                    value={
                                                        formValues.semesters[
                                                            index
                                                        ]
                                                    }
                                                    onChange={(e) => {
                                                        handleChangeForm(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    fullWidth
                                                    displayEmpty
                                                    error={
                                                        errors[
                                                            `semesters.${index}`
                                                        ]
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <MenuItem value="" disabled>
                                                        <Typography
                                                            variant="body2"
                                                            color="#ababab"
                                                            fontWeight={"600"}
                                                            display={"flex"}
                                                        >
                                                            Semester Saat Ini
                                                        </Typography>
                                                    </MenuItem>
                                                    {semesterListItems.map(
                                                        (semester, i) => {
                                                            return (
                                                                <MenuItem
                                                                    key={i}
                                                                    value={
                                                                        semester.value
                                                                    }
                                                                >
                                                                    {
                                                                        semester.body
                                                                    }
                                                                </MenuItem>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                                {errors[
                                                    `semesters.${index}`
                                                ] && (
                                                    <InputErrorMessage>
                                                        {
                                                            errors[
                                                                `semesters.${index}`
                                                            ]
                                                        }
                                                    </InputErrorMessage>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AppInputLabel
                                                    label="Nomor Telepon"
                                                    required={true}
                                                />
                                                <TextField
                                                    id="phone"
                                                    name="phones"
                                                    type="number"
                                                    value={
                                                        formValues.phones[index]
                                                    }
                                                    onChange={(e) => {
                                                        handleChangeForm(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    placeholder="Masukkan Nomor Telepon"
                                                    fullWidth
                                                    error={
                                                        errors[
                                                            `phones.${index}`
                                                        ]
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors[
                                                            `phones.${index}`
                                                        ] ?? ""
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </ThemeProvider>
                                </Box>
                            )
                        )}
                    </Box>
                    <Box
                        flex={{
                            xs: "100%",
                            md: 5,
                        }}
                        sx={{
                            background: "white",
                            border: ".5px solid",
                            borderColor: "slate-300",
                            borderRadius: "4px",
                        }}
                    >
                        <Box
                            sx={{ p: "15px" }}
                            borderBottom={"1px solid"}
                            borderColor={"slate-300"}
                        >
                            <Box display={"flex"} height={"fit"}>
                                <Typography
                                    variant="body2"
                                    color="initial"
                                    fontWeight={600}
                                >
                                    Tanda Tangan Pemohon
                                </Typography>
                            </Box>
                            <FormHelperText>
                                Kosongkan jika tidak ingin mengganti
                            </FormHelperText>
                            {errors.applicant_sign ? (
                                <InputErrorMessage px={0}>
                                    {errors.applicant_sign}
                                </InputErrorMessage>
                            ) : (
                                ""
                            )}
                            {emptySignature ? (
                                <InputErrorMessage px={0}>
                                    Anda Belum Tanda Tangan
                                </InputErrorMessage>
                            ) : (
                                ""
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
                            <ButtonGroup
                                variant="contained"
                                color="slate-300"
                                fullWidth
                            >
                                <Button onClick={clearSignatur}>
                                    Bersihkan
                                </Button>
                                <Button onClick={saveSignature}>Simpan</Button>
                            </ButtonGroup>
                        </Box>
                    </Box>
                    <Box
                        flex={"100%"}
                        display={{
                            sx: "inherit",
                            md: "none",
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={<FaPlus />}
                            fullWidth
                            color="primary"
                            onClick={handleSubmitForm}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Box>
            </BaseLayout>
        </>
    );
}
