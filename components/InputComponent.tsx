import React, { InputHTMLAttributes } from "react";

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  id?: string;
  className?: string;
  placeholder?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  type = "text",
  id,
  className = "border-blueColor",
  placeholder = "Digite el monto...",
  ...rest
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        id={id}
        className={` w-full h-12 px-4 mt-2 text-black border rounded-lg ${className}`}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default InputComponent;
