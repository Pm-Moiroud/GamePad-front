import "./genre.css";

import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../../Components/Card/Card";

const Genres = ({ params }) => {
  const [hasMore, sethasMore] = useState(true);
  const [data, setData] = useState([]);

  const [paramsNext, setParamsNext] = useState({
    page: 1,
    page_size: 40,
    ordering: "-ranking",
  });

  useEffect(() => {
    const getData = async () => {
      console.log(params);
      try {
        const response = await axios.post("http://localhost:3001/games/all", {
          params,
        });
        console.log(response.data);
        setData(response.data);
        setParamsNext((prevParams) => ({
          ...prevParams,
          page: paramsNext.page + 1,
          genres: params.genres,
        }));
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();

    //eslint-disable-next-line
  }, [params]);

  const fetchNewData = async () => {
    try {
      const res = await axios.post(`http://localhost:3001/games/all`, {
        params: paramsNext,
      });
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchData = async () => {
    const nextData = await fetchNewData();
    setData([...data, ...nextData]);
    setParamsNext((prevParams) => ({
      ...prevParams,
      page: paramsNext.page + 1,
    }));
    if (data.length === 99999) {
      sethasMore(false);
    }
  };

  return (
    <div className="global-container">
      <div className="withnav-container">
        <div className="home-content">
          <h1>Popular in 2020</h1>
          <button className="home-content-btn">
            Order by : <span className="underline">Revelance</span>
          </button>
          <section>
            <div>
              <InfiniteScroll
                dataLength={data.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>No more games</b>
                  </p>
                }
              >
                <div className="">
                  <div className="home-content-flex">
                    <Card data={data} />
                  </div>
                </div>
              </InfiniteScroll>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Genres;
