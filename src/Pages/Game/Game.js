import "./game.css";
// Import Packages
import moment from "moment";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Import functions
import CheckReviews from "../../assets/functions/CheckReviews";
import checkDescription from "../../assets/functions/checkDescription";
import getAgeRating from "../../assets/functions/getAgeRating";

// Import assets
import { BsWindows, BsApple } from "react-icons/bs";
import { IoLogoPlaystation } from "react-icons/io";
import { FaLinux, FaXbox, FaFirefoxBrowser } from "react-icons/fa";

const Game = () => {
  const [showText, setShowText] = useState(false);
  const [showTextRequirements, setShowTextRequirements] = useState(false);

  const [data, setData] = useState();
  const [preview, setPreview] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const id = useParams();

  useEffect(() => {
    console.log(id);
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3001/game/${id.id}`);
        console.log("response for game", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPreview = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/game/movies/${id.id}`
        );
        setPreview(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPreview();
    getData();

    //eslint-disable-next-line
  }, [id]);

  const formatDate = (string) => {
    return moment(string).format("ll");
  };

  return isLoading ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="global-container">
      {data && (
        <div className="withnav-container">
          <div className="game-content">
            <section className="game-col1">
              <div>
                <span>HOME</span> / <span>GAMES</span> / {""}
                <span>{data.name.toUpperCase()}</span>
              </div>
              <div className="game-col1-game">
                <p className="game-col1-game-p">{data.released}</p>
                <div className="game-col1-platforms">
                  {data.parent_platforms.map((platforms, index) => {
                    return (
                      (platforms.platform.name === "PC" && (
                        <div key={index}>
                          <BsWindows className="card-icons" />
                        </div>
                      )) ||
                      (platforms.platform.name === "PlayStation" && (
                        <div key={index}>
                          <IoLogoPlaystation className="card-icons" />
                        </div>
                      )) ||
                      (platforms.platform.name === "Linux" && (
                        <div key={index}>
                          <FaLinux className="card-icons" />
                        </div>
                      )) ||
                      (platforms.platform.name === "Xbox" && (
                        <div key={index}>
                          <FaXbox className="card-icons" />
                        </div>
                      )) ||
                      (platforms.platform.name === "Web" && (
                        <div key={index}>
                          <FaFirefoxBrowser className="card-icons" />
                        </div>
                      )) ||
                      (platforms.platform.name === "Apple Macintosh" && (
                        <div key={index}>
                          <BsApple className="card-icons" />
                        </div>
                      ))
                    );
                  })}
                </div>
                <span className="game-col1-average">
                  AVERAGE PLAYTIME : {data.playtime ? `${data.playtime}` : "〜"}{" "}
                  HOURS
                </span>
              </div>
              <h1 className="game-col1-h1">{data.name}</h1>
              <div>
                <div className="game-col1-button-container">
                  <div>
                    <button className="game-col1-button-add game-col-btn1">
                      <p>Add to</p>
                      <p>My games</p>
                    </button>
                  </div>
                  <div>
                    <button className="game-col1-button-add game-col-btn2">
                      <p>Add to</p>
                      <p style={{ color: "white" }}>Wishlist</p>
                    </button>
                  </div>
                  <div>
                    <button className="game-col1-button-add game-col-btn3">
                      <p>Save to</p>
                      <p style={{ color: "white" }}>Collection</p>
                    </button>
                  </div>
                </div>
                {data.ratings.length ? (
                  <div className="game-col1-ratings">
                    {CheckReviews(data.ratings[0].title)}
                    <p className="game-col1-ratings-counts">
                      {data.ratings_count}
                      RATINGS
                    </p>
                  </div>
                ) : (
                  <p>〜</p>
                )}
              </div>
              <div className="game-desc-col1">
                <h3>About</h3>
                <div
                  className={
                    !showText
                      ? "game-desc-col1-not-active"
                      : "game-desc-col1-active"
                  }
                  dangerouslySetInnerHTML={checkDescription(data.description)}
                />
                <button
                  className="game-desc-col1-btn"
                  onClick={() => {
                    if (showText === false) {
                      setShowText(true);
                    } else {
                      setShowText(false);
                    }
                  }}
                >
                  {showText ? <p>Show less</p> : <p>Read more</p>}
                </button>
              </div>
              <nav className="game-col1-meta">
                <div className="game-col1-meta-card">
                  <span className="game-col1-title-cats">Platforms</span>
                  <p className="game-col1-cats-content">
                    {data.parent_platforms.map((platforms, index) => {
                      return (
                        <span key={index}>
                          {platforms.platform.name}
                          {index !== data.platforms.length - 1 && (
                            <span>, </span>
                          )}
                        </span>
                      );
                    })}
                  </p>
                </div>
                <div className="game-col1-meta-card">
                  <span className="game-col1-title-cats">Metascore</span>
                  {data.metacritic ? (
                    <div>
                      <p
                        className={
                          data.metacritic >= 80
                            ? "green game-desc-width game-col1-cats-content "
                            : data.metacritic > 60
                            ? "orange game-desc-width game-col1-cats-content "
                            : "rouge game-desc-width  game-col1-cats-content"
                        }
                      >
                        {data.metacritic}
                      </p>
                    </div>
                  ) : (
                    <p>Unspecified</p>
                  )}
                </div>
                <div className="game-col1-meta-card">
                  <span className="game-col1-title-cats">Genre</span>
                  {data.genres.length ? (
                    <p>
                      {data.genres.map((genre, index) => {
                        return (
                          <span key={index}>
                            {genre.name}
                            {index !== data.genres.length - 1 && (
                              <span>, </span>
                            )}
                          </span>
                        );
                      })}
                    </p>
                  ) : (
                    <p>Unspecified</p>
                  )}
                </div>
                <div className="game-col1-meta-card">
                  <span className="game-col1-title-cats">Release date</span>
                  <p>{formatDate(data.released)}</p>
                </div>
                <div className="game-col1-meta-card">
                  <span className="game-col1-title-cats">Developers</span>
                  <p>
                    {data.developers.map((dev, index) => {
                      return (
                        <span key={index}>
                          {dev.name}
                          {index !== data.developers.length - 1 && (
                            <span>, </span>
                          )}
                        </span>
                      );
                    })}
                  </p>
                </div>
                <div className="game-col1-meta-card">
                  <span className="game-col1-title-cats">Publisher</span>
                  <p>
                    {data.publishers.length ? (
                      data.publishers.map((pub, index) => {
                        return (
                          <span key={index}>
                            {pub.name}
                            {index !== data.developers.length - 1 && (
                              <span>, </span>
                            )}
                          </span>
                        );
                      })
                    ) : (
                      <span>Unspecified</span>
                    )}
                  </p>
                </div>
                <div className="game-col1-meta-card">
                  <span className="game-col1-title-cats">Age rating</span>
                  {data.esrb_rating ? (
                    <p>{getAgeRating(data.esrb_rating.name)}</p>
                  ) : (
                    <p>Unspecified</p>
                  )}
                </div>
                <div />
                <div className="game-col1-div2">
                  <span className="game-col1-title-cats">Tags</span>
                  <p>
                    {data.tags.map((tag, index) => {
                      return (
                        <span key={index}>
                          {tag.name}
                          {index !== data.tags.length - 1 && <span>, </span>}
                        </span>
                      );
                    })}
                  </p>
                </div>
                <div className="game-col1-div2">
                  <span className="game-col1-title-cats">Website</span>
                  <p>
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href={data.website}
                    >
                      {data.website}
                    </a>
                  </p>
                </div>
              </nav>
              <div>
                <h3 className="game-col1-requirements-title">
                  System requirement for PC
                </h3>
                {data.platforms.map((platform, index) => {
                  return (
                    platform.platform.name === "PC" &&
                    (platform.requirements.minimum ? (
                      <div
                        key={index}
                        className={
                          !showTextRequirements
                            ? "game-col1-requirements-no-active"
                            : ""
                        }
                      >
                        <p style={{ marginBottom: "10px" }}>
                          {platform.requirements.minimum}
                        </p>
                        <p>{platform.requirements.recommended}</p>
                      </div>
                    ) : (
                      <p key={index} style={{ marginBottom: "10px" }}>
                        Unspecified
                      </p>
                    ))
                  );
                })}
                <button
                  className="read-more-btn-col1"
                  onClick={() => {
                    if (showTextRequirements) {
                      setShowTextRequirements(false);
                    } else {
                      setShowTextRequirements(true);
                    }
                  }}
                >
                  {showTextRequirements ? <p>Show less</p> : <p>Read more</p>}
                </button>
              </div>
            </section>

            {/* col2 ----- */}
            <section className="game-col2">
              <span>
                <div className="game-col2-video-wrapper">
                  <video
                    className="game-col2-video"
                    loop
                    controls
                    muted
                    playsInline
                    src="https://steamcdn-a.akamaihd.net/steam/apps/256693661/movie_max.mp4"
                  />
                </div>
                <div className="game-col2-preview-container">
                  {preview &&
                    preview.map((image, index) => {
                      return (
                        <img
                          className="game-col2-preview"
                          key={index}
                          src={image.image}
                          alt="game preview"
                        />
                      );
                    })}
                  <button>Plus</button>
                </div>
              </span>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;

/* <img
src={data.background_image}
alt=""
className="background-gradient"
/> */
