import "./navBar.css";

// import assets
import { FaStar, FaCrown } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import { BsFillSkipForwardFill, BsBarChartFill } from "react-icons/bs";
import { GiPodiumWinner } from "react-icons/gi";
import { BiCalendar } from "react-icons/bi";

// import functions

// Import packages
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = ({ params, setParams }) => {
  const navigate = useNavigate();
  const locate = useLocation();

  return (
    <div className="global-container navbar-container">
      {locate.pathname !== "/user/signin" &&
        locate.pathname !== "/user/signup" &&
        locate.pathname !== "/private/private-dashboard" && (
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
            <h2 style={{ marginTop: "20px" }}>Genres</h2>
            <div className="navbar-second-part">
              <span
                onClick={() => {
                  setParams((prevParams) => ({
                    ...prevParams,
                    genres: "action",
                  }));
                  navigate("/discover/genres/action");
                }}
              >
                <img
                  src="https://media.rawg.io/media/games/b7b/b7b8381707152afc7d91f5d95de70e39.jpg"
                  alt="navbar icon"
                />
                Action
              </span>
              <span
                onClick={() => {
                  setParams((prevParams) => ({
                    ...prevParams,
                    genres: "adventure",
                  }));
                  navigate("/discover/genres/adventure");
                }}
              >
                <img
                  src="https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg"
                  alt="genres icons"
                />
                Adventure
              </span>
              <span
                onClick={() => {
                  setParams((prevParams) => ({
                    ...prevParams,
                    genres: "shooter",
                  }));
                  navigate("/discover/genres/shooter");
                }}
              >
                <img
                  src="https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg"
                  alt="genres icons"
                />
                Shooter
              </span>
            </div>
          </div>
        )}
    </div>
  );
};

export default NavBar;
