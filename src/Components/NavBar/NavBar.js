import "./navBar.css";
import { FaStar, FaCrown } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import { BsFillSkipForwardFill, BsBarChartFill } from "react-icons/bs";
import { GiPodiumWinner } from "react-icons/gi";
import { BiCalendar } from "react-icons/bi";
const NavBar = ({ params, setParams }) => {
  return (
    <div className="global-container navbar-container">
      <div className="nav-bar-absolute">
        <div>
          <h2 className="nav-bar-titles-hoover">Home</h2>
          <h2 className="nav-bar-titles-hoover">Reviews</h2>
          <h2>New releases</h2>
        </div>
        <div className="navbar-first-part">
          <span>
            <FaStar className="react-nav-icons" /> Last 30 days
          </span>
          <span>
            <ImFire className="react-nav-icons" /> This week
          </span>
          <span>
            <BsFillSkipForwardFill className="react-nav-icons" /> Next week
          </span>
          <span>
            <BiCalendar className="react-nav-icons" />
            Release calendar
          </span>
        </div>
        <h2 style={{ marginTop: "20px" }}>Top</h2>
        <div className="navbar-first-part">
          <span>
            <GiPodiumWinner className="react-nav-icons" />
            Best of the year
          </span>
          <span>
            <BsBarChartFill className="react-nav-icons" />
            Popular in 2020
          </span>
          <span>
            <FaCrown className="react-nav-icons" />
            All time top 250
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
