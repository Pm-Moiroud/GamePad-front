import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../../Components/Card/Card";
import handleSearchThirty from "../../../assets/functions/functions";
const LastDays = () => {
  const [hasMore, sethasMore] = useState(true);
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    page_size: 40,
    dates: handleSearchThirty("sub", 365),
    metacritic: "70,100",
    ordering: "-ranking",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/games/all", {
          params,
        });
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
  }, []);

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
          <h1>New and trending</h1>
          <p>Based on player counts and release date</p>
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

export default LastDays;
