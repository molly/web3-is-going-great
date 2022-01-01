import React, { useEffect, useState } from "react";

import { auth } from "../../js/admin";
import { onAuthStateChanged } from "firebase/auth";

import BackBar from "../shared/BackBar";
import Footer from "../shared/Footer";
import Loader from "../shared/Loader";
import Login from "../admin/Login";
import Form from "../admin/Form";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    });
  });

  return (
    <>
      <header className="page-header">
        <h1>Admin</h1>
      </header>
      <BackBar />
      <div className="content-wrapper admin">
        <article className="generic-page">
          {isLoggedIn === null && <Loader />}
          {isLoggedIn === false && <Login />}
          {isLoggedIn && <Form />}
        </article>
      </div>
      <Footer />
    </>
  );
}
