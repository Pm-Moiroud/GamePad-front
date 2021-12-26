// Import sheets
import "./App.css";
import "./assets/font/stylesheet.css";

// Import packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <Router>
      <Header />
      <NavBar />
      <Routes>
        {/* Home page  */}
        <Route path="/" element={<Home />} />
        {/* Search page */}
        <Route path="/discover/last-30-days" element={<LastDays />} />
        <Route path="discover/this-week" element={<ThisWeek />} />
        <Route path="discover/next-week" element={<NextWeek />} />
        <Route path="discover/best-of-the-year" element={<BestYear />} />
        <Route path="discover/popular-this-year" element={<PopularYear />} />
        <Route path="discover/all-time-top" element={<AllTimeTop />} />

        <Route path="discover/release-calendar" element={<ReleaseCalendar />} />
        {/* Users pages */}
        {/* Default 404 page */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
