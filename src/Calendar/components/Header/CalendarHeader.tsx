import React from "react";
import type { DateObject } from "../../types/type";
import { bsMonthDays, months } from "../../constants/Constant";

type Props = {
  selectedDate: DateObject;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateObject>>;
  handleSelectedValue: (date: DateObject) => void;
};

export function CalendarHeader({
  selectedDate,
  setSelectedDate,
  handleSelectedValue,
}: Props) {
  const goToPreviousMonth = () => {
    let { year, month } = selectedDate;
    month -= 1;
    if (month < 1) {
      month = 12;
      year -= 1;
    }
    const maxDay = bsMonthDays[year]?.[month - 1] || 30;
    setSelectedDate((prev) => ({
      year,
      month,
      day: Math.min(prev.day, maxDay),
    }));
  };

  const goToNextMonth = () => {
    let { year, month } = selectedDate;
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
    const maxDay = bsMonthDays[year]?.[month - 1] || 30;
    setSelectedDate((prev) => ({
      year,
      month,
      day: Math.min(prev.day, maxDay),
    }));
  };

  return (
    <div className="nepali-calendar-inner">
      <button
        onClick={goToPreviousMonth}
        className="nepali-calendar-prev-button"
      >
        ◀
      </button>
      <div className="nepali-calendar-month">
        <select
          value={selectedDate.month - 1}
          onChange={(e) => {
            const month = parseInt(e.target.value, 10) + 1;
            setSelectedDate((prev) => ({ ...prev, month }));
            handleSelectedValue({ ...selectedDate, month });
          }}
          className="nepali-calendar-month-dropdown"
        >
          {months.map((m, i) => (
            <option key={i} value={i}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={selectedDate.year}
          onChange={(e) => {
            const year = parseInt(e.target.value, 10);
            setSelectedDate((prev: DateObject) => ({ ...prev, year }));
            handleSelectedValue({ ...selectedDate, year });
          }}
          className="nepali-calendar-month-dropdown"
        >
          {Object.keys(bsMonthDays).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button onClick={goToNextMonth} className="nepali-calendar-next-button">
        ▶
      </button>
    </div>
  );
}
