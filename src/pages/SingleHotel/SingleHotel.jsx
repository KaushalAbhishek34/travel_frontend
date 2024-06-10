import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Navbar, HotelImages, HotelDetails, FinalPrice} from "../../components"
import "./SingleHotel.css"

export const SingleHotel = () => {
  const { id } = useParams();
  const [singleHotel, setSingleHotel] = useState({}); 

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`https://travelapp-backend-9d6i.onrender.com/api/hotels/${id}`);
        setSingleHotel(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const { name, country } = singleHotel 
  console.log(name, country);

  return (
    <>
      <Navbar />
      <main className="single-hotel-page">
        {singleHotel ? (
          <>
          
            <p className="hotel-name-add">{name}, {country}</p>
            <HotelImages singleHotel={singleHotel} />
            <div className="d-flex">
              <HotelDetails singleHotel={singleHotel}/>
              <FinalPrice singleHotel={singleHotel} />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  );
};