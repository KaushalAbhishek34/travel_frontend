import axios from "axios";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { useCategory } from "../../context";
import "./Categories.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [numberOfCategoryToShow, setNumberOfCategoryToShow] = useState(0);
  const { hotelCategory, setHotelCategory } = useCategory();

  const handleShowMoreRightClick = () => {
    setNumberOfCategoryToShow((prev) => prev + 10);
  };
  const handleShowMoreLeftClick = () => {
    setNumberOfCategoryToShow((prev) => prev - 10);
  };
  const handleCategoryClick = (category) => {
    setHotelCategory(category);
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://travelapp-backend-9d6i.onrender.com/api/category"
        );
        const categoriesToShow = data.slice(
          numberOfCategoryToShow,
          numberOfCategoryToShow + 10
        );
        setCategories(categoriesToShow);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [numberOfCategoryToShow]);
  return (
    <section className="categories d-flex align-center gap-large cursor-pointer ">
      {numberOfCategoryToShow >= 10 && (
        <IconButton
          aria-label="left"
          color="success"
          onClick={handleShowMoreLeftClick}>
          <ChevronLeftIcon />
        </IconButton>
      )}
      {categories &&
        categories.map(({ category, _id }) => (
          <span className={`${category === hotelCategory ? "border-bottom" : ""}`} key={_id} onClick={() => handleCategoryClick(category)}>
            {category}
          </span>
        ))}
      {numberOfCategoryToShow <= categories.length && (
        <IconButton
          aria-label="right"
          color="success"
          onClick={handleShowMoreRightClick}>
          <ChevronRightIcon />
        </IconButton>
      )}
    </section>
  );
};
