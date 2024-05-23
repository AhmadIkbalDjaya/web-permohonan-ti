import { Link } from "@inertiajs/react";
import React from "react";

export default function AppLink(props) {
    return (
        <Link
            {...props}
            style={{
                textDecoration: "none",
                fontWeight: props.fontWeight ?? "700",
                fontSize: props.fontSize ?? "12px",
                color: props.color ?? "#C4CDD5",
            }}
        >
            {props.children}
        </Link>
    );
}
