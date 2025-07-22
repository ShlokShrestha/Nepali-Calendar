import { useState, useRef, useEffect } from "react";
import type { DateObject } from "./types/type";
import Calendar from "./components/Calendar";

type Props = {
  value: string;
  onChange: (date: string) => void;
};

const DatePicker = ({ value, onChange }: Props) => {
  const currentDate = value.split("-");
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateObject>({
    year: Number(currentDate[0]),
    month: Number(currentDate[1]),
    day: Number(currentDate[2]),
  });

  const minDate: DateObject | any = {};
  const maxDate: DateObject | any = {};

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(e.target)
      ) {
        setShowDatepicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectedValue = (value: DateObject) => {
    const selectedValue = `${value.year}-${value.month}-${value.day}`;
    onChange(selectedValue);
    setShowDatepicker(false);
  };

  return (
    <div className="nepali-date-picker-container" ref={dropdownRef}>
      <button
        className="nepali-date-picker-button"
        onClick={() => setShowDatepicker((prev) => !prev)}
      >
        {selectedDate.year}-{String(selectedDate.month).padStart(2, "0")}-
        {String(selectedDate.day).padStart(2, "0")}
      </button>
      {/* {showDatepicker && (
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleSelectedValue={handleSelectedValue}
          minDate={minDate}
          maxDate={maxDate}
        />
      )} */}
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleSelectedValue={handleSelectedValue}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default DatePicker;
