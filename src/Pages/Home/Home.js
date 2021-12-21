import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

const Home = ({ params, setParams, page, setPage }) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    console.log(state);
    const fetchData = async () => {
      try {
        await axios
          .post("http://localhost:3001/games", {
            params,
          })
          .then((response) => {
            setState((state) => {
              return [...state, response.data.map((el) => el)];
            });
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [params, page]);

  const scrollToEnd = () => {
    setPage(page + 1);
    console.log("work");
  };

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollToEnd();
    }
  };

  return (
    <div className="global-container">
      <div className="withnav-container">
        <div className="home-content">
          <h1>New and trending</h1>
          <p>Based on player counts and release date</p>
          <button>
            Order by : <span>Revelance</span>
          </button>
          <section style={{ backgroundColor: "blue" }}>
            <div></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
