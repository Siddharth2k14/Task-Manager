import { useState, useEffect } from "react";
import "../../Styles/Auth.style.css";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  // Loading timer
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
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name) {
      newErrors.name = "Username is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Register handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://task-manager-iota-five-76.vercel.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("User registered:", data);

      alert("Registration Successful!");

      // Reset fields
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed");
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Registering...</h2>
        <p>Please wait ({timer}s)</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="login-card">

        <h2 className="login">Register</h2>

        <form onSubmit={handleSubmit} className="login-form">

          <label className="form-label">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <button type="submit">Register</button>

        </form>

      </div>
    </div>
  );
};

export default Register;