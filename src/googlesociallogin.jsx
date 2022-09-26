import React from "react";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

function Glogin() {
  const [user, setuser] = useState({});

  const handlecallbackresponse = (response) => {
    console.log("Token:" + response.credential);

    var userobject = jwt_decode(response.credential);
    console.log("Token:" + userobject);
    setuser(userobject);
    document.getElementById("signindiv").hidden = true;
  };

  const handlesignout = (event) => {
    setuser({});
    console.log("log out Successful" + event);
    document.getElementById("signindiv").hidden = false;
  };

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id:
        "562677907760-7m99omjeao1ebmgn1ms024mp3pufpcmj.apps.googleusercontent.com",
      callback: handlecallbackresponse,
    });

    google.accounts.id.renderButton(document.getElementById("signindiv"), {
      theme: "outline",
      size: "larze",
    });
  }, []);

  return (
    <>
      <div id="signindiv"></div>
      {user && (
        <div>
          <img src={user.picture} alt="profile of your google account" />
          <h3>{user.name}</h3>
        </div>
      )}
      <div>
        {Object.keys(user).length !== 0 && (
          <button onClick={(e) => handlesignout(e)}>Sign out</button>
        )}
      </div>
    </>
  );
}
export default Glogin;
