import { Head, Link } from "@inertiajs/react";
import { Typography } from "@mui/material";
import React from "react";

export default function Proposal({ file_requirements }) {
    return (
        <>
            <Head title="Proposal" />
            <h1>Proposal</h1>
            {/* {file_requirements.map((file_requiremnt, i)=>{
                return <Typography>{file_requiremnt.name}</Typography>
            })} */}
        </>
    );
}
