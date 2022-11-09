import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { userLoggedOut } from "../features/auth/authSlice";
import { useGetProfileQuery } from "../features/profile/profileAPI";
import styles from "./custom.module.css";
export default function Dashboard({ content, activeBtn }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth) || {};
  const { data: profile } = useGetProfileQuery(user?.id);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  const displayBlogs = useCallback(
    () => navigate("/dashboard/blogs", { replace: true }),
    [navigate]
  );
  const displayTags = useCallback(
    () => navigate("/dashboard/tags", { replace: true }),
    [navigate]
  );
  const displayComments = useCallback(
    () => navigate("/dashboard/comments", { replace: true }),
    [navigate]
  );
  const displayProfile = useCallback(
    () => navigate("/dashboard/profile", { replace: true }),
    [navigate]
  );

  return (
    <>
      <>
        <Breadcrumbs
          previousUrl="/"
          previousPageName="Home"
          currentPageName="Dashboard"
        />

        <section className="py_80 bg_secondery full_row">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h4 className="text-center">
                  Welcome to {profile?.data?.[0]?.attributes?.fullname}'s
                  Dashboard
                </h4>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="my_skill" id="authentication">
              <div className="row">
                <div className="col-sm-12 col-md-5 col-lg-3">
                  <div
                    className={`nav flex-column nav-pills ${styles.sidebar}`}
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <span
                      className={`${styles.button} nav-link ${
                        activeBtn === "blogs" ? "active" : ""
                      }  w-75`}
                      onClick={displayBlogs}
                    >
                      <span className="d-flex justify-content-between">
                        <span>blogs</span>
                        <Link to={"/dashboard/blogs/create"}>
                          <span className={`addButton ${styles.addButton}`}>
                            <i className="fa fa-plus"></i>{" "}
                          </span>
                        </Link>
                      </span>
                    </span>
                    <span
                      className={`${styles.button} nav-link ${
                        activeBtn === "tags" ? "active" : ""
                      } w-75`}
                      onClick={displayTags}
                    >
                      <span className="d-flex justify-content-between">
                        <span>tags</span>
                        <Link to={"/dashboard/tags/create"}>
                          <span className={`addButton ${styles.addButton}`}>
                            <i className="fa fa-plus"></i>{" "}
                          </span>
                        </Link>
                      </span>
                    </span>
                    <span
                      className={`${styles.button} nav-link ${
                        activeBtn === "comments" ? "active" : ""
                      } w-75`}
                      onClick={displayComments}
                    >
                      <span className="d-flex justify-content-between">
                        <span>comments</span>
                      </span>
                    </span>
                    <span
                      className={`${styles.button} nav-link ${
                        activeBtn === "profile" ? "active" : ""
                      } w-75 `}
                      onClick={displayProfile}
                    >
                      <span className="d-flex justify-content-between">
                        <span>profile</span>
                      </span>
                    </span>
                    <span
                      className={`${styles.button} nav-link w-75 `}
                      style={{ cursor: "pointer" }}
                      onClick={handleLogOut}
                    >
                      Logout
                    </span>
                  </div>
                </div>
                <div className="col-sm-12 col-md-7 col-lg-9">{content}</div>
              </div>
            </div>
          </div>
        </section>
      </>
      <Outlet />
    </>
  );
}
