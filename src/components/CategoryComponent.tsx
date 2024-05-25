import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import { FaHome } from "react-icons/fa";

interface OptionType {
  value: string;
  label: string;
  color: string;
}
const CategorySelect: React.FC = () => {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<OptionType>>(null);

  const options: OptionType[] = [
    { value: "Salud", label: "Salud", color: "black" },
    { value: "Ocio", label: "Ocio", color: "black" },
    { value: "Alimentación", label: "Alimentación", color: "black" },
    { value: "Café", label: "Café", color: "black" },
    { value: "Educación", label: "Educación", color: "black" },
    { value: "Regalos", label: "Regalos", color: "black" },
    { value: "Familia", label: "Familia", color: "black" },
    { value: "Belleza", label: "Belleza", color: "black" },
    { value: "Transporte", label: "Transporte", color: "black" },
    { value: "Mascota", label: "Mascota", color: "black" },
    { value: "Vivienda", label: "Vivienda", color: "black" },
    { value: "Social", label: "Social", color: "black" },
    { value: "Deporte", label: "Deporte", color: "black" },
    { value: "Teléfono", label: "Teléfono", color: "black" },
  ];

  const handleChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
    console.log(`Option selected:`, option);
  };

  // Custom styles for react-select
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? "white" : "black", // Color for the selected option
      backgroundColor: state.isSelected ? "#2684FF" : "white", // Background color for the selected option
      ":active": {
        ...provided[":active"],
        backgroundColor: state.isSelected ? "#2684FF" : "#f5f5f5", // Background color for the active option
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "black", // Color for the selected value in the input box
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
      <FaHome style={{ marginRight: 8, width: 40, height: 20 }} />{" "}
      {/* Icono de casa */}
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
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={customPlaceholder} // Custom placeholder with icon
        isClearable
        styles={customStyles} // Apply custom styles here
      />
    </div>
  );
};

export default CategorySelect;
