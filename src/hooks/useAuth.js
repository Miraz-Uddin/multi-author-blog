import { useSelector } from "react-redux";

function useAuth() {
  const auth = useSelector((state) => state.auth);
  if (auth?.user?.id && auth?.jwt) return true;
  return false;
}

export default useAuth;
