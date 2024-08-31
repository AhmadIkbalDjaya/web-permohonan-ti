import React from "react";
import { Head, router } from "@inertiajs/react";
import { Box, Button, Typography } from "@mui/material";
import { FaFileAlt } from "react-icons/fa";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ResultDataTable from "../components/result/index/ResultDataTable";
import SearchFormTable from "../components/SearchFormTable";
import ButtonCreateData from "../components/ButtonCreateData";
import EmptyData from "../components/EmptyData";
import useIndexResult from "./use_result/useIndexResult";
import ButtonDeletesData from "../components/ButtonDeletesData";

export default function Result({ results, meta, result_ids }) {
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
    } = useIndexResult({ meta, result_ids });
    return (
        <>
            <Head title="Result" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.result.index")} color="black">
                        Hasil
                    </AppLink>
                </AppBreadcrumbs>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={1}
                    mt={1}
                    mb={5}
                >
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                        <Typography variant="h5" fontWeight={"600"}>
                            Permohonan Hasil
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
                    <AppLink href={route("admin.result.file_requirement")}>
                        <Button
                            variant="contained"
                            startIcon={<FaFileAlt />}
                            size="small"
                            sx={{
                                textTransform: "none",
                            }}
                        >
                            Berkas Permohonan
                        </Button>
                    </AppLink>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} my={1}>
                    <ButtonCreateData
                        text={"Permohonan"}
                        handleClick={() => {
                            router.get(route("admin.result.create"));
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
                    <ResultDataTable
                        results={results}
                        meta={meta}
                        handleChangePage={handleChangePage}
                        handleChangePerpage={handleChangePerpage}
                        handleOpenDelete={handleOpenDelete}
                        selectedItems={selectedItems}
                        handleCheckBox={handleCheckBox}
                        handleCheckAllBox={handleCheckAllBox}
                        total_items_count={result_ids.length}
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
