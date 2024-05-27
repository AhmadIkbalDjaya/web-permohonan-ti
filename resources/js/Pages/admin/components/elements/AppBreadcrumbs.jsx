import { Breadcrumbs } from "@mui/material";
import React from "react";
import { MdNavigateNext } from "react-icons/md";

export default function AppBreadcrumbs({ children }) {
    return (
        <Breadcrumbs
            separator={<MdNavigateNext style={{ marginTop: "3px" }} />}
        >
            {children}
        </Breadcrumbs>
    );
}
