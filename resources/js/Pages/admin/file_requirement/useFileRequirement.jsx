import { useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import pickBy from "lodash.pickby";

export default function useFileRequirement({ meta }) {
    const [loading, setloading] = useState(false);
    const { errors } = usePage().props;
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

    // form
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

    // delete
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

    return {
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
    };
}
