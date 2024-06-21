import React, { InputHTMLAttributes, RefObject } from "react";

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  inputRef?: React.MutableRefObject<any>;
  className?: string;
  placeholder?: string;
  value?: string | number;
}

const InputComponent: React.FC<InputComponentProps> = ({
  type = "text",
  className = "border-blueColor",
  placeholder = "Digite el monto...",
  value,
  inputRef, // Usamos `inputRef` en lugar de `ref`
  ...rest
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        ref={inputRef} // Aquí se usa `inputRef` en lugar de `ref`
        value={value}
        className={`w-full h-12 px-4 mt-2 text-black border rounded-lg ${className}`}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default InputComponent;
