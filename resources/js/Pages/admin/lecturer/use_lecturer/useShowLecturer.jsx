import { router } from "@inertiajs/react";
import { useState } from "react";

export default function useShowLecturer({ lecturer }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const handleOpenDelete = (id) => {
        setConfirmDelete(true);
    };
    const handleCloseDelete = () => {
        setConfirmDelete(false);
    };
    const handleDeleteData = () => {
        router.delete(
            route("admin.lecturer.destroy", {
                lecturer: lecturer.id,
            })
        );
        setConfirmDelete(false);
    };
    return {
        confirmDelete,
        handleOpenDelete,
        handleCloseDelete,
        handleDeleteData,
    };
}
