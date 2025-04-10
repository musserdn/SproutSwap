/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { setToken } from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { error }] = useMutation(LOGIN_USER);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        data: {
          login: { token },
        },
      } = await login({ variables: { email, password } });

      setToken(token);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  // Emotion CSS for the button
  const buttonStyle = css`
    background-color: green; /* Blue background */
    color: white; /* White text */
    border: none; /* Remove default border */
    border-radius: 4px; /* Rounded corners */
    padding: 10px 20px; /* Add padding */
    font-size: 16px; /* Increase font size */
    cursor: pointer; /* Pointer cursor on hover */
    transition: background-color 0.3s ease; /* Smooth hover effect */
    min-width: 100px; /* Ensure the button has a minimum width */

    &:hover {
      background-color: #84b254;
    }

    &:active {
      background-color: #53351d;
    }
  `;

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Apply the Emotion CSS to the button */}
        <button type="submit" css={buttonStyle}>
          Login
        </button>
      </form>

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default Login;
