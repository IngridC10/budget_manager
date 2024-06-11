import { useState } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import {
  Favorite,
  AccountBalance,
  HelpOutline,
  School,
  LocalMall,
  SportsSoccer,
  LocalBar,
  Movie,
  Mic,
  FitnessCenter,
  EmojiEvents,
  Devices,
} from "@mui/icons-material";

const categories = [
  {
    title: "Miscelánea",
    items: [
      { name: "Bienestar", icon: <Favorite /> },
      { name: "Coste bancario", icon: <AccountBalance /> },
      { name: "Desconocido", icon: <HelpOutline /> },
      { name: "Miscelánea", icon: <HelpOutline /> },
      { name: "Ropa", icon: <LocalMall /> },
      { name: "Préstamo estudiantil", icon: <School /> },
    ],
  },
  {
    title: "Entretenimiento",
    items: [
      { name: "Bolos", icon: <EmojiEvents /> },
      { name: "Cine", icon: <Movie /> },
      { name: "Concierto", icon: <Mic /> },
      { name: "Deportes", icon: <SportsSoccer /> },
      { name: "Discoteca", icon: <LocalBar /> },
      { name: "Electrónica", icon: <Devices /> },
      { name: "Entretenimiento", icon: <EmojiEvents /> },
      { name: "Gimnasio", icon: <FitnessCenter /> },
      { name: "Hobby", icon: <EmojiEvents /> },
      { name: "Entretenimiento", icon: <EmojiEvents /> },
      { name: "Gimnasio", icon: <FitnessCenter /> },
      { name: "Hobby", icon: <EmojiEvents /> },
      { name: "Entretenimiento", icon: <EmojiEvents /> },
      { name: "Gimnasio", icon: <FitnessCenter /> },
      { name: "Hobby", icon: <EmojiEvents /> },
      { name: "Entretenimiento", icon: <EmojiEvents /> },
      { name: "Gimnasio", icon: <FitnessCenter /> },
      { name: "Hobby", icon: <EmojiEvents /> },
    ],
  },
];

const IconsCategoryListComponent = () => {
  const [selectedCategoryState, setSelectedCategoryState] =
    useState<string>("");

  // Updates the selectedCategoryState with the selected category
  const handleSelectCategory = (category: string) => {
    setSelectedCategoryState(category);
    console.log(`Categoría seleccionada: ${category}`);
  };

  return (
    <Box p={2} border={1} borderColor="grey.300" borderRadius={4} m={0}>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="h6" gutterBottom marginTop={0}>
          CATEGORÍAS
        </Typography>
      </Box>
      {categories.map((category, index) => (
        <Box key={index} mb={2}>
          <Typography variant="subtitle1">{category.title}</Typography>
          <Grid container spacing={2}>
            {category.items.map((item, idx) => (
              <Grid item key={idx} md={2}>
                <IconButton
                  onClick={() => handleSelectCategory(item.name)}
                  style={{
                    backgroundColor:
                      selectedCategoryState === item.name
                        ? "lightblue"
                        : "transparent",
                    borderRadius: "50%",
                    padding: "6px",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {item.icon}
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};
export default IconsCategoryListComponent;
