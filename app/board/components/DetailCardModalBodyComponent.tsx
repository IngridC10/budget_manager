import React from "react";

const DetailCardModalBodyComponent = () => {
  return (
    <div className="flex flex-col items-start justify-center">
      <span className="w-10 h-10 mr-2">
        <i className="text-black fas fa-home"></i>
      </span>
      <div className="flex items-center justify-center w-full h-12 mt-5">
        <h1 className="text-[60px] font-bold text-blueColor">S/500</h1>
      </div>
      <h2 className="mt-6 text-lg font-bold text-black">
        Gastos personales - Seguro de salud
      </h2>
      <h3 className="mt-6 text-lg font-bold text-black">
        Responsable: Ingrid Calzada
      </h3>
      <h3 className="mt-6 text-lg font-bold text-black">
        Vence el: 31 de mayo
      </h3>
    </div>
  );
};

export default DetailCardModalBodyComponent;
