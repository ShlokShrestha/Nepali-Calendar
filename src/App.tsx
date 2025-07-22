import DatePicker from "./Calendar/Datepicker";

function App() {
  const nepaliDate = "2082-4-2";
  const handleSelectedDate = (value: any) => {
    console.log(value);
  };
  return (
    <>
      <DatePicker
        value={nepaliDate}
        onChange={(value: any) => handleSelectedDate(value)}
      />
    </>
  );
}

export default App;
