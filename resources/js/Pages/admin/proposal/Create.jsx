import { DocumentsFormCard } from "../components/DocumentsFormCard";
import { SigantureInputCard } from "../components/SigantureInputCard";
import React, { useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head, router, usePage } from "@inertiajs/react";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import ProposalForm from "../components/proposal/ProposalForm";

export default function CreateProposal({
    file_requirements,
    lecturers,
    statuses,
    status_descriptions,
}) {
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
        status_id: "1",
        status_description_id: "",
        letter_number: "",
        letter_date: "",
        chairman_id: "",
        secretary_id: "",
        executor_id: "",

        name: "",
        nim: "",
        pob: "",
        dob: "",
        semester: "",
        phone: "",
        essay_title: "",

        mentor_ids: ["", ""],
        tester_ids: ["", ""],

        date: "",
        time_zone: "wita",
        start_time: "",
        end_time: "",
        location: "",
        files: {},
    });

    function handleChangeForm(e, index = null) {
        const name = e.target.name;
        const value = e.target.value;
        if (["mentor_ids", "tester_ids"].includes(name) && index != null) {
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
        router.post(route("admin.proposal.store"), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
    return (
        <>
            <Head title="Tambah Permohonan Proposal" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.proposal.index")}>
                        Proposal
                    </AppLink>
                    <AppLink
                        href={route("admin.proposal.create")}
                        color="black"
                    >
                        Tambah Permohonan
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
                            Tambah Permohonan
                        </Typography>
                        <Typography variant="caption">
                            Isi Formulir Permohonan Seminar Proposal Baru
                        </Typography>
                    </Box>
                    <Button
                        onClick={handleSubmitForm}
                        variant="contained"
                        size="small"
                        startIcon={<FaPlus />}
                        sx={{
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
                    >
                        <ProposalForm
                            formValues={formValues}
                            handleChangeForm={handleChangeForm}
                            errors={errors}
                            lecturers={lecturers}
                            statuses={statuses}
                            status_descriptions={status_descriptions}
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
                        <SigantureInputCard
                            emptySignature={emptySignature}
                            errors={errors}
                            setSignatur={setSignatur}
                            clearSignatur={clearSignatur}
                            saveSignature={saveSignature}
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
            </BaseLayout>
        </>
    );
}
