import "./releaseCalendar.css";

import getDate from "../../../assets/functions/getDate";
import getFormatDate from "../../../assets/functions/getFormatDate";
import moment from "moment";
import axios from "axios";
import Card from "../../../Components/Card/Card";
import { useEffect, useState } from "react";

const ReleaseCalendar = () => {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState(getDate());
  const [params, setParams] = useState({
    page_size: 100,
    dates: getFormatDate(),
  });

  const handleDates = (number) => {
    if (!number) {
      setParams({
        page_size: 50,
        dates: `${moment().startOf("month").format().slice(0, 10)},${moment()
          .endOf("month")
          .format()
          .slice(0, 10)}
        `,
      });
    } else if (number <= 0) {
      setParams({
        page_size: 50,
        dates: `${moment()
          .subtract(Math.abs(number), "month")
          .startOf("month")
          .format()
          .slice(0, 10)},${moment()
          .subtract(Math.abs(number), "month")
          .endOf("month")
          .format()
          .slice(0, 10)}
        `,
      });
    } else {
      return setParams({
        page_size: 50,
        dates: `${moment()
          .add(number, "month")
          .startOf("month")
          .format()
          .slice(0, 10)},${moment()
          .add(number, "month")
          .endOf("month")
          .format()
          .slice(0, 10)}
        `,
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/games/all", {
          params,
        });
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, [params]);

  return (
    <div className="global-container">
      <div className="withnav-container">
        <div className="home-content">
          <h1>Release calendar - {dates} </h1>
          <nav className="realease-calendar-nav">
            <button
              className={dates === getDate(-4) ? "selected" : "unSelected"}
              onClick={() => {
                handleDates(-4);
                setDates(getDate(-4));
              }}
            >
              {getDate(-4)}
            </button>
            <button
              className={dates === getDate(-3) ? "selected" : "unSelected"}
              onClick={() => {
                handleDates(-3);
                setDates(getDate(-3));
              }}
            >
              {getDate(-3)}
            </button>
            <button
              className={dates === getDate(-2) ? "selected" : "unSelected"}
              onClick={() => {
                handleDates(-2);
                setDates(getDate(-2));
              }}
            >
              {getDate(-2)}
            </button>
            <button
              className={dates === getDate(-1) ? "selected" : "unSelected"}
              onClick={() => {
                handleDates(-1);
                setDates(getDate(-1));
              }}
            >
              {getDate(-1)}
            </button>
            <button
              className={dates === getDate() ? "selected" : "unSelected"}
              onClick={() => {
                handleDates();
                setDates(getDate());
              }}
            >
              {getDate()}
            </button>
            <button
              className={dates === getDate(1) ? "selected" : "unSelected"}
              onClick={() => {
                handleDates(1);
                setDates(getDate(1));
              }}
            >
              {getDate(1)}
            </button>
            <button
              className={dates === getDate(2) ? "selected" : "unSelected"}
              onClick={() => {
                handleDates(2);
                setDates(getDate(2));
              }}
            >
              {getDate(2)}
            </button>
            <button
              className={dates === getDate(3) ? "selected" : "unSelected"}
              onClick={() => {
                handleDates(3);
                setDates(getDate(3));
              }}
            >
              {getDate(3)}
            </button>
            <button
              className={dates === getDate(4) ? "selected" : "unSelected"}
              onClick={() => {
                handleDates(4);
                setDates(getDate(4));
              }}
            >
              {getDate(4)}
            </button>
          </nav>

          <button className="home-content-btn">
            Order by : <span className="underline">Revelance</span>
          </button>
          <section>
            <div>
              <div className="">
                <div className="home-content-flex">
                  <Card data={data} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReleaseCalendar;
