import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import DrawerOpenContextProvider from "./context/DrawerOpen";
import { ThemeProvider } from "@mui/material";
import appTheme from "./theme/AppTheme";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider theme={appTheme}>
                <DrawerOpenContextProvider>
                    <App {...props} />
                </DrawerOpenContextProvider>
            </ThemeProvider>
        );
    },
    title: (title) => `${title}`,
});
