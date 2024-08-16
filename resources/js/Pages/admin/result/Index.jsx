import React, { useRef, useState } from "react";
import BaseLayout from "../base_layout/BaseLayout";
import { Head, router } from "@inertiajs/react";
import AppBreadcrumbs from "../components/elements/AppBreadcrumbs";
import AppLink from "../components/AppLink";
import { Box, Button, Typography } from "@mui/material";
import { FaFileAlt } from "react-icons/fa";
import pickBy from "lodash.pickby";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ResultDataTable from "../components/result/index/ResultDataTable";
import SearchFormTable from "../components/SearchFormTable";
import ButtonCreateData from "../components/ButtonCreateData";
import EmptyData from "../components/EmptyData";

export default function Result({ results, meta }) {
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
            route("admin.result.delete", {
                result: confirmDelete.id,
            })
        );
        setConfirmDelete({
            open: false,
            id: "",
        });
    };
    return (
        <>
            <Head title="Result" />
            <ConfirmDeleteModal
                open={confirmDelete.open}
                handleClose={handleCloseDelete}
                handleDelete={handleDeleteData}
            />
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
                    <SearchFormTable
                        value={meta.search}
                        handleChangeSearch={handleChangeSearch}
                    />
                </Box>
                {meta.total_item > 0 ? (
                    <ResultDataTable
                        results={results}
                        meta={meta}
                        handleChangePage={handleChangePage}
                        handleChangePerpage={handleChangePerpage}
                        handleOpenDelete={handleOpenDelete}
                    />
                ) : (
                    <EmptyData />
                )}
            </BaseLayout>
            ;
        </>
    );
}
