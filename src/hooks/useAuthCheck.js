import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let auth = JSON.parse(localStorage.getItem("auth"));
    if (auth && auth.user && auth.jwt) {
      dispatch(userLoggedIn({ user: auth.user, jwt: auth.jwt }));
    }
    setAuthChecked(true);
  }, [dispatch]);

  return authChecked;
}
