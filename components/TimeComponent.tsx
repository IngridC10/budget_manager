import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const TimeComponent = () => {
  const [selectedDateState, setSelectedDateState] = useState<Date>(new Date());
  return (
    <div>
      <DatePicker
        selected={selectedDateState}
        onChange={(date) => {
          if (date !== null) {
            setSelectedDateState(date);
          }
        }}
        dateFormat="Pp"
        className="p-2  w-[249px] text-black rounded-lg h-11  bg-colorLightBlue"
      />
    </div>
  );
};

export default TimeComponent;
