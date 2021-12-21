import "./header.css";

// Import packages

// Import assets
import rawgLogo from "../../assets/img/rawg-logo.png";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  return (
    <div className="header-container global-container">
      <div className="header-rawg-logo">
        <img src={rawgLogo} alt="rawg official" />
      </div>
      <div className="header-rate">
        <button>Rate top games</button>
      </div>
      <div className="header-search-container">
        <BiSearch className="fisearch" size={19} />
        <input type="text" placeholder="Search 659,478 games"></input>
      </div>
      <div className="header-navigation">
        <p>LOG IN</p>
        <p>SIGN UP</p>
      </div>
    </div>
  );
};

export default Header;
