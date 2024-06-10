import { Navbar ,HotelCard , Categories, SearchStayWithDate} from "../../components";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Home.css";
import {  useEffect, useState } from "react";
import { useCategory , useDate} from "../../context";

export const Home = () => {
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(10);
  const [testData, setTestData] = useState([]);
  const [hotels, setHotels] = useState([]);
  const {hotelCategory} = useCategory();
  const {isSearchModalOpen} = useDate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://travelapp-backend-9d6i.onrender.com/api/hotels?category=${hotelCategory}`
        );
        setTestData(data);
        setHotels(data ? data.slice(0, 10) : []);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [hotelCategory]);

  const fetchMoreData = () => {
    if (hotels.length >= testData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      if (hotels && hotels.length > 0) {
        setHotels(
          hotels.concat(testData.slice(currentIndex, currentIndex + 10))
        );
        setCurrentIndex((pre) => pre + 10);
      } else {
        setHotels([]);
      }
    }, 1000);
  };

  return (
   
      <div className="relative">
        <Navbar />
      <Categories />
      {hotels && hotels.length > 0 ? (
        <InfiniteScroll
          dataLength={hotels.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            hotels.length > 0 && <h3 className="alert-text">Loading...</h3>
          }
          endMessage={<p className="alert-text">You have seen it all</p>}>
          <main className="main d-flex align-center wrap gap-larger">
            {hotels &&
              hotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
          </main>
        </InfiniteScroll>
      ) : (
        <></>
      )}
      {isSearchModalOpen && <SearchStayWithDate />}
      </div>
  );
};
