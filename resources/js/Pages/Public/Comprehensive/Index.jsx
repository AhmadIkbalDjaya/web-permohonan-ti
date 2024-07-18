import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Container, Button, Box, Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import PublicBaseLayout from "../base_layout/PublicBaseLayout";
import AppBreadcrumbs from "../../admin/components/elements/AppBreadcrumbs";
import AppLink from "../../admin/components/AppLink";
import { DocumentsFormCard } from "../component/DocumentsFormCard";
import { SignatureFormCard } from "../component/SignatureFormCard";
import ComprehensiveForm from "./ComprehensiveForm";

export default function Kompren({ file_requirements }) {
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
        name: "",
        nim: "",
        pob: "",
        dob: "",
        semester: "",
        phone: "",
        essay_title: "",
        files: {},
    });

    function handleChangeForm(e, index = null) {
        const name = e.target.name;
        const value = e.target.value;
        if (["mentors", "testers"].includes(name) && index != null) {
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
            setFormValues((values) => ({
                ...values,
                [name]: value,
            }));
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
        router.post(route("comprehensive.store"), formData, {
            headers: {
                "Content-Type": "multipart/form-formValues",
            },
        });
    }

    return (
        <>
            <Head title="Komprehensif" />
            <PublicBaseLayout>
                <Container maxWidth="lg" sx={{ marginTop: "85px" }}>
                    <AppBreadcrumbs>
                        <AppLink href={route("home")}>Home</AppLink>
                        <AppLink href={route("home")}>Daftar</AppLink>
                        <AppLink href={route("comprehensive")} color="black">
                            Kompren
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
                                Isi Formulir Permohonan Ujian Komprehensif
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
                        >
                            <ComprehensiveForm
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
                                onClick={handleSubmitForm}
                                variant="contained"
                                startIcon={<FaPlus size={16} />}
                                size="small"
                                fullWidth
                                sx={{
                                    textTransform: "none",
                                }}
                            >
                                Daftar
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </PublicBaseLayout>
        </>
    );
}
