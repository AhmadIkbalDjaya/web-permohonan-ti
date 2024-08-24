import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import dataURLtoBlob from "blueimp-canvas-to-blob";

export default function useCreateLecturer() {
    const { errors } = usePage().props;
    // form
    const [formValues, setFormValues] = useState({
        name: "",
        nip: "",
        gender: "",
        role: "",
    });
    const handleChangeForm = (e, index = null) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues((values) => ({
            ...values,
            [name]: value,
        }));
    };
    const handleSubmitForm = (e) => {
        router.post(route("admin.lecturer.store"), formValues);
    };

    // signature
    const [signature, setSignatur] = useState();
    const [emptySignature, setEmptySignature] = useState(false);
    const clearSignatur = () => {
        signature.clear();
    };
    const saveSignature = () => {
        if (signature.isEmpty()) {
            setEmptySignature(true);
        } else {
            setEmptySignature(false);
            const result = signature
                .getTrimmedCanvas()
                .toDataURL("applicant_sign");
            const image = dataURLtoBlob(result);
            setFormValues((values) => {
                return {
                    ...values,
                    signature: image,
                };
            });
        }
    };

    return {
        errors,
        formValues,
        handleChangeForm,
        handleSubmitForm,
        setSignatur,
        emptySignature,
        clearSignatur,
        saveSignature,
    };
}
