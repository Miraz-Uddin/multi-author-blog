import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "../node_modules/slick-carousel/slick/slick.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
// import ThemeChanger from "./components/ui/ThemeChanger";
import { animateScroll as scroll } from "react-scroll";
import BlogCreate from "./dashboard/blog/BlogCreate";
import BlogEdit from "./dashboard/blog/BlogEdit";
import CommentEdit from "./dashboard/comment/CommentEdit";
import ProfileEdit from "./dashboard/profile/ProfileEdit";
import { useGetHeaderInfoQuery } from "./features/head/headAPI";
import useAuthCheck from "./hooks/useAuthCheck";
import Blogs from "./pages/Blogs";
import Construction from "./pages/Construction";
import Dashboard from "./pages/Dashboard";
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
  const { data, isLoading, isError } = useGetHeaderInfoQuery();
  if (isLoading || (!isLoading && isError)) {
    faviconURL = "./images/favicon.ico";
    headTitle = "Portfolio";
  }
  if (!isLoading && !isError) {
    faviconURL = data?.data?.attributes?.head_favicon?.data?.attributes?.url;
    headTitle = data?.data?.attributes?.head_title;
  }

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

  const handleScroll = (evt) => {
    const scrolledValue = window.scrollY;
    if (scrolledValue >= 150) {
      document.querySelector(".scrollToTop").classList.add("visible");
      document.querySelector(".main_nav").classList.add("nav-scroll");
    } else {
      document.querySelector(".scrollToTop").classList.remove("visible");
      document.querySelector(".main_nav").classList.remove("nav-scroll");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  return !authChecked ? (
    <></>
  ) : (
    <>
      <Router>
        {/* <ThemeChanger /> */}
        <div id="page_wrapper" name="home">
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
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/blogs/:blogId/edit"
                element={
                  <PrivateRoute>
                    <BlogEdit />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/blogs/create"
                element={
                  <PrivateRoute>
                    <BlogCreate />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/comments/:commentId/edit"
                element={
                  <PrivateRoute>
                    <CommentEdit />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/profile/:profileId/edit"
                element={
                  <PrivateRoute>
                    <ProfileEdit />
                  </PrivateRoute>
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
        <span
          className="scrollToTop"
          onClick={() => scroll.scrollToTop()}
          // style={{
          //   color: `${mode === "normal" ? "#1e283c" : "#fff"}`,
          //   backgroundColor: `${mode === "normal" ? "#fff" : "#1e283c"}`,
          // }}
        >
          <i
            className="fa fa-arrow-up"
            // style={{ color: `${mode === "normal" ? "#1e283c" : "#fff"}` }}
          ></i>
        </span>
      </Router>
    </>
  );
}

export default App;
