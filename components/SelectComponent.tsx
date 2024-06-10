import React from "react";

const SelectComponent = () => {
  return (
    <div>
      <div className="flex flex-row items-center mt-2 justify-end gap-2">
        <select className="w-32 h-6 text-black rounded-lg bg-colorLightBlue">
          <option>Categorías</option>
          <option>Asignaciones</option>
        </select>
        <div className="flex items-center group"></div>
      </div>
    </div>
  );
};

export default SelectComponent;
