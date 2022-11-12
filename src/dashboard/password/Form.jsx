import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../features/auth/authApi";

export default function Form() {
  const { enqueueSnackbar } = useSnackbar();
  const [changePassword, { data, isLoading, error: responseError }] =
    useChangePasswordMutation();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (oldPassword === "" || password === "" || confirmPassword === "") {
      enqueueSnackbar("Please Fillup All Field", {
        variant: "info",
      });
    } else if (confirmPassword !== password) {
      enqueueSnackbar("New & Re-type New Password Mismatched", {
        variant: "warning",
      });
    } else if (password.trim().length < 6) {
      enqueueSnackbar("New Password must be atleast 6 Characters", {
        variant: "warning",
      });
    } else {
      changePassword({
        currentPassword: oldPassword,
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
      enqueueSnackbar("Password Changed Successfully", {
        variant: "success",
      });
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [data, responseError, navigate, enqueueSnackbar]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="oldpass"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
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
        <button type="submit" className="btn btn-info" disabled={isLoading}>
          Change Password
        </button>
      </form>
    </>
  );
}
