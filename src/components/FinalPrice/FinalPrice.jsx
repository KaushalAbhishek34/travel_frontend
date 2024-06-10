import StarIcon from "@mui/icons-material/Star";
import "./FinalPrice.css";
import { useDate } from "../../context";
import { DateSelector } from "../DateSelector/DateSelector";

export const FinalPrice = ({ singleHotel }) => {
  const { guests, dateDispatch } = useDate();

  const handleGuestChange = (event) =>{
    dateDispatch({
      type : "GUESTS",
      payload : event.target.value
    })
  }
  return (
    <div className="price-details-container d-flex direction-column gap shadow">
      <div className="price-rating d-flex align-center justify-space-between">
        <p>
          <span className="fs-bold fs-large">Rs. {singleHotel?.price}</span>{" "}
          night
        </p>
        <span className=" raiting d-flex align-center ">
          <StarIcon /> <span>/</span> <span>{singleHotel?.rating}</span>
        </span>
      </div>
      <div className="d-flex direction-column">
        <div className="grid-container-two-col selected-dates">
          <div className="checkin loc-container">
            <label className="label"> Check in</label>
            <DateSelector checkInType="In" />
          </div>
          <div>
            <label className="checkin loc-container">Check out</label>
            <DateSelector checkInType="Out" />
          </div>
        </div>
        <div className="guests gutter-sm">
          <p>GUESTS</p>
          {guests <= 0 ? (
            <input
              className="guest-count-input"
              type="number"
              placeholder="Add Guest"
              value={guests}
              onChange={handleGuestChange}
            />
          ) : (
            <span> {guests} guests</span>
          )}
        </div>
      </div>
      <div>
        <button className="button btn-reserve btn-primary cursor">
          Reserve
        </button>
      </div>
      <div className="price-distribution d-flex direction-column ">
        <div className="final-price d-flex align-center justify-space-between ">
          <span className="span">Rs. {singleHotel?.price} * 2 nights</span>
          <span className="span">Rs. {singleHotel?.price * 2}</span>
        </div>
        <div className="final-price d-flex align-center justify-space-between ">
          <span className="span">Service fee</span>
          <span className="span">Rs. 200 </span>
        </div>
        <div className="final-price d-flex align-center justify-space-between ">
          <span className="span">Total</span>
          <span className="span">Rs. {singleHotel?.price * 2 + 200} </span>
        </div>
      </div>
    </div>
  );
};
