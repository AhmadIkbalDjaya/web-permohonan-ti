import { router, usePage } from "@inertiajs/react";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import { useState } from "react";

export default function useCreateProposal() {
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
                    applicant_sign: image,
                };
            });
        }
    };

    const { errors } = usePage().props;
    const [formValues, setFormValues] = useState({
        status_id: "1",
        status_description_id: "",
        letter_number: "",
        letter_date: "",
        chairman_id: "",
        secretary_id: "",
        executor_id: "",

        name: "",
        nim: "",
        pob: "",
        dob: "",
        semester: "",
        phone: "",
        essay_title: "",

        mentor_ids: ["", ""],
        tester_ids: ["", ""],

        date: "",
        time_zone: "wita",
        start_time: "",
        end_time: "",
        location: "",
        files: {},
    });

    function handleChangeForm(e, index = null) {
        const name = e.target.name;
        const value = e.target.value;
        if (["mentor_ids", "tester_ids"].includes(name) && index != null) {
            setFormValues((values) => {
                const updateArray = [...values[name]];
                updateArray[index] = value;
                return {
                    ...values,
                    [name]: updateArray,
                };
            });
        } else if (e.target.type == "file") {
            setFormValues((values) => ({
                ...values,
                files: {
                    ...values.files,
                    [name]: e.target.files[0],
                },
            }));
        } else {
            setFormValues((values) => ({
                ...values,
                [name]: value,
            }));
        }
    }
    function handleSubmitForm(e) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(formValues)) {
            if (key == "files") {
                for (const [key, file] of Object.entries(value)) {
                    formData.append(key, file);
                }
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            } else {
                formData.append(key, value);
            }
        }
        router.post(route("admin.proposal.store"), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
    return {
        formValues,
        handleChangeForm,
        handleSubmitForm,
        errors,
        setSignatur,
        saveSignature,
        clearSignatur,
        emptySignature,
    };
}
