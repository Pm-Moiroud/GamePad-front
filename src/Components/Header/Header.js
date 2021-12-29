import "./header.css";

// Import packages
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../context/userContext";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Import assets
import { BiSearch } from "react-icons/bi";
import { BsXLg, BsWindows, BsApple } from "react-icons/bs";
import { IoLogoPlaystation } from "react-icons/io";
import { SiNintendoswitch } from "react-icons/si";
import { FiDelete } from "react-icons/fi";
import { FaLinux, FaXbox, FaFirefoxBrowser } from "react-icons/fa";

const Header = ({ setDefaultParams, defaultParams }) => {
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);

  const inputRef = useRef();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch {
      alert(
        "For some reasons we can't deconnect, please check your internet connexion and retry."
      );
    }
  };

  useEffect(() => {
    if (input.length >= 3) {
      const fetchData = async () => {
        const response = await axios.post("http://localhost:3001/search", {
          input,
        });
        console.log(response.data);
        setSearchData(response.data);
        setSearchActive(true);
      };
      fetchData();
    } else {
      setSearchActive(false);
      setSearchData([]);
    }
  }, [input]);
  return (
    <div className="header-container global-container">
      <div className="header-rawg-logo">
        <h5
          onClick={() => {
            setSearchActive(false);
            setInput("");
            inputRef.current.value = "";
            navigate("/");
          }}
        >
          RAWG
        </h5>
      </div>
      {!currentUser && (
        <div className="header-rate">
          <button>Rate top games</button>
        </div>
      )}

      <div className="header-search-container">
        <BiSearch className="fisearch" size={19} />
        <input
          className={inputRef?.current?.value ? "on-change" : "off"}
          type="text"
          ref={inputRef}
          onSelect={() =>
            searchData && searchData.length >= 3
              ? setSearchActive(true)
              : setSearchActive(false)
          }
          placeholder="Search 661,395 games"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <FiDelete
          size={20}
          onClick={() => {
            setSearchData([]);
            inputRef.current.value = "";
          }}
          className="bsXlg"
        />
      </div>

      {searchActive && searchData[1] && (
        <div
          className="search-global-content"
          onClick={() => {
            setSearchActive(false);
          }}
        >
          <div
            className="search-modale-container"
            onClick={(e) => {
              // do not close modal if anything inside modal content is clicked
              e.stopPropagation();
            }}
          >
            <div className="search-modale-header">
              <h2>
                Games <span>{searchData[0]}</span>
              </h2>
              <BsXLg
                style={{ cursor: "pointer" }}
                size={20}
                onClick={() => setSearchActive(false)}
              />
            </div>
            {/* ---------map to display result  ---------*/}
            {searchData[1].map((game, index) => {
              console.log("game", game.id);
              return (
                <div
                  key={index}
                  onClick={() => {
                    typeof game.id !== Array && navigate(`/game/${game.id}`);
                    setSearchActive(false);
                  }}
                  className="search-modale-content"
                >
                  <div className="search-modale-img">
                    <img
                      src={game.background_image}
                      alt="background of games cover"
                    />
                  </div>
                  <div className="search-modale-infos">
                    <div className="platforms-container">
                      {/* ---------map for platform  ---------*/}
                      {game.parent_platforms.map((image, index) => {
                        return (
                          <div key={index}>
                            {index <= 2 ? (
                              <div className="platforms-line">
                                {(image.platform.name === "PC" && (
                                  <div>
                                    <BsWindows className="platforms-icons" />
                                  </div>
                                )) ||
                                  (image.platform.name === "PlayStation" && (
                                    <div>
                                      <IoLogoPlaystation className="platforms-icons" />
                                    </div>
                                  )) ||
                                  (image.platform.name === "Linux" && (
                                    <div>
                                      <FaLinux className="platforms-icons" />
                                    </div>
                                  )) ||
                                  (image.platform.name === "Xbox" && (
                                    <div>
                                      <FaXbox className="platforms-icons" />
                                    </div>
                                  )) ||
                                  (image.platform.name === "Web" && (
                                    <div>
                                      <FaFirefoxBrowser className="platforms-icons" />
                                    </div>
                                  )) ||
                                  image.platform.name === "Apple Macintosh" ||
                                  (image.platform.name === "iOS" && (
                                    <div>
                                      <BsApple className="platforms-icons" />
                                    </div>
                                  )) ||
                                  (image.platform.name === "Nintendo" && (
                                    <div>
                                      <SiNintendoswitch className="platforms-icons" />
                                    </div>
                                  ))}
                              </div>
                            ) : index === 3 ? (
                              <p className="platforms-p">
                                +{game.parent_platforms.length - index}
                              </p>
                            ) : (
                              <p></p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <p className="search-games-name">{game.name}</p>
                  </div>
                </div>
              );
            })}
            <div className="search-modale-all-results">
              <button
                onClick={() => {
                  setDefaultParams({});
                  setSearchActive(false);
                  navigate(`/search=${input}`);
                }}
              >
                View all result ({searchData[0]})
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="">
        {!currentUser ? (
          <div className="header-navigation">
            <p
              onClick={() => {
                navigate("/user/signin");
              }}
            >
              LOG IN
            </p>
            <p
              onClick={() => {
                navigate("/user/signup");
              }}
            >
              SIGN UP
            </p>
          </div>
        ) : (
          <div className="header-nav-connected">
            <p onClick={logOut}>LOG OUT</p>
            <p onClick={() => navigate("/private/dashboard")}>MON ESPACE</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
