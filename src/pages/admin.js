import { useEffect, useState } from "react";

import { auth } from "../js/admin";
import { onAuthStateChanged } from "firebase/auth";

import SimpleHeader from "../components/SimpleHeader";
import BackBar from "../components/BackBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Login from "../components/admin/Login";
import Form from "../components/admin/Form";

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
      <SimpleHeader>Admin</SimpleHeader>
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
