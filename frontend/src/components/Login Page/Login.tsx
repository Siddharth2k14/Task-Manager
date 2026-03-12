import { useState, useEffect } from "react";
import "../../Styles/Auth.style.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; password?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Timer for loading screen
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

  // Form validation
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

  // Login handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user
      dispatch(login(data));
      localStorage.setItem("user", JSON.stringify(data));

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Login Successful!");
      navigate("/tasks");

    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid username or password");
    }

    setLoading(false);
  };
  // Loading screen
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

        <h2 className="login">Login</h2>

        <form onSubmit={handleSubmit} className="login-form">

          <label className="form-label">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="form-text">
            Create an account? <Link to="/register">Register</Link>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Login;