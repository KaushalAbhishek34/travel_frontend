import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import Person2Icon from "@mui/icons-material/Person2";
import SearchIcon from "@mui/icons-material/Search";
import { useDate } from "../../context";

export const Navbar = () => {
  const { destination, checkInDate, checkOutDate, dateDispatch, guests } = useDate();

  const handleSearchClick = () => {
    dateDispatch({
      type: "OPEN_SEARCH_MODAL",
    });
  };
  return (
    <header className="heading d-flex  align-center">
      <h1 className="heading-1">
        <a className="link" href="/">
          TravelO
        </a>
      </h1>
      <div
        className="form-container d-flex align-center cursor-pointer shadow "
        onClick={handleSearchClick}>
        <span className="form-options">{destination || "Any Where"}</span>
        <span className="border-right-1px"></span>
        <span className="form-options">
          {checkInDate && checkOutDate
            ? `${checkInDate.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })} - ${checkOutDate.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })}`
            : "Any Week"}
        </span>
        <span className="border-right-1px"></span>
        <span className="form-options">{guests > 0 ? `${guests} guest` :"Add Guest"}</span>
        <SearchIcon style={{ fontSize: 42 }} className="search" />
      </div>
      <nav className="d-flex align-center gap-large">
        <div className="nav d-flex align-center cursor-pointer">
          <MenuIcon style={{ fontSize: 30 }} className="menu" />
          <Person2Icon style={{ fontSize: 30 }} className="person" />
        </div>
      </nav>
    </header>
  );
};
