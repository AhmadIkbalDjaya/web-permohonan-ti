import React from "react";
import { Link } from "@inertiajs/react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import { MdArticle } from "react-icons/md";

export default function RegisCard({
    title,
    subtitle,
    target_page = route("proposal"),
    icon = <MdArticle size={30} />,
    color = "#375DFB",
}) {
    return (
        <Card
            sx={{
                maxWidth: 345,
                margin: 2,
                marginX: {
                    xs: 4,
                    md: 2,
                },
                boxShadow: 3,
                py: "10px",
            }}
        >
            <CardContent sx={{ px: "25px" }}>
                <Avatar
                    sx={{
                        bgcolor: color,
                        width: "50px",
                        height: "50px",
                        mx: "auto",
                    }}
                >
                    {icon}
                </Avatar>
                <Box sx={{ mt: 3 }}>
                    <Typography
                        gutterBottom
                        variant="h6"
                        textAlign={"center"}
                        fontSize={16}
                        fontWeight={600}
                        color={"gray-500"}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        textAlign={"center"}
                        color="text.secondary"
                        fontSize={11}
                        fontWeight={500}
                    >
                        {subtitle}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", mt: "20px" }}>
                <Link href={target_page}>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ textTransform: "none", background: color }}
                    >
                        Daftar Sekarang
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
