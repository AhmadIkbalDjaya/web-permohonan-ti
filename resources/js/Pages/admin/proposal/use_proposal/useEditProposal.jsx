import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import dataURLtoBlob from "blueimp-canvas-to-blob";

export default function useEditProposal({ proposal }) {
    const { errors } = usePage().props;
    const [formValues, setFormValues] = useState({
        status_id: proposal.status ? proposal.status.id : "",
        status_description_id: proposal.status_description
            ? proposal.status_description.id
            : "",
        letter_number: proposal.letter_number || "",
        letter_date: proposal.letter_date || "",
        chairman_id: proposal.chairman ? proposal.chairman.id : "",
        secretary_id: proposal.secretary ? proposal.secretary.id : "",
        executor_id: proposal.executor ? proposal.executor.id : "",

        name: proposal.student.name,
        nim: proposal.student.nim,
        pob: proposal.student.pob,
        dob: proposal.student.dob,
        semester: proposal.student.semester,
        phone: proposal.student.phone,
        essay_title: proposal.essay_title,
        mentor_ids: proposal.mentors.map((mentor) => mentor.lecturer_id || ""),
        tester_ids: proposal.testers.map((tester) => tester.lecturer_id || ""),
        date: proposal.schedule.date || "",
        time_zone: proposal.schedule.time_zone,
        start_time: proposal.schedule.start_time
            ? proposal.schedule.start_time.slice(0, 5)
            : "",
        end_time: proposal.schedule.end_time
            ? proposal.schedule.end_time.slice(0, 5)
            : "",
        location: proposal.schedule.location || "",
        files: {},
        _method: "PUT",
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
        router.post(
            route("admin.proposal.update", { proposal: proposal.id }),
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    }
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
        saveSignature,
        clearSignatur,
        emptySignature,
        showPDF,
        handleCloseShowPDF,
        handleClickShowPDF,
    };
}
