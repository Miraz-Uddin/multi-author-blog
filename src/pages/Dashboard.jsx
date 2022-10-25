import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import BlogIndex from "../dashboard/blog/BlogIndex";
import CommentIndex from "../dashboard/comment/CommentIndex";
import ProfileIndex from "../dashboard/profile/ProfileIndex";
import { userLoggedOut } from "../features/auth/authSlice";
import { useGetProfileQuery } from "../features/profile/profileAPI";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth) || {};
  const { data: profile } = useGetProfileQuery(user?.id);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  return (
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
              <div className="col-md-2">
                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link active"
                    id="v-pills-blog-tab"
                    data-toggle="pill"
                    href="#v-pills-blog"
                    role="tab"
                    aria-controls="v-pills-blog"
                    aria-selected="true"
                  >
                    blog
                  </a>

                  <a
                    className="nav-link"
                    id="v-pills-comment-tab"
                    data-toggle="pill"
                    href="#v-pills-comment"
                    role="tab"
                    aria-controls="v-pills-comment"
                    aria-selected="false"
                  >
                    comment
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-toggle="pill"
                    href="#v-pills-profile"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Profile
                  </a>
                  <span
                    className="nav-link"
                    data-toggle="pill"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogOut}
                  >
                    Logout
                  </span>
                </div>
              </div>
              <div className="col-md-10">
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-blog"
                    role="tabpanel"
                    aria-labelledby="v-pills-blog-tab"
                  >
                    <BlogIndex />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <ProfileIndex profile={profile?.data?.[0]?.attributes} />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-comment"
                    role="tabpanel"
                    aria-labelledby="v-pills-comment-tab"
                  >
                    <CommentIndex />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
