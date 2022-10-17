import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../features/auth/authSlice";

export default function Footer() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth) || {};
  const handleLogOut = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };

  let content = <span> All rights reserved.</span>;
  if (user) {
    content = (
      <span style={{ cursor: "pointer" }} onClick={handleLogOut}>
        Click to Logout
      </span>
    );
  }
  return (
    <footer className="p_20 color_primary bg_secondery text-center full_row">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="copyright">
              <p>
                <span>Copyright &copy; 2022 Miraz Uddin.{content}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
