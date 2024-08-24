import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import dataURLtoBlob from "blueimp-canvas-to-blob";

export default function useEditResult({ result }) {
    const { errors } = usePage().props;
    // form
    const [formValues, setFormValues] = useState({
        status_id: result.status ? result.status.id : "",
        status_description_id: result.status_description
            ? result.status_description.id
            : "",
        letter_number: result.letter_number || "",
        letter_date: result.letter_date || "",
        chairman_id: result.chairman ? result.chairman.id : "",
        secretary_id: result.secretary ? result.secretary.id : "",
        executor_id: result.executor ? result.executor.id : "",

        name: result.student.name,
        nim: result.student.nim,
        pob: result.student.pob,
        dob: result.student.dob,
        semester: result.student.semester,
        phone: result.student.phone,
        essay_title: result.essay_title,
        mentor_ids: result.mentors.map((mentor) => mentor.lecturer_id || ""),
        tester_ids: result.testers.map((tester) => tester.lecturer_id || ""),
        date: result.schedule.date || "",
        time_zone: result.schedule.time_zone,
        start_time: result.schedule.start_time
            ? result.schedule.start_time.slice(0, 5)
            : "",
        end_time: result.schedule.end_time
            ? result.schedule.end_time.slice(0, 5)
            : "",
        location: result.schedule.location || "",
        files: {},
        _method: "PUT",
    });

    function handleChangeForm(e, index = null) {
        const name = e.target.name;
        const value = e.target.value;
        if (["mentors", "testers"].includes(name) && index != null) {
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
            route("admin.result.update", { result: result.id }),
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

    // preview file
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
