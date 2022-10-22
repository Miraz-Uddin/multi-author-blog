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
import ThemeChanger from "./components/ui/ThemeChanger";
import { useGetHeaderInfoQuery } from "./features/head/headAPI";
import useAuthCheck from "./hooks/useAuthCheck";
import Blogs from "./pages/Blogs";
import Construction from "./pages/Construction";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import SingleBlog from "./pages/SingleBlog";
import Copyright from "./sections/Copyright";
import MainNavigation from "./sections/MainNavigation/MainNavigation";

function App() {
  const authChecked = useAuthCheck();
  let faviconURL;
  let headTitle;
  const { data, isLoading, hasError } = useGetHeaderInfoQuery();
  if (isLoading || (!isLoading && hasError)) {
    faviconURL = "./images/favicon.ico";
    headTitle = "Portfolio";
  }
  if (!isLoading && !hasError) {
    faviconURL = data?.data?.attributes?.head_favicon?.data?.attributes?.url;
    headTitle = data?.data?.attributes?.head_title;
  }

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
  }, []);

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = faviconURL;
  }, [faviconURL]);
  useEffect(() => {
    let link = document.querySelector("title");
    if (!link) {
      link = document.createElement("title");
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.innerHTML = headTitle;
  }, [headTitle]);

  return !authChecked ? (
    <></>
  ) : (
    <>
      <Router>
        <ThemeChanger />
        <div id="page_wrapper">
          <div className="row">
            <MainNavigation />
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
            <Copyright />
          </div>
        </div>
        <span className="scrollToTop" onClick={() => scroll.scrollToTop()}>
          <i className="fa fa-arrow-up"></i>
        </span>
      </Router>
    </>
  );
}

export default App;
