import { Head, router, usePage } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import { Box, Typography } from "@mui/material";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import pickBy from "lodash.pickby";
import ButtonCreateData from "../components/ButtonCreateData";
import SearchFormTable from "../components/SearchFormTable";
import FileDataTable from "../components/file_requirement/FileDataTable";
import { EmptyData } from "../components/EmptyData";
import { convertRequestTypeToID } from "../../../helper/dataToIdHelper";
import FileRequirementFormModal from "../components/file_requirement/FileRequirementFormModal";

export default function FileRequirement({
    file_requirements,
    meta,
    request_type,
}) {
    const [loading, setloading] = useState(false);
    const perpage = useRef(meta.perpage);
    const search = useRef(meta.search ?? "");
    const page = useRef(meta.page);

    const handleChangePerpage = (e) => {
        perpage.current = e.target.value;
        getData();
    };
    const handleChangeSearch = (e) => {
        search.current = e.target.value;
        if (meta.search == "" && search.current != "") {
            page.current = 1;
        }
        getData();
    };
    const handleChangePage = (e, value) => {
        page.current = value;
        getData();
    };

    const { errors } = usePage().props;
    const [formValues, setFormValues] = useState({
        modal_open: false,
        form_type: "create",
        id: "",
        name: "",
        is_required: "",
    });
    const handleOpenForm = ({
        form_type = "create",
        id = "",
        name = "",
        is_required = "",
    }) => {
        setFormValues({
            modal_open: true,
            form_type,
            id,
            name,
            is_required,
        });
    };
    const handleCloseForm = () => {
        setFormValues({
            modal_open: false,
            form_type: "create",
            id: "",
            name: "",
            is_required: "",
        });
    };
    const handleChangeForm = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues((values) => ({
            ...values,
            [name]: value,
        }));
    };
    const handleSubmitForm = (e) => {
        if (formValues.form_type == "update") {
            router.post(
                route("admin.file-requirement.update", {
                    file_requirement: formValues.id,
                }),
                {
                    ...formValues,
                    request_type,
                    _method: "PUT",
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        setFormValues({
                            modal_open: false,
                            form_type: "create",
                            id: "",
                            name: "",
                            is_required: "",
                        });
                    },
                }
            );
        } else {
            router.post(
                route("admin.file-requirement.store"),
                {
                    ...formValues,
                    request_type,
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        setFormValues({
                            modal_open: false,
                            form_type: "create",
                            id: "",
                            name: "",
                            is_required: "",
                        });
                    },
                }
            );
        }
    };

    const [confirmDelete, setConfirmDelete] = useState({
        open: false,
        id: "",
    });
    const handleOpenDelete = (id) => {
        setConfirmDelete({
            open: true,
            id,
        });
    };
    const handleCloseDelete = () => {
        setConfirmDelete({
            open: false,
            id: "",
        });
    };
    const handleDeleteData = () => {
        router.delete(
            route("admin.file-requirement.delete", {
                file_requirement: confirmDelete.id,
            })
        );
        setConfirmDelete({
            open: false,
            id: "",
        });
    };

    const getData = () => {
        setloading(true);
        router.get(
            route(route().current()),
            pickBy({
                perpage: perpage.current != 10 ? perpage.current : undefined,
                search: search.current,
                page: page.current != 1 ? page.current : undefined,
            }),
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setloading(false),
            }
        );
    };
    return (
        <>
            <Head title="Berkas Pemohonan" />
            <ConfirmDeleteModal
                open={confirmDelete.open}
                handleClose={handleCloseDelete}
                handleDelete={handleDeleteData}
            />
            <BaseLayout>
                <FileRequirementFormModal
                    formValues={formValues}
                    handleChangeForm={handleChangeForm}
                    handleCloseForm={handleCloseForm}
                    errors={errors}
                    handleSubmitForm={handleSubmitForm}
                />
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route(`admin.${request_type}.index`)}>
                        {convertRequestTypeToID(request_type)}
                    </AppLink>
                    <AppLink
                        href={route(`admin.${request_type}.file_requirement`)}
                        color="black"
                    >
                        Berkas Pemohonan
                    </AppLink>
                </AppBreadcrumbs>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                    mt={1}
                    mb={5}
                >
                    <Typography variant="h5" fontWeight={"600"}>
                        Berkas Permohonan {convertRequestTypeToID(request_type)}
                    </Typography>
                    <Typography
                        variant="caption"
                        fontWeight={"600"}
                        color={"#637381"}
                        border={1.5}
                        borderColor={"#637381"}
                        padding={"0px 5px"}
                        borderRadius={10}
                    >
                        {meta.total_item}
                    </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} my={1}>
                    <ButtonCreateData
                        text={"Berkas"}
                        handleClick={handleOpenForm}
                    />
                    <SearchFormTable
                        value={meta.search}
                        handleChangeSearch={handleChangeSearch}
                    />
                </Box>
                {meta.total_item > 0 ? (
                    <FileDataTable
                        file_requirements={file_requirements}
                        meta={meta}
                        handleChangePage={handleChangePage}
                        handleChangePerpage={handleChangePerpage}
                        handleOpenDelete={handleOpenDelete}
                        handleOpenForm={handleOpenForm}
                    />
                ) : (
                    <EmptyData />
                )}
            </BaseLayout>
        </>
    );
}
