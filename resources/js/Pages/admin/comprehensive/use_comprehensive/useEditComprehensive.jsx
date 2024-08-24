import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import dataURLtoBlob from "blueimp-canvas-to-blob";

export default function useEditComprehensive({ comprehensive }) {
    const { errors } = usePage().props;
    // form
    const [formValues, setFormValues] = useState({
        status_id: comprehensive.status ? comprehensive.status.id : "",
        status_description_id: comprehensive.status_description
            ? comprehensive.status_description.id
            : "",
        letter_number: comprehensive.letter_number || "",
        letter_date: comprehensive.letter_date || "",
        chairman_id: comprehensive.chairman ? comprehensive.chairman.id : "",
        secretary_id: comprehensive.secretary ? comprehensive.secretary.id : "",

        name: comprehensive.student.name,
        nim: comprehensive.student.nim,
        pob: comprehensive.student.pob,
        dob: comprehensive.student.dob,
        semester: comprehensive.student.semester,
        phone: comprehensive.student.phone,
        essay_title: comprehensive.essay_title,
        tester_ids: comprehensive.testers.map(
            (tester) => tester.lecturer_id || ""
        ),
        files: {},
        _method: "PUT",
    });
    function handleChangeForm(e, index = null) {
        const name = e.target.name;
        const value = e.target.value;
        if (["tester_ids"].includes(name) && index != null) {
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
        router.post(
            route("admin.comprehensive.update", {
                comprehensive: comprehensive.id,
            }),
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    }

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
                    applicant_sign: image,
                };
            });
        }
    };

    // preview pdf file
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
        errors,
        formValues,
        handleChangeForm,
        handleSubmitForm,
        setSignatur,
        emptySignature,
        clearSignatur,
        saveSignature,
        showPDF,
        handleClickShowPDF,
        handleCloseShowPDF,
    };
}
