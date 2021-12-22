import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../Components/Card/Card";

const Home = ({ params, setParams }) => {
  const [hasMore, sethasMore] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/games/all", {
          page: 1,
          page_result: 50,
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  const fetchNewData = async () => {
    console.log(params);
    try {
      const res = await axios.post(`http://localhost:3001/games`, {
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

export default Home;
