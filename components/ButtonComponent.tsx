import React, { ButtonHTMLAttributes } from "react";

interface ButtonComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  className = "",
  text,
  ...props
}) => {
  return (
    <div>
      <button
        className={`flex items-center justify-center w-40 h-10  rounded-lg  bg-blueColor ${className}`}
        {...props}
      >
        <h1 className="text-white">{text}</h1>
      </button>
    </div>
  );
};

export default ButtonComponent;
