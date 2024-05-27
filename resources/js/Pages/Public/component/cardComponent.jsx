import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "@inertiajs/react";

export default function CardComponent(props) {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" textAlign={"center"} component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" textAlign={"center"} color="text.secondary">
          {props.isi}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Link href={props.hreff}>
          <Button variant="contained">daftar sekarang</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
