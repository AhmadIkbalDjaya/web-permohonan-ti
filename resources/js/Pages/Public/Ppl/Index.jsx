import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Typography, Button, Box, Container } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import PublicBaseLayout from "../base_layout/PublicBaseLayout";
import AppBreadcrumbs from "../../admin/components/elements/AppBreadcrumbs";
import AppLink from "../../admin/components/AppLink";
import { DocumentsFormCard } from "../component/DocumentsFormCard";
import { SignatureFormCard } from "../component/SignatureFormCard";
import PplForm from "./PplForm";

export default function Ppl({ file_requirements }) {
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

    const { errors } = usePage().props;
    const [formValues, setFormValues] = useState({
        start_date: "",
        end_date: "",
        location: "",
        location_address: "",
        student_count: 1,

        names: [""],
        nims: [""],
        pobs: [""],
        dobs: [""],
        semesters: [""],
        phones: [""],
        files: {},
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
        } else if (e.target.type == "file") {
            setFormValues((values) => ({
                ...values,
                files: {
                    ...values.files,
                    [name]: e.target.files[0],
                },
            }));
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
        const formData = new FormData();
        for (const [key, value] of Object.entries(formValues)) {
            if (key == "files") {
                for (const [key, file] of Object.entries(value)) {
                    formData.append(key, file);
                }
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            } else {
                formData.append(key, value);
            }
        }
        router.post(route("ppl.store"), formData, {
            headers: {
                "Content-Type": "multipart/form-formValues",
            },
        });
    }

    return (
        <>
            <Head title="Praktek Kerja Lapangan" />
            <PublicBaseLayout>
                <Container maxWidth="lg" sx={{ marginTop: "85px" }}>
                    <AppBreadcrumbs>
                        <AppLink href={route("home")}>Home</AppLink>
                        <AppLink href={route("home")}>Daftar</AppLink>
                        <AppLink href={route("ppl")} color="black">
                            PPL
                        </AppLink>
                    </AppBreadcrumbs>
                    <Box
                        display={"flex"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                        my={1}
                    >
                        <Box>
                            <Typography variant="h5" fontWeight={"600"}>
                                Buat Permohonan
                            </Typography>
                            <Typography variant="caption">
                                Isi Formulir Permohonan PPL
                            </Typography>
                        </Box>
                        <Button
                            onClick={handleSubmitForm}
                            variant="contained"
                            size="small"
                            startIcon={<FaPlus size={16} />}
                            sx={{
                                textTransform: "none",
                                display: {
                                    xs: "none",
                                    sm: "inherit",
                                },
                            }}
                        >
                            Daftar
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
                            <PplForm
                                formValues={formValues}
                                handleChangeForm={handleChangeForm}
                                errors={errors}
                            />
                        </Box>
                        <Box
                            flex={{
                                xs: "100%",
                                md: 5,
                            }}
                            display={"flex"}
                            flexDirection={"column"}
                            gap={2}
                        >
                            {file_requirements.length > 0 && (
                                <DocumentsFormCard
                                    file_requirements={file_requirements}
                                    handleChangeForm={handleChangeForm}
                                    formValues={formValues}
                                    errors={errors}
                                />
                            )}
                            <SignatureFormCard
                                setSignatur={setSignatur}
                                clearSignatur={clearSignatur}
                                saveSignature={saveSignature}
                                emptySignature={emptySignature}
                                errors={errors}
                            />
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
                </Container>
            </PublicBaseLayout>
        </>
    );
}
