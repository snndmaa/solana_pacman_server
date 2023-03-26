import { React, useState } from "react";
import "./login.css";

const sessionsUrl = process.env.REACT_APP_URL
  ? `${process.env.REACT_APP_URL}/sessions`
  : "http://localhost:9000/sessions";

const redirectUrl = process.env.REACT_APP_URL
  ? process.env.REACT_APP_URL
  : "http://localhost:3000";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleEnter = (event) => {
    const buttonEl = document.querySelector("#login-button");
    if (event.key === "Enter") buttonEl.click();
  };

  const handleSubmit = () => {
    fetch(sessionsUrl, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = redirectUrl;
        } else {
          throw response;
        }
      })
      .catch((err) => {
        setError(err.statusText);
      });
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      <div className="border">
        <input
          placeholder="Username"
          onChange={handleUsername}
          onKeyDown={handleEnter}
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          onKeyDown={handleEnter}
        ></input>
        <br></br>
        <button id="login-button" onClick={handleSubmit}>
          Log in
        </button>
        <p className="error-message">{error}</p>
      </div>
    </div>
  );
}
