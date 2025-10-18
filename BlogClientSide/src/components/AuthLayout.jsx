/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";

export default function AuthLayout({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

 const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (authentication && !isAuthenticated) {
      navigate("/login");
    } else if (!authentication && isAuthenticated) {
      navigate("/");
    }
    setLoader(false);
  }, [authentication, isAuthenticated, navigate]);

  return loader ? (
    <div className="flex justify-center items-center h-screen">
      <ReactLoading type="bars" color="#00ffff" height={100} width={100} />
    </div>
  ) : (
    <>{children}</>
  );
}
