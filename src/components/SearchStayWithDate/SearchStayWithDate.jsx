import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { DateSelector } from "../DateSelector/DateSelector";
import { useDate, useCategory } from "../../context";
import "./searchStayWithDate.css";
import { useEffect, useState } from "react";
import axios from "axios";
export const SearchStayWithDate = () => {
  const { destination, guest, isSearchResultOpen, dateDispatch } = useDate();
  const [hotels, setHotels] = useState([]);
  const { hotelCategory } = useCategory();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://travelapp-backend-9d6i.onrender.com/api/hotels?category=${hotelCategory}`
        );
        setHotels(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [hotelCategory]);

  const closeSearch = () => {
    dateDispatch({
      type: "CLOSE_SEARCH_MODAL",
    });
  };
  const handleDestinationChange = (event) => {
    dateDispatch({
      type: "DESTINATION",
      payload: event.target.value,
    });
  };
  const handleGuestChange = (event) => {
    dateDispatch({
      type: "GUESTS",
      payload: event.target.value,
    });
  };
  const handleSearchResultClick = (address) => {
    dateDispatch({
      type: "DESTINATION",
      payload: address,
    });
  };

  const handleDestinationFocus = () =>{
    dateDispatch({
        type : "SHOW_SEARCH_RESULT"
    })
  }

  const handleSearchButtonClick = () =>{
    dateDispatch({
      type : "CLOSE_SEARCH_MODAL"
    })
    navigate(`/hotels/${destination}`)
  }

  const destinationOptions = hotels.filter(
    ({ address, city, state, country }) =>
      address.toLowerCase().includes(destination.toLowerCase()) ||
      city.toLowerCase().includes(destination.toLowerCase()) ||
      state.toLowerCase().includes(destination.toLowerCase()) ||
      country.toLowerCase().includes(destination.toLowerCase())
  );
  console.log(destinationOptions);
  return (
    <div className="destination-container">
      <CancelIcon className="cancel-icon" onClick={closeSearch} />
      <div className="destination-options d-flex align-center absolute">
        <div className="location-container">
          <label className="label">Where</label>
          <input
            value={destination}
            onChange={handleDestinationChange}
            onFocus={handleDestinationFocus}
            className="input search-dest"
            placeholder="Search Destination"
            autoFocus
          />
        </div>
        <div className="location-container">
          <label className="label"> Check In</label>
          <DateSelector checkInType="In" />
        </div>
        <div className="location-container">
          <label className="label"> Check Out</label>
          <DateSelector checkInType="Out" />
        </div>
        <div className="location-container">
          <label className="label">No. of Guests</label>
          <input
            value={guest}
            className="input search-dest"
            type="number"
            placeholder="Add guest"
            onChange={handleGuestChange}
          />
        </div>
        <div className="search-container d-flex align-center cursor" onClick={handleSearchButtonClick}>
          <SearchIcon />
          <span>Search</span>
        </div>
      </div>
      {isSearchResultOpen && (
        <div className="search-result-container absolute">
          {destinationOptions &&
            destinationOptions.map(({ address, city }) => {
              return (
                <p
                  className="p cursor-pointer"
                  onClick={() => handleSearchResultClick(address)}>
                  {address} , {city}
                </p>
              );
            })}
        </div>
      )}
    </div>
  );
};
