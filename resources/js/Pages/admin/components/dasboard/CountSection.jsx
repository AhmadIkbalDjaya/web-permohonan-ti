import { Box } from "@mui/material";
import React from "react";
import { CountCard } from "./CountCard";
import { RiArticleFill, RiComputerFill } from "react-icons/ri";
import { MdArticle } from "react-icons/md";
import { HiClipboardDocumentList } from "react-icons/hi2";
export function CountSection({ count }) {
    return (
        <Box
            mt={3}
            display={{
                xs: "block",
                md: "flex",
            }}
            columnGap={3}
            rowGap={3}
            justifyContent={"space-between"}
        >
            <CountCard
                title="Proposal"
                count={count.proposal_count}
                new_count={count.new_proposal_count}
                icon={<MdArticle size={20} color="#375DFB" />}
                bgIcon="#DBE7FF"
                color="#375DFB"
            />
            <CountCard
                title="Hasil"
                count={count.result_count}
                new_count={count.new_result_count}
                icon={<RiArticleFill size={20} color="#CA8A04" />}
                bgIcon="#FEF4A7"
                color="#CA8A04"
            />
            <CountCard
                title="Kompren"
                count={count.comprehensive_count}
                new_count={count.new_comprehensive_count}
                icon={<HiClipboardDocumentList size={20} color="#DC2626" />}
                bgIcon="#FADFDF"
                color="#DC2626"
            />
            <CountCard
                title="PPL"
                count={count.ppl_count}
                new_count={count.new_ppl_count}
                icon={<RiComputerFill size={20} color="#16A34A" />}
                bgIcon="#CCF9DC"
                color="#16A34A"
            />
        </Box>
    );
}
