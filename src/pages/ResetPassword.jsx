import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import illustrtaionImage from "../assets/media/img/authentication/Illustration.png";
import Breadcrumbs from "../components/ui/Breadcrumbs";

export default function ResetPassword() {
  const { enqueueSnackbar } = useSnackbar();
  //   const [register, { data, isLoading, error: responseError }] =
  //     useRegisterMutation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      enqueueSnackbar("Passwords do not match", {
        variant: "error",
      });
    } else {
      console.log("password update");
    }
  };

  //   useEffect(() => {
  //     if (responseError?.data) {
  //       const errorMessage = responseError?.data?.error?.message;
  //       enqueueSnackbar(
  //         errorMessage === "3 errors occurred"
  //           ? "Fill up Full Form to Register"
  //           : errorMessage,
  //         {
  //           variant: "error",
  //         }
  //       );
  //     }
  //     if (data?.jwt && data?.user) {
  //       navigate("/");
  //       enqueueSnackbar("User Registration Succeeded", {
  //         variant: "success",
  //       });
  //     }
  //   }, [data, responseError, navigate, enqueueSnackbar]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setError("");
  //     if (isValidEmail(email.trim())) {
  //       setEmail(email.trim());
  //       forgotPassword({
  //         email: email.trim(),
  //       });
  //     } else {
  //       enqueueSnackbar("Please Give a Valid Email", { variant: "error" });
  //     }
  //   };

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
                      //   disabled={isLoading}
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
