import React from "react";
import { Head, router } from "@inertiajs/react";
import { Box, Button, Typography } from "@mui/material";
import { FaFileAlt } from "react-icons/fa";
import BaseLayout from "../base_layout/BaseLayout";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ButtonCreateData from "../components/ButtonCreateData";
import SearchFormTable from "../components/SearchFormTable";
import ComprehensiveDataTable from "../components/comprehensive/index/ComprehensiveDataTable";
import EmptyData from "../components/EmptyData";
import useIndexComprehensive from "./use_comprehensive/useIndexComprehensive";

export default function Comprehensive({ comprehensives, meta }) {
    const {
        handleChangePage,
        handleChangePerpage,
        handleChangeSearch,
        confirmDelete,
        handleOpenDelete,
        handleCloseDelete,
        handleDeleteData,
    } = useIndexComprehensive({ meta });
    return (
        <>
            <Head title="Comprehensive" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink
                        href={route("admin.comprehensive.index")}
                        color="black"
                    >
                        Komprehensif
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
                            Permohonan Komprehensif
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
                    <AppLink
                        href={route("admin.comprehensive.file_requirement")}
                    >
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
                            router.get(route("admin.comprehensive.create"));
                        }}
                    />
                    <SearchFormTable
                        value={meta.search}
                        handleChangeSearch={handleChangeSearch}
                    />
                </Box>
                {meta.total_item > 0 ? (
                    <ComprehensiveDataTable
                        comprehensives={comprehensives}
                        meta={meta}
                        handleChangePage={handleChangePage}
                        handleChangePerpage={handleChangePerpage}
                        handleOpenDelete={handleOpenDelete}
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
        </>
    );
}
