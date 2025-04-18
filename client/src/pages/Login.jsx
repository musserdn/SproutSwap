import styles from "./Login.module.css";
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

  return (
    <div className={`${styles.loginContainer} container-sm`}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-full">
          Login
        </button>
      </form>

      {error && <div className="error-message">{error.message}</div>}
    </div>
  );
};

export default Login;
