import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appWrite/auth";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    alert("Logging out...");
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <button
      onClick={handleLogout}
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 dark:text-white hover:dark:text-black rounded-full"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
