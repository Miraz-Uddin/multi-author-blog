import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import illustrtaionImage from "../assets/media/img/authentication/Illustration.png";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { useForgotPasswordMutation } from "../features/auth/authApi";
import isValidEmail from "../utils/isValidEmail";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const [forgotPassword, { data, isLoading, error: responseError }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (responseError?.data) {
      const errorMessage = responseError?.data?.error?.message;
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    }
    if (data) {
      enqueueSnackbar("Password Reset Link Sent. Please Check Email", {
        variant: "info",
      });
      navigate("/login");
    }
  }, [data, responseError, enqueueSnackbar, navigate]);

  useEffect(() => {
    enqueueSnackbar("Give Your Email to Reset Password", {
      variant: "info",
    });
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (isValidEmail(email.trim())) {
      setEmail(email.trim());
      forgotPassword({
        email: email.trim(),
      });
    } else {
      enqueueSnackbar("Please Give a Valid Email", { variant: "error" });
    }
  };

  return (
    <>
      <Breadcrumbs
        previousUrl="/"
        previousPageName="Home"
        currentPageName="Forgot Password"
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
                      <p className="title">Reset Password</p>
                    </div>
                    {error !== "" && (
                      <p className="orange pb-2">
                        <b>{error}</b>
                      </p>
                    )}
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name=""
                        placeholder="Give Your Email to Send Reset Link"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="auth-btn"
                      disabled={isLoading}
                    >
                      Send Password Reset Link
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
