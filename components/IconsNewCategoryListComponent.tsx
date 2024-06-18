import React, { useState } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import IconsNewCategoryListData from "@/data/IconsNewCategoryListData";
import { IconNewCategory } from "@/app/board/domain/models";

const IconsCategoryListComponent: React.FC = () => {
  const [selectedCategoryState, setSelectedCategoryState] =
    useState<string>("");

  const handleSelectCategory = (category: string) => {
    setSelectedCategoryState(category);
  };

  const groupedIcons = IconsNewCategoryListData.reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, IconNewCategory[]>);

  return (
    <Box p={2} border={1} borderColor="grey.300" borderRadius={4} m={0}>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="h6" gutterBottom marginTop={0}>
          Categorías
        </Typography>
      </Box>

      {Object.entries(groupedIcons).map(([category, items], index) => (
        <Box key={index} mb={2}>
          <Typography variant="subtitle1">{category}</Typography>
          <Grid container spacing={2}>
            {items.map((item, idx) => (
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
