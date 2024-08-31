import { router } from "@inertiajs/react";
import pickBy from "lodash.pickby";
import { useEffect, useRef, useState } from "react";

export default function useIndexProposal({ meta, proposal_ids }) {
    const [loading, setloading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState({
        open: false,
        id: "",
    });
    const [selectedItems, setSelectedItems] = useState([]);
    const [openConfirmDeletes, setOpenConfirmDeletes] = useState(false);

    const perpage = useRef(meta.perpage);
    const search = useRef(meta.search ?? "");
    const page = useRef(meta.page);

    // Ensure current page is valid
    useEffect(() => {
        if (page.current > meta.total_page) {
            page.current = meta.total_page;
            getData();
        }
    }, [meta.total_page]);

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

    const handleOpenDelete = (id) =>
        setConfirmDelete({
            open: true,
            id,
        });

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
        handleCloseDelete();
    };

    const handleCheckAllBox = (e) =>
        setSelectedItems(e.target.checked ? [...proposal_ids] : []);
    const handleCheckBox = (e) => {
        const isSelected = e.target.checked;
        const value = parseInt(e.target.value);
        setSelectedItems((prev) =>
            isSelected
                ? [...selectedItems, value]
                : prev.filter((id) => id != value)
        );
    };
    const handleOpenConfirmDeletes = () => setOpenConfirmDeletes(true);
    const handleCloseConfirmDeletes = () => setOpenConfirmDeletes(false);

    const handleMultiDelete = () => {
        router.delete(route("admin.proposal.destroys"), {
            data: {
                ids: selectedItems,
            },
        });
        setSelectedItems([]);
        handleCloseConfirmDeletes(false);
    };

    return {
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
    };
}
