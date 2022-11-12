import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import illustrtaionImage from "../assets/media/img/authentication/Illustration.png";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { useLoginMutation } from "../features/auth/authApi";

export default function Login() {
  const [submitButtonName, setSubmitButtonName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  useEffect(() => {
    if (responseError?.data) {
      const errorMessage = responseError?.data?.error?.message;
      enqueueSnackbar(
        errorMessage === "2 errors occurred"
          ? "Fill up Full Form to Login"
          : errorMessage,
        {
          variant: "error",
        }
      );
    }
  }, [data, responseError, enqueueSnackbar]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (submitButtonName === "auto-login") {
      login({
        identifier: "user1@gmail.com",
        password: "123456",
      });
    } else {
      login({
        identifier: email,
        password,
      });
    }
  };
  return (
    <>
      <Breadcrumbs
        previousUrl="/"
        previousPageName="Home"
        currentPageName="Log in"
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
                      <p className="title">log in</p>
                      {/* <p>
                        Not registered?{" "}
                        <Link
                          to="/register"
                          state={{ from: location?.state?.from }}
                          className="blue"
                        >
                          create a new account
                        </Link>
                      </p> */}
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
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        className="form-control"
                        name="pass"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {/* <span
                          href="forgot-password.html"
                          className="float-right forgot-pass"
                        >
                          Forgot Password?
                        </span> */}
                    {/* <button type="submit" className="auth-btn">
                          Log in
                        </button> */}
                    <div className="text p-0 ">
                      <p className="d-block float-left pb-3">
                        Not registered?{" "}
                        <Link
                          to="/register"
                          state={{ from: location?.state?.from }}
                          className="blue"
                        >
                          Sign Up
                        </Link>
                      </p>
                      <p className="d-block float-right pb-3">
                        <Link
                          to="/forgot-password"
                          state={{ from: location?.state?.from }}
                          style={{
                            textDecoration: "none",
                            color: "rgb(211 134 0)",
                          }}
                        >
                          Forgot Password ?
                        </Link>
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="auth-btn"
                      disabled={isLoading}
                      onClick={() => setSubmitButtonName("default-login")}
                    >
                      Sign in
                    </button>
                    <div className="alter">
                      <p className="title">or</p>
                      <button
                        type="submit"
                        className="auth-btn"
                        disabled={isLoading}
                        onClick={() => setSubmitButtonName("auto-login")}
                      >
                        Log in as Chris Evans
                      </button>
                      {/* <p>Log in With</p> */}
                      {/* <div className="social-site">
                          <span>
                            <i className="fab fa-facebook-f"></i>
                          </span>
                          <span>
                            <i className="fab fa-google"></i>
                          </span>
                        </div> */}
                    </div>
                    {/* <!-- Alernative --> */}
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
