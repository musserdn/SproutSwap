import styles from "./Login.module.css";
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

  const buttonStyle = css`
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    min-width: 100px;

    &:hover {
      background-color: #84b254;
    }

    &:active {
      background-color: #53351d;
    }
  `;

  return (
    <div className={styles.loginContainer}>
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

        <button type="submit" css={buttonStyle}>
          Login
        </button>
      </form>

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default Login;
