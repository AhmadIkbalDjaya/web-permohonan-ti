import { EmptyData } from "../components/EmptyData";
import React, { useRef, useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head, router } from "@inertiajs/react";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import Typography from "@mui/material/Typography";
import { Box, Button, IconButton } from "@mui/material";
import { FaFileAlt } from "react-icons/fa";
import pickBy from "lodash.pickby";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ProposalDataTable from "../components/proposal/index/ProposalDataTable";
import SearchFormTable from "../components/SearchFormTable";
import ButtonCreateData from "../components/ButtonCreateData";
import { MdDelete, MdMoreVert } from "react-icons/md";

export default function Proposal({ proposals, meta, proposals_ids }) {
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
    if (page.current > meta.total_page) {
        page.current = meta.total_page;
        getData();
    }

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
            route("admin.proposal.destroy", {
                proposal: confirmDelete.id,
            })
        );
        setConfirmDelete({
            open: false,
            id: "",
        });
    };

    const [selectedItems, setSelectedItems] = useState([]);
    const handleCheckAllBox = (e) => {
        const isSelected = e.target.checked;
        if (isSelected) {
            setSelectedItems([...proposals_ids]);
        } else {
            setSelectedItems([]);
        }
    };
    const handleCheckBox = (e) => {
        const isSelected = e.target.checked;
        const value = parseInt(e.target.value);
        if (isSelected) {
            setSelectedItems([...selectedItems, value]);
        } else {
            setSelectedItems((prevData) => {
                return prevData.filter((id) => id != value);
            });
        }
    };
    const [openConfirmDeletes, setOpenConfirmDeletes] = useState(false);
    const handleOpenConfirmDeletes = () => {
        setOpenConfirmDeletes(true);
    };
    const handleCloseConfirmDeletes = () => {
        setOpenConfirmDeletes(false);
    };
    const handleMultiDelete = () => {
        router.delete(route("admin.proposal.destroys"), {
            data: {
                ids: selectedItems,
            },
        });
        setSelectedItems([]);
        handleCloseConfirmDeletes(false);
    };
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
                        handleClick={() => {
                            router.get(route("admin.proposal.create"));
                        }}
                    />
                    <Box display={"flex"}>
                        {selectedItems.length > 0 && (
                            <IconButton
                                onClick={handleOpenConfirmDeletes}
                                sx={{ py: "0" }}
                            >
                                <MdDelete size={20} />
                            </IconButton>
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
