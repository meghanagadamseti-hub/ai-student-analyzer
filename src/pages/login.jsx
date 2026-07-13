import { useState } from "react";
import background from "../assets/background.png";
import "../styles/login.css";

import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
function Login() {
  // Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error States
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Show/Hide Password
  const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (email.trim() === "") {
      setEmailError("Email is required");
      valid = false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character."
      );
      valid = false;
    }

    if (valid) {
  alert("Login Successful!");

  console.log(email);
  console.log(password);

  navigate("/dashboard");
}
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      alert(`Welcome ${result.user.displayName}`);
      console.log(result.user);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.box}>

        <h2 style={styles.heading}>Welcome Back</h2>

        {/* Email */}

        <input
          type="email"
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {emailError && (
          <p style={styles.error}>{emailError}</p>
        )}

        {/* Password */}

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {passwordError && (
          <p style={styles.error}>{passwordError}</p>
        )}

        {/* Show Password */}

        <label style={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />

          <span style={{ marginLeft: "8px" }}>
            Show Password
          </span>
        </label>

        {/* Login Button */}

        <button type="submit" style={styles.button}>
          Login
        </button>

        {/* Divider */}

        <div className="divider">
          <div className="dividerLine"></div>

          <span className="dividerText">
           ______________________OR___________________
          </span>

          <div className="dividerLine"></div>
        </div>

        {/* Google Button */}

        <button
          type="button"
          className="googleBtn"
          onClick={googleLogin}
        >
          <FcGoogle size={24} />

          <span>Continue with Google</span>
        </button>
        <div className="signupContainer">
  <span>     Don't have an account? </span>

  <a href="#" className="signupLink">
   Sign up
  </a>
</div>

      </form>
    </div>
  );
}

const styles = {
  container: {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
},
  box: {
    width: "350px",
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
  },

 heading: {
  textAlign: "center",
  marginBottom: "10px",
  color: "#111827"
},
  input: {
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid #000",
  fontSize: "16px",
  backgroundColor: "#fff",
  color: "#000",
  outline: "none",
},
  button: {
    marginTop: "20px",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#4f46e5",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },

  error: {
    color: "red",
    fontSize: "13px",
    marginTop: "5px",
    marginBottom: "5px",
  },

  checkboxContainer: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
  },
};

export default Login;