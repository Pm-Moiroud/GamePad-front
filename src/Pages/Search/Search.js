import "./search.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../Components/Card/Card";

const Search = ({ defaultParams, setDefaultParams }) => {
  const input = useParams();
  const [hasMore, sethasMore] = useState(true);
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    page_size: 40,
    search: input.input,
  });

  useEffect(() => {
    console.log("input ====", input.input);
    console.log("defaultParams ====", defaultParams);
    const getData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/search/default",
          {
            page: 1,
            page_size: 40,
            search: input.input,
          }
        );
        setData(response.data);
        setParams((prevParams) => ({
          ...prevParams,
          page: params.page + 1,
        }));
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();

    //eslint-disable-next-line
  }, [defaultParams]);

  const fetchNewData = async () => {
    try {
      const res = await axios.post(`http://localhost:3001/games/all`, {
        params,
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
    setParams((prevParams) => ({
      ...prevParams,
      page: params.page + 1,
    }));
    if (data.length === 99999) {
      sethasMore(false);
    }
  };

  return (
    <div className="global-container">
      <div className="withnav-container">
        <div className="home-content">
          <h1>Search result</h1>
          <p>You've searched {input.input}</p>
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

export default Search;
