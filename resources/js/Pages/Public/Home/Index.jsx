import { HeroSection } from "../component/home/HeroSection";
import { RegisSection } from "../component/home/RegisSection";
import "./style.css";
import useIntersectionObserver from "./animasi";

import React, { useEffect } from "react";
import { Head } from "@inertiajs/react";
import PublicBaseLayout from "../base_layout/PublicBaseLayout";

function Home() {
    const headerRef = useIntersectionObserver({ threshold: 0.5 });
    const cardRefs = useIntersectionObserver({ threshold: 0.1 });

    useEffect(() => {
        const animateOnScroll = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                } else {
                    entry.target.style.opacity = "0";
                    entry.target.style.transform = "translateY(20px)";
                }
            });
        };

        const headerObserver = new IntersectionObserver(animateOnScroll, {
            threshold: 0.5,
        });
        const cardObserver = new IntersectionObserver(animateOnScroll, {
            threshold: 0.1,
        });

        headerRef.current.forEach((el) => {
            if (el) headerObserver.observe(el);
        });

        cardRefs.current.forEach((el) => {
            if (el) cardObserver.observe(el);
        });

        return () => {
            headerObserver.disconnect();
            cardObserver.disconnect();
        };
    }, [headerRef, cardRefs]);
    return (
        <>
            <Head title="TI-UINAM"></Head>
            <PublicBaseLayout>
                <HeroSection headerRef={headerRef} />
                <RegisSection headerRef={headerRef} cardRefs={cardRefs} />
            </PublicBaseLayout>
        </>
    );
}
export default Home;
