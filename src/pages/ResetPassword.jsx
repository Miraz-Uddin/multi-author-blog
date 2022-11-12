import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import illustrtaionImage from "../assets/media/img/authentication/Illustration.png";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { useResetPasswordMutation } from "../features/auth/authApi";

export default function ResetPassword() {
  const { enqueueSnackbar } = useSnackbar();
  const [resetPassword, { data, isLoading, error: responseError }] =
    useResetPasswordMutation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [params] = useSearchParams();
  const resetCode = params.get("code");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "") {
      enqueueSnackbar("Please Fillup All Field", {
        variant: "info",
      });
    } else if (confirmPassword !== password) {
      enqueueSnackbar("Passwords do not match", {
        variant: "warning",
      });
    } else if (password.trim().length < 6) {
      enqueueSnackbar("Password must be atleast 6 Characters", {
        variant: "warning",
      });
    } else {
      resetPassword({
        code: resetCode,
        password,
        passwordConfirmation: confirmPassword,
      });
    }
  };

  useEffect(() => {
    if (responseError?.data) {
      const errorMessage = responseError?.data?.error?.message;
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    }
    if (data) {
      navigate("/login");
      enqueueSnackbar("Your user's password has been reset.", {
        variant: "success",
      });
    }
  }, [data, responseError, navigate, enqueueSnackbar]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Breadcrumbs
        previousUrl="/"
        previousPageName="Home"
        currentPageName="Password Reset"
      />
      <section className="py_80 bg_secondery full_row">
        <div className="container">
          <div className="my_skill" id="authentication">
            <div className="row">
              <div className="col-md-6 ">
                <div className="image wow animated slideInLeft">
                  <img src={illustrtaionImage} alt="" />
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="skill-progress wow animated slideInRight">
                  <form
                    className="login-form auth-form"
                    onSubmit={handleSubmit}
                  >
                    <div className="text">
                      <p className="title">Password Reset</p>
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name="pass"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name="repass"
                        placeholder="Re-type New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="auth-btn"
                      disabled={isLoading}
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
