import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function RecipeDetails({ recipe, open, onClose }) {
  if (!recipe) {
    return null;
  }

  const { label, image, source, calories, ingredients, totalNutrients } =
    recipe;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="recipe-dialog-title">
      <DialogTitle id="recipe-dialog-title">{label}</DialogTitle>
      <DialogContent>
        <CardMedia component="img" height="200" image={image} alt={label} />
        <Typography variant="h6" gutterBottom>
          Source: {source}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Calories: {calories.toFixed(2)} kcal
        </Typography>
        <Typography variant="h6" gutterBottom>
          Ingredients:
        </Typography>
        <List>
          {ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              <ListItemText primary={ingredient.text} />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" gutterBottom>
          Nutritional Values:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={`Protein: ${totalNutrients.PROCNT.quantity} ${totalNutrients.PROCNT.unit}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Fat: ${totalNutrients.FAT.quantity} ${totalNutrients.FAT.unit}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Carbohydrates: ${totalNutrients.CHOCDF.quantity} ${totalNutrients.CHOCDF.unit}`}
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RecipeDetails;
