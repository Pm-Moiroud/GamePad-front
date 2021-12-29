// Import sheets
import "./App.css";
import "./assets/font/stylesheet.css";

// Import packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// Import Pages & Components
import Home from "./Pages/Home/Home";
import NoMatch from "./Pages/NoMatch/NoMatch";
import Header from "./Components/Header/Header";
import NavBar from "./Components/NavBar/NavBar";
import LastDays from "./Pages/Discover/LastDays/LastDays";
import ThisWeek from "./Pages/Discover/ThisWeek/ThisWeek";
import NextWeek from "./Pages/Discover/NextWeek/NextWeek";
import BestYear from "./Pages/Discover/BestYear/BestYear";
import PopularYear from "./Pages/Discover/PopularYear/PopularYear";
import AllTimeTop from "./Pages/Discover/AllTimeTop/AllTimeTop";
import ReleaseCalendar from "./Pages/Discover/ReleaseCalendar/ReleaseCalendar";
import Signin from "./Pages/Signin/Signin";

import Private from "./Pages/Private/Private";
import PrivateDashboard from "./Pages/Private/PrivateDashboard/PrivateDashboard";
import Signup from "./Pages/Signup/Signup";
import Search from "./Pages/Search/Search";
import Game from "./Pages/Game/Game";
import Genres from "./Pages/Discover/Genres/Genres";

function App() {
  const [defaultParams, setDefaultParams] = useState({});
  const [params, setParams] = useState({
    page: 1,
    page_size: 40,
    ordering: "-ranking",
    genres: "adventure",
  });

  return (
    <Router>
      <Header
        defaultParams={defaultParams}
        setDefaultParams={setDefaultParams}
      />
      <NavBar setParams={setParams} params={params} />
      <Routes>
        {/* Home page  */}
        <Route path="/" element={<Home />} />
        {/* Search page */}
        <Route path="/discover/last-30-days" element={<LastDays />} />
        <Route path="/discover/this-week" element={<ThisWeek />} />
        <Route path="/discover/next-week" element={<NextWeek />} />
        <Route path="/discover/best-of-the-year" element={<BestYear />} />
        <Route path="/discover/popular-this-year" element={<PopularYear />} />
        <Route path="/discover/all-time-top" element={<AllTimeTop />} />
        <Route
          path="/discover/release-calendar"
          element={<ReleaseCalendar />}
        />
        <Route
          path="/discover/genres/:genres"
          element={<Genres setParams={setParams} params={params} />}
        />
        <Route
          path="/search=:input"
          element={
            <Search
              defaultParams={defaultParams}
              setDefaultParams={setDefaultParams}
            />
          }
        />
        <Route path="/game/:id" element={<Game />} />

        {/* Users pages */}
        <Route path="/user/signin" element={<Signin />} />
        <Route path="/user/signup" element={<Signup />} />

        {/* Users private pages */}
        <Route path="/private" element={<Private />}>
          <Route path="/private/dashboard" element={<PrivateDashboard />} />
        </Route>
        {/* Default 404 page */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
