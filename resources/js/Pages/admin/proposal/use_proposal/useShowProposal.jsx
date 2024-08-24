import { useRef, useState } from "react";
import { router } from "@inertiajs/react";

export default function useShowProposal({ proposal }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const handleOpenDelete = (id) => {
        setConfirmDelete(true);
    };
    const handleCloseDelete = () => {
        setConfirmDelete(false);
    };
    const handleDeleteData = () => {
        router.delete(
            route("admin.proposal.destroy", {
                proposal: proposal.id,
            })
        );
        setConfirmDelete(false);
    };

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
        showPDF,
        handleClickShowPDF,
        handleCloseShowPDF,
        confirmDelete,
        handleOpenDelete,
        handleCloseDelete,
        handleDeleteData,
        hodSignature,
        setHodSignature,
        componentRef,
    };
}
