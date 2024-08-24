import React from "react";
import { Head, router } from "@inertiajs/react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { FaFileAlt } from "react-icons/fa";

import BaseLayout from "../base_layout/BaseLayout";
import EmptyData from "../components/EmptyData";
import AppLink from "../components/AppLink";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import SearchFormTable from "../components/SearchFormTable";
import ButtonCreateData from "../components/ButtonCreateData";
import ButtonDeletesData from "../components/ButtonDeletesData";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import ProposalDataTable from "../components/proposal/index/ProposalDataTable";
import useIndexProposal from "./use_proposal/useIndexProposal";

export default function Proposal({ proposals, meta, proposals_ids }) {
    const {
        loading,
        selectedItems,
        confirmDelete,
        openConfirmDeletes,
        handleCloseDelete,
        handleDeleteData,
        handleChangeSearch,
        handleChangePage,
        handleChangePerpage,
        handleOpenConfirmDeletes,
        handleCloseConfirmDeletes,
        handleMultiDelete,
        handleOpenDelete,
        handleCheckBox,
        handleCheckAllBox,
    } = useIndexProposal({
        meta,
        proposals_ids,
    });
    return (
        <>
            <Head title="Proposal" />
            <BaseLayout>
                <AppBreadcrumbs>
                    <AppLink href={route("admin.home")}>Home</AppLink>
                    <AppLink href={route("admin.proposal.index")} color="black">
                        Proposal
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
                            Permohonan Proposal
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
                    <AppLink href={route("admin.proposal.file_requirement")}>
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
                        handleClick={() =>
                            router.get(route("admin.proposal.create"))
                        }
                    />
                    <Box display={"flex"}>
                        {selectedItems.length > 0 && (
                            <ButtonDeletesData
                                handleOpenConfirmDeletes={
                                    handleOpenConfirmDeletes
                                }
                                selectedItems={selectedItems}
                            />
                        )}
                        <SearchFormTable
                            value={meta.search}
                            handleChangeSearch={handleChangeSearch}
                        />
                    </Box>
                </Box>
                {meta.total_item > 0 ? (
                    <ProposalDataTable
                        proposals={proposals}
                        meta={meta}
                        handleChangePage={handleChangePage}
                        handleChangePerpage={handleChangePerpage}
                        handleOpenDelete={handleOpenDelete}
                        selectedItems={selectedItems}
                        handleCheckBox={handleCheckBox}
                        handleCheckAllBox={handleCheckAllBox}
                        total_items_count={proposals_ids.length}
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
                handleClose={handleCloseConfirmDeletes}
                handleDelete={handleMultiDelete}
            />
        </>
    );
}
