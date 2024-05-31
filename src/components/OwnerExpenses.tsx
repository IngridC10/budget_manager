import React, { useState } from "react";
import Select, { SingleValue } from "react-select";

interface OptionType {
  value: string;
  label: string;
  color: string;
}

interface OwnerExpensesProps {
  selectedOwnerState: SingleValue<OptionType>;
  setSelectedOwnerState: React.Dispatch<
    React.SetStateAction<SingleValue<OptionType>>
  >;
}

const OwnerExpenses: React.FC<OwnerExpensesProps> = ({
  selectedOwnerState,
  setSelectedOwnerState,
}) => {
  // const [selectedOptionState, setSelectedOptionState] =
  //   useState<SingleValue<OptionType>>(null);

  const options: OptionType[] = [
    { value: "@ingridCalzada", label: "@ingridCalzada", color: "black" },
    { value: "@harolCalzada", label: "@harolCalzada", color: "black" },
    { value: "@valerieMeza", label: "@valerieMeza", color: "black" },
  ];

  const handleChange = (option: SingleValue<OptionType>) => {
    setSelectedOwnerState(option);
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
  };

  return (
    <div
      style={{
        width: 500,
        margin: "0 auto",
        border: "3px solid black",
        borderRadius: "10px",
      }}
    >
      <Select
        value={selectedOwnerState}
        onChange={handleChange}
        options={options}
        placeholder="Owner Expenses"
        isClearable
        styles={customStyles} // Apply custom styles here
      />
    </div>
  );
};

export default OwnerExpenses;
