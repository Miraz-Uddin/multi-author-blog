import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { useRegisterMutation } from "../features/auth/authApi";
import checkImageFileType from "../utils/checkImageFileType";
import getFullName from "../utils/getFullName";

export default function Register() {
  const { enqueueSnackbar } = useSnackbar();
  const [register, { data, isLoading, error: responseError }] =
    useRegisterMutation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Avatar Upload
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    const isMimeTypeOk = checkImageFileType(e.target, "imagePreview");
    if (isMimeTypeOk) {
      setFile(e.target.files[0]);
    } else {
      enqueueSnackbar("Invalid file type", {
        variant: "error",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      enqueueSnackbar("Passwords do not match", {
        variant: "error",
      });
    } else if (agreed === false) {
      enqueueSnackbar("Mark the Agreement to proceed", {
        variant: "error",
      });
    } else {
      const fullname = getFullName(firstName, lastName);
      register({
        necessaryData: {
          username,
          email,
          password,
        },
        optionalData: { fullname, file },
      });
    }
  };

  useEffect(() => {
    if (responseError?.data) {
      const errorMessage = responseError?.data?.error?.message;
      enqueueSnackbar(
        errorMessage === "3 errors occurred"
          ? "Fill up Full Form to Register"
          : errorMessage,
        {
          variant: "error",
        }
      );
    }
    if (data?.jwt && data?.user) {
      navigate("/");
      enqueueSnackbar("User Registration Succeeded", {
        variant: "success",
      });
    }
  }, [data, responseError, navigate, enqueueSnackbar]);

  return (
    <>
      <Breadcrumbs
        previousUrl="/"
        previousPageName="Home"
        currentPageName="Register"
      />
      <section className="py_80 bg_secondery full_row">
        <div className="container">
          <div className="my_skill" id="authentication">
            <form className="signup-form auth-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 col-lg-12 col-xl-6">
                  <div className="skill-progress wow animated slideInLeft">
                    <div className="text">
                      <p className="title">Register</p>
                      <p>
                        Already have an account?&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/login" className="blue">
                          Log in Instead
                        </Link>
                      </p>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
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
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name="pass"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name="repass"
                        placeholder="Re-type Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {/* <div className="form-group">
                      <p className="terms">
                        <input
                          id="agree"
                          name="agree"
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <label
                          htmlFor="agree"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          By signing up, you agree to our{" "}
                          <span> Terms of Use</span>
                        </label>
                      </p>
                    </div> */}
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 col-xl-6">
                  <div className="skill-progress wow animated slideInRight">
                    <div className="section_title_1 text-center mx-auto wow animated slideInUp">
                      <h2 className="title text-uppercase">
                        <span className="line_double mx-auto color_default">
                          Optional Fields
                        </span>
                      </h2>
                    </div>
                    <div
                      id="imagePreview"
                      style={{
                        margin: "auto",
                        width: "12.8rem",
                        height: "14.3rem",
                      }}
                    >
                      <figure className="figure">
                        <img
                          src={window.origin + "/images/author/user.jpg"}
                          alt="preview author"
                          className="custom-avatar"
                        />
                      </figure>
                    </div>
                    <div>
                      <label
                        className="btn btn-success btn-block mb-3"
                        style={{ textTransform: "capitalize" }}
                        htmlFor="avatar"
                      >
                        Click to Upload User's Avatar
                      </label>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        name="avatar"
                        id="avatar"
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-5 m-auto">
                  <div className="form-group">
                    <p className="terms">
                      <input
                        id="agree"
                        name="agree"
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                      />
                      <label
                        htmlFor="agree"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        I've read & agree to all{" "}
                        <span> terms & conditions </span>
                      </label>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="auth-btn"
                    disabled={isLoading}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
