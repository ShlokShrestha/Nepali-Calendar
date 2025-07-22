import { CalendarHeader } from "./Header/CalendarHeader";
import type { DateObject } from "../types/type";
import CalendarGrid from "./CalendarGrid/CalendarGrid";
import "../styles/calendar.css";

type Props = {
  selectedDate: DateObject;
  setSelectedDate: any;
  minDate?: DateObject | any;
  maxDate?: DateObject | any;
  handleSelectedValue: (date: DateObject) => void;
};

const Calendar = ({
  selectedDate,
  setSelectedDate,
  handleSelectedValue,
  minDate,
  maxDate,
}: Props) => {
  return (
    <div className="nepali-calendar">
      <CalendarHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleSelectedValue={handleSelectedValue}
      />
      <CalendarGrid
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleSelectedValue={handleSelectedValue}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default Calendar;
