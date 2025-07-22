import React, { useEffect, useRef, useState } from "react";
import {
  bsMonthDays,
  daysInWeek,
  firstDayOfYearWeekdayMap,
  months,
} from "./constants/Constant";
import "../Calendar/styles/calendar.css";

type DateObject = {
  year: number | string;
  month: number | string;
  day: number | string;
};
type Props = {
  value: string;
  onChange: (date: DateObject) => void;
};
const minDate: any = {};
const maxDate: any = {};

export function Calendar(props: Props) {
  const { value, onChange } = props;

  const currentDate = value.split("-");
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    year: Number(currentDate[0]),
    month: Number(currentDate[1]),
    day: Number(currentDate[2]),
  });
  const getFirstDayOfYearWeekday = (year: number) => {
    return firstDayOfYearWeekdayMap[year] ?? 0;
  };

  const getFirstDayWeekday = () => {
    const yearData = bsMonthDays[selectedDate.year];
    if (!yearData) return 0;

    let daysBefore = 0;
    for (let i = 0; i < selectedDate.month - 1; i++) {
      daysBefore += yearData[i];
    }

    const yearStartWeekday = getFirstDayOfYearWeekday(selectedDate.year);
    return (yearStartWeekday + daysBefore) % 7;
  };

  // Helper date comparison functions
  const isBefore = (date1: DateObject, date2: DateObject) => {
    if (date1.year < date2.year) return true;
    if (date1.year > date2.year) return false;
    if (date1.month < date2.month) return true;
    if (date1.month > date2.month) return false;
    return date1.day <= date2.day;
  };

  const isAfter = (date1: DateObject, date2: DateObject) => {
    if (date1.year > date2.year) return true;
    if (date1.year < date2.year) return false;
    if (date1.month > date2.month) return true;
    if (date1.month < date2.month) return false;
    return date1.day >= date2.day;
  };

  const goToPreviousMonth = () => {
    let { year, month } = selectedDate;
    if (month === 1) {
      year -= 1;
      month = 12;
    } else {
      month -= 1;
    }

    // // Prevent going before minDate month
    // if (
    //   year < minDate.year ||
    //   (year === minDate.year && month < minDate.month)
    // ) {
    //   return;
    // }

    const maxDay = bsMonthDays[year]?.[month - 1] || 30;
    setSelectedDate((prev) => ({
      year,
      month,
      day: Math.min(prev.day, maxDay),
    }));
  };

  const goToNextMonth = () => {
    let { year, month } = selectedDate;
    if (month === 12) {
      year += 1;
      month = 1;
    } else {
      month += 1;
    }

    // Prevent going after maxDate month
    // if (
    //   year > maxDate.year ||
    //   (year === maxDate.year && month > maxDate.month)
    // ) {
    //   return;
    // }

    const maxDay = bsMonthDays[year]?.[month - 1] || 30;
    setSelectedDate((prev) => ({
      year,
      month,
      day: Math.min(prev.day, maxDay),
    }));
  };

  const renderCalendar = () => {
    const yearData = bsMonthDays[selectedDate.year];
    if (!yearData) return <p>No data for year {selectedDate.year}</p>;

    const days = yearData[selectedDate.month - 1]; // Current month days
    const firstDayWeekday = getFirstDayWeekday(); // 0=Sunday, 1=Monday, ...

    // Previous month & year calculation
    let prevMonth = selectedDate.month - 1;
    let prevYear = selectedDate.year;
    if (prevMonth < 1) {
      prevMonth = 12;
      prevYear -= 1;
    }
    const prevYearData = bsMonthDays[prevYear];
    const prevMonthDays = prevYearData ? prevYearData[prevMonth - 1] : 0;
    const calendarDays = [];

    // 1. Previous month's trailing days
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      calendarDays.push(
        <div key={`prev-${day}`} className="prev-next-month-days">
          {day}
        </div>
      );
    }

    // 2. Current month days
    for (let d = 1; d <= days; d++) {
      const currentDay = {
        year: selectedDate.year,
        month: selectedDate.month,
        day: d,
      };

      const disabled =
        isBefore(currentDay, minDate) || isAfter(currentDay, maxDate);
      const isSelected = selectedDate.day === d;

      calendarDays.push(
        <div
          key={d}
          style={{
            cursor: disabled ? "not-allowed" : "pointer",
            backgroundColor: isSelected ? "#3b82f6" : "",
            color: disabled ? "#ccc" : isSelected ? "white" : "black",
          }}
          className="current-month-days"
          onClick={() => {
            if (!disabled) {
              setSelectedDate({ ...selectedDate, day: d });
              onChange({ ...selectedDate, day: d });
              setShowDatepicker(false);
            }
          }}
        >
          {d}
        </div>
      );
    }

    // 3. Next month's leading days to fill last week (up to Sunday)
    const totalDaysShown = calendarDays.length;
    const daysToAdd = totalDaysShown % 7 === 0 ? 0 : 7 - (totalDaysShown % 7);

    for (let i = 1; i <= daysToAdd; i++) {
      calendarDays.push(
        <div key={`next-${i}`} className="prev-next-month-days ">
          {i}
        </div>
      );
    }

    return calendarDays;
  };

  const dropdownRef = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDatepicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="nepali-date-picker-container" ref={dropdownRef}>
      <button
        className="nepali-date-picker-button"
        onClick={() => {
          setShowDatepicker((pre: any) => !pre);
        }}
      >
        {selectedDate.year}-{String(selectedDate.month).padStart(2, "0")}-
        {String(selectedDate.day).padStart(2, "0")}
      </button>
      {showDatepicker && (
        <div className="nepali-calendar">
          <div className="nepali-calendar-inner">
            <button
              onClick={goToPreviousMonth}
              className="nepali-calendar-prev-button"
            >
              ◀
            </button>
            <div className="nepali-calendar-month">
              <select
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const index = parseInt(e.target.value, 10);
                  setSelectedDate((pre: any) => ({
                    ...pre,
                    month: index + 1,
                  }));
                  onChange({ ...selectedDate, month: index + 1 });
                }}
                className="nepali-calendar-month-dropdown"
                value={selectedDate?.month - 1}
                style={{ borderRight: "1px solid #ccc" }}
                name="month"
              >
                {months.map((item, index) => (
                  <option key={index} value={index}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const index = parseInt(e.target.value, 10);
                  setSelectedDate((pre: any) => ({
                    ...pre,
                    year: index,
                  }));
                  onChange({ ...selectedDate, year: index });
                }}
                name="year"
                className="nepali-calendar-month-dropdown"
                value={selectedDate?.year}
              >
                {Object.keys(bsMonthDays).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={goToNextMonth}
              className="nepali-calendar-next-button"
            >
              ▶
            </button>
          </div>

          <div className="nepali-calendar-render">
            {daysInWeek.map((d) => (
              <div key={d} className="nepali-calendar-week">
                {d}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>
      )}
    </div>
  );
}
