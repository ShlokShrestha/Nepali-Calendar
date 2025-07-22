import type { DateObject } from "../../types/type";
import { isAfter, isBefore } from "../../utils/dataHelper";

type Props = {
  date: DateObject;
  selected: boolean;
  minDate: DateObject;
  maxDate: DateObject;
  onSelect: (date: DateObject) => void;
};

const CalendarDay = ({ date, selected, minDate, maxDate, onSelect }: Props) => {
  const disabled = isBefore(date, minDate) || isAfter(date, maxDate);
  return (
    <div
      onClick={() => !disabled && onSelect(date)}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: selected ? "#3b82f6" : "",
        color: disabled ? "#ccc" : selected ? "#fff" : "rgb(107, 107, 107)",
      }}
      className="current-month-days"
    >
      {date.day}
    </div>
  );
};

export default CalendarDay;
