import React, { type JSX } from "react";
import {
  bsMonthDays,
  daysInWeek,
  firstDayOfYearWeekdayMap,
} from "../../constants/Constant";
import type { DateObject } from "../../types/type";
import CalendarDay from "./CalendarDay";

type Props = {
  selectedDate: DateObject;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateObject>>;
  handleSelectedValue: (date: DateObject) => void;
  minDate: DateObject;
  maxDate: DateObject;
};

const CalendarGrid = ({
  selectedDate,
  setSelectedDate,
  handleSelectedValue,
  minDate,
  maxDate,
}: Props) => {
  const yearData = bsMonthDays[selectedDate.year];
  const days = yearData?.[selectedDate.month - 1] ?? 30;

  const getFirstDayWeekday = () => {
    const yearStart = firstDayOfYearWeekdayMap[selectedDate.year] ?? 0;
    const daysBefore =
      yearData?.slice(0, selectedDate.month - 1).reduce((a, b) => a + b, 0) ||
      0;
    return (yearStart + daysBefore) % 7;
  };

  const prevMonth = selectedDate.month === 1 ? 12 : selectedDate.month - 1;
  const prevYear =
    selectedDate.month === 1 ? selectedDate.year - 1 : selectedDate.year;
  const prevDays = bsMonthDays[prevYear]?.[prevMonth - 1] || 30;

  const firstWeekday = getFirstDayWeekday();
  const cells: JSX.Element[] = [];

  // 1. Trailing prev month days
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push(
      <div key={`p-${i}`} className="prev-next-month-days">
        {prevDays - i}
      </div>
    );
  }

  // 2. Current month days
  for (let day = 1; day <= days; day++) {
    const current = { ...selectedDate, day };
    cells.push(
      <CalendarDay
        key={day}
        date={current}
        selected={selectedDate.day === day}
        minDate={minDate}
        maxDate={maxDate}
        onSelect={(d: any) => {
          setSelectedDate(d);
          handleSelectedValue(d);
        }}
      />
    );
  }

  // 3. Leading next month days
  const total = cells.length;
  const remainder = total % 7;
  for (let i = 1; i <= (remainder ? 7 - remainder : 0); i++) {
    cells.push(
      <div key={`n-${i}`} className="prev-next-month-days">
        {i}
      </div>
    );
  }

  return (
    <div className="nepali-calendar-render">
      {daysInWeek.map((d) => (
        <div key={d} className="nepali-calendar-week">
          {d}
        </div>
      ))}
      {cells}
    </div>
  );
};

export default CalendarGrid;
