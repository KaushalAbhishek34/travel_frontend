import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from '@mui/material/Tooltip';
import "./HotelCard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HotelCard = ({hotel}) => {
    const {_id,name,image,address,state,rating,price}
    = hotel;
    const navigate = useNavigate();
const handleHotelCardClick = () =>{
   navigate(`/hotels/${name}/${address}-/${state}/${_id}/reserve`)
}

    const [wish, setWish] = useState(false)
  return (
    <div className="relative hotelcard-container shadow cursor-pointer">
      <div onClick={handleHotelCardClick}>
        <img
          className="img"
          src={image}
          alt="hotelcard"
        />
        <div className="hotelcard-details">
          <div className="d-flex align-center ">
          <span className="location">{name}, {address}</span>
          <span className="rating d-flex align-center">
            <span>
              {" "}
              <StarRateIcon />
            </span>
            <span>{rating}</span>
          </span>
          </div>
          <p className="hotel-name">{name}</p>
          <p className="price-details">
            <span className="price">Rs. {price}</span>
            <span>Night</span>
          </p>
        </div>
      </div>
      <button className="button btn-wishlist absolute d-flex align-center"
      onClick={() => setWish(!wish)}>
       <Tooltip title={wish ?"Remove from wishlist": "Add to wishlist" } >
       <FavoriteIcon style={{color: wish ?"red" : "grey"}} className="favourite cursor" />
       </Tooltip>
      </button>
    </div>
  );
};
