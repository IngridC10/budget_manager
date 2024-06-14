import React, { useState } from "react";
import InputComponent from "@/components/InputComponent";
import SelectComponent from "@/components/SelectComponent";
import CalendarComponent from "@/components/CalendarComponent";
import PlusIcon from "@/public/assets/icons/PlusIcon";
import ButtonComponent from "@/components/ButtonComponent";
import AddNewCategoryComponent from "./AddNewCategoryComponent";
import ModalComponent from "@/components/ModalComponent";
import categoryData from "@/data/CategoryData";
import ExpenseTypeData from "@/data/ExpenseTypeData";

const EditCardModalBodyComponent = () => {
  const [isPlusIconModalOpen, setIsPlusIconModalOpen] = useState(false);

  const handlePlusIconClick = () => {
    setIsPlusIconModalOpen(true);
  };

  const closePlusIconModal = () => {
    setIsPlusIconModalOpen(false);
  };

  return (
    <div className="flex flex-col  ">
      <label htmlFor="monto" className="text-xl text-blueColor text-start">
        Ingrese el Monto:
      </label>
      <InputComponent placeholder="Digite el monto" />

      <div className="flex items-center justify-center w-full h-12 mt-5 rounded-lg bg-blueColor">
        <h1>Gastos en Salud</h1>
      </div>

      <div className="flex flex-row   mt-5 ">
        <SelectComponent className="h-[40px] w-[234px]">
          {ExpenseTypeData.map((expenseType) => (
            <option key={expenseType.id} value={expenseType.id}>
              {expenseType.name}
            </option>
          ))}
        </SelectComponent>
        <CalendarComponent />
      </div>

      <SelectComponent className="h-12 w-full mt-5">
        <option value="">Owner del Gasto</option>
        <option value="1">@ingrid.calzada</option>
        <option value="1">@ingrid.calzada</option>
      </SelectComponent>

      <div className="flex flex-row items-center justify-center ">
        <SelectComponent className=" h-12 w-full mt-5">
          <option value="categories">Categorías</option>
          {categoryData.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </SelectComponent>

        <button
          className="h-[37px] w-[37px] flex mt-5  justify-center ml-4 bg-blueColor rounded-full"
          onClick={handlePlusIconClick} // Handle click to open the modal
        >
          <PlusIcon />
        </button>
      </div>
      <div className="flex items-center justify-center mt-16">
        {" "}
        <ButtonComponent text="Guardar" />
      </div>

      {/* Render the modal only if isPlusIconModalOpen is true */}
      {isPlusIconModalOpen && (
        <ModalComponent
          onClose={closePlusIconModal}
          content={<AddNewCategoryComponent />}
        />
      )}
    </div>
  );
};

export default EditCardModalBodyComponent;
