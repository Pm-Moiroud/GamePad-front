import "./navBar.css";

// import assets
import { FaStar, FaCrown } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import { BsFillSkipForwardFill, BsBarChartFill } from "react-icons/bs";
import { GiPodiumWinner } from "react-icons/gi";
import { BiCalendar } from "react-icons/bi";

// import functions
// Import packages
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="global-container navbar-container">
      <div className="nav-bar-absolute">
        <div>
          <h2
            className="nav-bar-titles-hoover"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </h2>
          <h2 className="nav-bar-titles-hoover">Reviews</h2>
          <h2>New releases</h2>
        </div>
        <div className="navbar-first-part">
          <span
            onClick={() => {
              navigate("/discover/last-30-days");
            }}
          >
            <FaStar className="react-nav-icons" /> Last 30 days
          </span>
          <span
            onClick={() => {
              navigate("/discover/this-week");
            }}
          >
            <ImFire className="react-nav-icons" /> This week
          </span>
          <span
            onClick={() => {
              navigate("/discover/next-week");
            }}
          >
            <BsFillSkipForwardFill className="react-nav-icons" /> Next week
          </span>
          <span onClick={() => navigate("/discover/release-calendar")}>
            <BiCalendar className="react-nav-icons" />
            Release calendar
          </span>
        </div>
        <h2 style={{ marginTop: "20px" }}>Top</h2>
        <div className="navbar-first-part">
          <span onClick={() => navigate("/discover/best-of-the-year")}>
            <GiPodiumWinner className="react-nav-icons" />
            Best of the year
          </span>
          <span onClick={() => navigate("/discover/popular-this-year")}>
            <BsBarChartFill className="react-nav-icons" />
            Popular in 2020
          </span>
          <span onClick={() => navigate("/discover/all-time-top")}>
            <FaCrown className="react-nav-icons" />
            All time top 250
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
