import React from "react";
import { Head } from "@inertiajs/react";
import { Box, Typography } from "@mui/material";

import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ButtonCreateData from "../components/ButtonCreateData";
import SearchFormTable from "../components/SearchFormTable";
import FileDataTable from "../components/file_requirement/FileDataTable";
import EmptyData from "../components/EmptyData";
import { convertRequestTypeToID } from "../../../helper/dataToIdHelper";
import FileRequirementFormModal from "../components/file_requirement/FileRequirementFormModal";
import useFileRequirement from "./useFileRequirement";
import ButtonDeletesData from "../components/ButtonDeletesData";

export default function FileRequirement({
    file_requirements,
    meta,
    request_type,
    file_requirement_ids,
}) {
    const {
        errors,
        handleChangePage,
        handleChangePerpage,
        handleChangeSearch,
        formValues,
        handleOpenForm,
        handleCloseForm,
        handleChangeForm,
        handleSubmitForm,
        confirmDelete,
        handleOpenDelete,
        handleCloseDelete,
        handleDeleteData,
        selectedItems,
        handleCheckBox,
        handleCheckAllBox,
        openConfirmDeletes,
        handleClickConfirmDeletes,
        handleMultiDelete,
    } = useFileRequirement({ meta, request_type, file_requirement_ids });
    return (
        <>
            <Head title="Berkas Pemohonan" />
            <BaseLayout>
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
                    <Box display={"flex"}>
                        {selectedItems.length > 0 && (
                            <ButtonDeletesData
                                handleOpenConfirmDeletes={
                                    handleClickConfirmDeletes
                                }
                                selectedItemsCount={selectedItems.length}
                            />
                        )}
                        <SearchFormTable
                            value={meta.search}
                            handleChangeSearch={handleChangeSearch}
                        />
                    </Box>
                </Box>
                {meta.total_item > 0 ? (
                    <FileDataTable
                        file_requirements={file_requirements}
                        meta={meta}
                        handleChangePage={handleChangePage}
                        handleChangePerpage={handleChangePerpage}
                        handleOpenDelete={handleOpenDelete}
                        handleOpenForm={handleOpenForm}
                        selectedItems={selectedItems}
                        handleCheckBox={handleCheckBox}
                        handleCheckAllBox={handleCheckAllBox}
                        total_items_count={file_requirement_ids.length}
                    />
                ) : (
                    <EmptyData />
                )}
            </BaseLayout>
            <FileRequirementFormModal
                formValues={formValues}
                handleChangeForm={handleChangeForm}
                handleCloseForm={handleCloseForm}
                errors={errors}
                handleSubmitForm={handleSubmitForm}
            />
            <ConfirmDeleteModal
                open={confirmDelete.open}
                handleClose={handleCloseDelete}
                handleDelete={handleDeleteData}
            />
            <ConfirmDeleteModal
                open={openConfirmDeletes}
                handleClose={handleClickConfirmDeletes}
                handleDelete={handleMultiDelete}
            />
        </>
    );
}
