import ButtonComponent from "@/components/ButtonComponent";
import IconsNewCategoryListComponent from "@/components/IconsNewCategoryListComponent";
import InputComponent from "@/components/InputComponent";
import React from "react";

const AddCategoryComponent = () => {
  return (
    <div className="flex flex-col justify-center  p-4">
      <label htmlFor="category" className=" text-xl text-blueColor ">
        Ingrese el nombre de la categoría:
      </label>
      <InputComponent placeholder="Escriba la categoría" />
      <h1 className="text-lg mt-2 text-black">
        Escoge el ícono de tu preferencia
      </h1>
      <IconsNewCategoryListComponent />
      <div className="flex items-center justify-center">
        <ButtonComponent text="Guardar" className="mt-2 ml" />
      </div>
    </div>
  );
};

export default AddCategoryComponent;
