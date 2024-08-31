import { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";
import pickBy from "lodash.pickby";

export default function useIndexLecturer({ meta, lecturer_ids }) {
    const [loading, setloading] = useState(false);
    // pagination & search
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

    // delete data
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
            route("admin.lecturer.destroy", {
                lecturer: confirmDelete.id,
            })
        );
        setConfirmDelete({
            open: false,
            id: "",
        });
    };

    // select item
    const [selectedItems, setSelectedItems] = useState([]);
    const handleCheckBox = (e) => {
        const isSelected = e.target.checked;
        const value = parseInt(e.target.value);
        setSelectedItems((prev) =>
            isSelected
                ? [...selectedItems, value]
                : prev.filter((id) => id != value)
        );
    };
    const handleCheckAllBox = (e) =>
        setSelectedItems(e.target.checked ? [...lecturer_ids] : []);

    // delete selected item
    const [openConfirmDeletes, setOpenConfirmDeletes] = useState(false);
    const handleClickConfirmDeletes = () =>
        setOpenConfirmDeletes(!openConfirmDeletes);
    const handleMultiDelete = () => {
        router.delete(route("admin.result.destroys"), {
            data: {
                ids: selectedItems,
            },
            onSuccess: () => {
                setSelectedItems([]);
                handleClickConfirmDeletes();
            },
        });
    };

    return {
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
    };
}
