import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import { FaHome } from "react-icons/fa";

export interface OptionType {
  value: string;
  label: string;
  color: string;
}

interface CategorySelectProps {
  categories: { id: number; name: string }[];
  selectedCategoryState: SingleValue<OptionType>;
  setSelectedCategoryState: React.Dispatch<
    React.SetStateAction<SingleValue<OptionType>>
  >;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  selectedCategoryState,
  setSelectedCategoryState,
}) => {
  console.log("Categories 00000:", categories);
  const options: OptionType[] = categories.map((category) => ({
    value: category.name,
    label: category.name,
    color: "black",
  }));

  const handleChange = (option: SingleValue<OptionType>) => {
    setSelectedCategoryState(option);
    console.log(`Option selected:`, option);
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "#2684FF" : "white",
      ":active": {
        ...provided[":active"],
        backgroundColor: state.isSelected ? "#2684FF" : "#f5f5f5",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "black",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      color: "black",
    }),
  };

  const customPlaceholder = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FaHome style={{ marginRight: 8, width: 40, height: 20 }} />
      <span>Selecciona una categoría...</span>
    </div>
  );

  return (
    <div
      style={{
        width: 430,
        margin: "0 auto",
        border: "3px solid black",
        borderRadius: "10px",
      }}
    >
      <Select
        value={selectedCategoryState}
        onChange={handleChange}
        options={options}
        placeholder={customPlaceholder}
        isClearable
        styles={customStyles}
      />
    </div>
  );
};

export default CategorySelect;
