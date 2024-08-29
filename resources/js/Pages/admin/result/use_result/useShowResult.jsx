import { useRef, useState } from "react";
import { router } from "@inertiajs/react";

export default function useShowResult({ result }) {
    // delete data
    const [confirmDelete, setConfirmDelete] = useState(false);
    const handleOpenDelete = (id) => {
        setConfirmDelete(true);
    };
    const handleCloseDelete = () => {
        setConfirmDelete(false);
    };
    const handleDeleteData = () => {
        router.delete(
            route("admin.result.destroy", {
                result: result.id,
            })
        );
        setConfirmDelete(false);
    };

    // print pdf
    const componentRef = useRef();
    const [hodSignature, setHodSignature] = useState(false);

    const [showPDF, setShowPDF] = useState({
        open: false,
        name: "",
        file: "",
    });

    const handleClickShowPDF = (name, file) => {
        setShowPDF({
            open: true,
            name,
            file,
        });
    };
    const handleCloseShowPDF = () => {
        setShowPDF({
            open: false,
            name: "",
            file: "",
        });
    };
    return {
        confirmDelete,
        handleOpenDelete,
        handleCloseDelete,
        handleDeleteData,
        componentRef,
        hodSignature,
        setHodSignature,
        showPDF,
        handleClickShowPDF,
        handleCloseShowPDF,
    };
}
