import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appWrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./Components";
import { Outlet } from "react-router-dom";
import Loader from "./Components/Custom/Loader/Loader";
import Container from "./Components/Container/Container";
import { ToastContainer } from "react-toastify";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer />
          <div className="space-y-4">
            <Header />
            <Container className="flex-grow ">
              <Outlet />
            </Container>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
