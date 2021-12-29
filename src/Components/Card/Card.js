import "./card.css";

// Import packages :
import { useState } from "react";
// Import assets :
import { AiFillGift } from "react-icons/ai";
import {
  BsWindows,
  BsApple,
  BsThreeDots,
  BsChevronRight,
} from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { IoLogoPlaystation } from "react-icons/io";

import { FaLinux, FaXbox, FaFirefoxBrowser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Card({ data }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [hoverId, setHoverId] = useState(Number);

  return data.map((data) => {
    return (
      <div
        className="home-card "
        key={data.id}
        onMouseOver={() => {
          setHoverId(data.id);
          if (show === false) {
            setShow(true);
          }
        }}
        onMouseLeave={() => {
          if (show === true) {
            setShow(false);
          }
        }}
      >
        <div className="card-image">
          <img
            onClick={() => navigate(`/game/${data.id}`)}
            src={data.background_image}
            alt="background games"
          />
        </div>
        <div className="card-body">
          <div className="card-platforms">
            <div className="card-platform-container">
              {data.parent_platforms.map((element, index) => {
                return (
                  (element.platform.name === "PC" && (
                    <div key={index}>
                      <BsWindows className="card-icons" />
                    </div>
                  )) ||
                  (element.platform.name === "PlayStation" && (
                    <div key={index}>
                      <IoLogoPlaystation className="card-icons" />
                    </div>
                  )) ||
                  (element.platform.name === "Linux" && (
                    <div key={index}>
                      <FaLinux className="card-icons" />
                    </div>
                  )) ||
                  (element.platform.name === "Xbox" && (
                    <div key={index}>
                      <FaXbox className="card-icons" />
                    </div>
                  )) ||
                  (element.platform.name === "Web" && (
                    <div key={index}>
                      <FaFirefoxBrowser className="card-icons" />
                    </div>
                  )) ||
                  (element.platform.name === "Apple Macintosh" && (
                    <div key={index}>
                      <BsApple className="card-icons" />
                    </div>
                  ))
                );
              })}
            </div>
            <div className="card-metacritic">
              <p
                className={
                  data.metacritic >= 80
                    ? "green"
                    : data.metacritic > 60
                    ? "orange"
                    : "rouge"
                }
              >
                {data.metacritic}
              </p>
            </div>
          </div>
          <h5 className="card-text">{data.name}</h5>
          <div className="card-line-review">
            <button className="card-button-add">
              <TiPlus />
              <p>{data.ratings_count}</p>
            </button>
            {show && data.id === hoverId && (
              <AiFillGift
                className="react-nav-review"
                style={{ margin: "0 7px" }}
              />
            )}
            {show && data.id === hoverId && (
              <BsThreeDots className="react-nav-review" />
            )}
          </div>

          {show && data.id === hoverId && (
            <div className="card-modale">
              <div className="card-release-date">
                <span className="gray-text">Release date : </span>
                <span className="white-text">{data.released}</span>
              </div>
              <div className="card-genre">
                <span className="gray-text">Genre : </span>
                <span className="underline white-text">{data.genres}</span>
              </div>
              <div className="card-show-more">
                <button>Show more like this</button>
                <BsChevronRight size={22} className="card-show-more-chevron" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  });
}

export default Card;
