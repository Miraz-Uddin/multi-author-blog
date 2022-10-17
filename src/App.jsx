import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "../node_modules/slick-carousel/slick/slick.css";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import Blogs from "./pages/Blogs";
import Construction from "./pages/Construction";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import SingleBlog from "./pages/SingleBlog";
import Footer from "./sections/Footer";
import MainNav from "./sections/MainNav";

function App() {
  const authChecked = useAuthCheck();

  const handleScroll = (evt) => {
    const scrolledValue = window.scrollY;
    if (scrolledValue >= 600) {
      document.querySelector(".scrollToTop").classList.add("visible");
    } else {
      document.querySelector(".scrollToTop").classList.remove("visible");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  });

  return !authChecked ? (
    <div>Checking Authentication....</div>
  ) : (
    <>
      <Router>
        <div id="page_wrapper">
          <div className="row">
            <MainNav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coming-soon" element={<Construction />} />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:blogId" element={<SingleBlog />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
              <Route path="/books" element={<Navigate to="/coming-soon" />} />
              <Route path="/courses" element={<Navigate to="/coming-soon" />} />
              <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
            <Footer />
          </div>
        </div>
        <span className="scrollToTop" onClick={() => scroll.scrollToTop()}>
          <i className="fa fa-chevron-up"></i>
        </span>
      </Router>
    </>
  );
}

export default App;
