import React from "react";

interface ModalProps {
  onClose: () => void;
  //   children: React.ReactNode;
  content: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({ onClose, content }) => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className=" relative p-8 w-[600px] h-[520px] bg-white rounded-lg">
        <button
          className="absolute top-0 right-0 p-2 text-black"
          onClick={onClose}
        >
          X
        </button>
        {content}
      </div>
    </div>
  );
};

export default ModalComponent;
