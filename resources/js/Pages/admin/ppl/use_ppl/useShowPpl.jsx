import { useRef, useState } from "react";
import { router } from "@inertiajs/react";

export default function useShowPpl({ ppl }) {
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
            route("admin.ppl.delete", {
                ppl: ppl.id,
            })
        );
        setConfirmDelete(false);
    };

    // print pdf
    const componentRefIntro = useRef();
    const componentRefMentor = useRef();
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
        componentRefIntro,
        componentRefMentor,
        hodSignature,
        setHodSignature,
        showPDF,
        handleClickShowPDF,
        handleCloseShowPDF,
    };
}
