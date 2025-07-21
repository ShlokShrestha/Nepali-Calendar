import { Calendar } from "./Calendar/Calendar";

function App() {
  const nepaliDate = "2082-4-2";
  const handleSelectedDate = (value: any) => {
    console.log(value);
  };
  return (
    <>
      <Calendar
        value={nepaliDate}
        onChange={(value: any) => handleSelectedDate(value)}
      />
    </>
  );
}

export default App;
