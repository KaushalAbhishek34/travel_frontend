import ReactDatePicker from "react-datepicker";
import "./DateSelector.css";
import "react-datepicker/dist/react-datepicker.css";
import { useDate } from "../../context/date-context";


export const DateSelector = ({ checkInType}) => {
  const {checkInDate , checkOutDate ,dateDispatch } = useDate();

  const handleDateChange = (date)=> {
    dateDispatch({
        type: checkInType === "In" ? "CHECK_IN" : "CHECK_OUT",
        payload : date,
    })
  }
  const handleDateFocus = () => {
    dateDispatch({
      type: "DATE_FOCUS",
    });
  };
  return (
    <ReactDatePicker
      className="search-dest input"
      selected={checkInType === "In" ? checkInDate : checkOutDate}
      onChange={(date) => handleDateChange(date)}
      onFocus={handleDateFocus}
      dateFormat="dd/MM/yyyy"
      placeholderText="Add Dates"
      minDate={new Date()}
      closeOnScroll={true}
    />
  );
};
