import { useState, useEffect } from "react";
import "../../Styles/Auth.style.css";

export const Login = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; password?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (loading) {
      setTimer(0);

      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  const validateForm = () => {
    const newErrors: { name?: string; password?: string } = {};

    if (!name) {
      newErrors.name = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      console.log("Username:", name);
      console.log("Password:", password);

      alert("Login Successful!");

      setLoading(false);
      setName("");
      setPassword("");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Logging in...</h2>
        <p>Please wait ({timer}s)</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="login-card">

        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">Login</button>

        </form>

      </div>
    </div>
  );
};