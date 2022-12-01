import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const OwnItemRecipe = ({ recipe }) => {
    const img = new Buffer.from(recipe.img.data).toString("base64");
    return (
        <Card sx={{ maxWidth: 200 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`data:image/jpg;base64, ${img}`}
                    alt={recipe.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {recipe.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="success">
                    Edit
                </Button>
                <Button size="small" color="error">
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default OwnItemRecipe;
