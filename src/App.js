// Import sheets
import "./App.css";
import "./assets/font/stylesheet.css";

// Import packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Import Pages & Components
import Home from "./Pages/Home/Home";
import NoMatch from "./Pages/NoMatch/NoMatch";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import Header from "./Components/Header/Header";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({ page: page, page_size: 20 });

  return (
    <Router>
      <Header />
      <NavBar params={params} setParams={setParams} />
      <Routes>
        {/* Home page  */}
        <Route
          path="/"
          element={
            <Home
              setPage={setPage}
              page={page}
              params={params}
              setParams={setParams}
            />
          }
        />

        {/* Users pages */}
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<SignUp />} />

        {/* Default 404 page */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
