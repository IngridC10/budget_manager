import React, { SelectHTMLAttributes, ReactNode } from "react";

interface SelectComponentProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  className?: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className=" w-full">
      <div className="flex flex-row items-center justify-between ">
        <select
          {...props}
          className={`  text-black rounded-lg bg-colorLightBlue ${className}`}
        >
          {children}
        </select>
        <div className="flex items-center group"></div>
      </div>
    </div>
  );
};

export default SelectComponent;
