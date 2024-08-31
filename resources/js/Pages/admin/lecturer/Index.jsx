import React from "react";
import { Head, router } from "@inertiajs/react";
import { Box, Typography } from "@mui/material";

import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ButtonCreateData from "../components/ButtonCreateData";
import SearchFormTable from "../components/SearchFormTable";
import LecturerDataTable from "../components/lecturer/index/LecturerDataTable";
import EmptyData from "../components/EmptyData";
import useIndexLecturer from "./use_lecturer/useIndexLecturer";
import ButtonDeletesData from "../components/ButtonDeletesData";

export default function Lecturer({ meta, lecturers, lecturer_ids }) {
    const {
        handleChangePage,
        handleChangePerpage,
        handleChangeSearch,
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
    } = useIndexLecturer({ meta, lecturer_ids });
    return (
        <>
            <Head title="Dosen & Staff" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.lecturer.index")} color="black">
                        Dosen & Staff
                    </AppLink>
                </AppBreadcrumbs>
                <Box display={"flex"} alignItems={"center"} gap={1} mt={1}>
                    <Typography variant="h5" fontWeight={"600"}>
                        Dosen & Staff
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
                        text={"Dosen"}
                        handleClick={() => {
                            router.get(route("admin.lecturer.create"));
                        }}
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
                    <LecturerDataTable
                        lecturers={lecturers}
                        meta={meta}
                        handleChangePage={handleChangePage}
                        handleChangePerpage={handleChangePerpage}
                        handleOpenDelete={handleOpenDelete}
                        selectedItems={selectedItems}
                        handleCheckBox={handleCheckBox}
                        handleCheckAllBox={handleCheckAllBox}
                        total_items_count={lecturer_ids.length}
                    />
                ) : (
                    <EmptyData />
                )}
            </BaseLayout>
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
