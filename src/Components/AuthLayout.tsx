import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Custom/Loader/Loader";

const Protected = ({ children, authentication = true }: any) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const authStatus = useSelector((state: any) => state.auth?.status);

  useEffect(() => {
    if (authentication || authStatus === false) {
      navigate("/login");
    } else if (authentication && authStatus === true) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return <>{loader ? <Loader /> : children}</>;
};

export default Protected;
