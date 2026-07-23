import { useState, useEffect, useRef } from "react";
import "../styles/login.css";

import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaBrain } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ── Floating particle component ── */
function Particle({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none particle"
      style={style}
    />
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const particles = [
    { width: 6, height: 6, top: "12%", left: "8%",  background: "#6366f1", animationDuration: "8s",  animationDelay: "0s" },
    { width: 4, height: 4, top: "25%", left: "90%", background: "#8b5cf6", animationDuration: "11s", animationDelay: "1s" },
    { width: 8, height: 8, top: "60%", left: "5%",  background: "#06b6d4", animationDuration: "9s",  animationDelay: "2s" },
    { width: 5, height: 5, top: "80%", left: "80%", background: "#6366f1", animationDuration: "13s", animationDelay: "0.5s" },
    { width: 7, height: 7, top: "40%", left: "75%", background: "#a78bfa", animationDuration: "10s", animationDelay: "3s" },
    { width: 4, height: 4, top: "70%", left: "40%", background: "#22d3ee", animationDuration: "12s", animationDelay: "1.5s" },
    { width: 6, height: 6, top: "15%", left: "55%", background: "#8b5cf6", animationDuration: "7s",  animationDelay: "4s" },
    { width: 3, height: 3, top: "90%", left: "20%", background: "#6366f1", animationDuration: "14s", animationDelay: "2.5s" },
  ];

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
        "Password must be 8+ chars with uppercase, lowercase, number & special character."
      );
      valid = false;
    }

    if (valid) {
      setIsLoading(true);
      setTimeout(() => {
        alert("Login Successful!");
        console.log(email);
        console.log(password);
        navigate("/dashboard");
      }, 800);
    }
  };

  const googleLogin = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      alert(`Welcome ${result.user.displayName}`);
      console.log(result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden animated-bg"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* ── Floating particles ── */}
      {particles.map((p, i) => (
        <Particle
          key={i}
          style={{
            width: p.width,
            height: p.height,
            top: p.top,
            left: p.left,
            background: p.background,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            boxShadow: `0 0 ${p.width * 3}px ${p.background}99`,
          }}
        />
      ))}

      {/* ── Large background orbs ── */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
      />

      {/* ── Left panel — branding (hidden on mobile) ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="hidden lg:flex flex-col justify-center px-16 flex-1 max-w-lg"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center pulse-glow"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            <FaBrain className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Student Analyzer</h1>
            <p className="text-xs" style={{ color: "#6366f1" }}>
              Powered by Artificial Intelligence
            </p>
          </div>
        </div>

        <h2
          className="text-5xl font-extrabold leading-tight mb-6"
          style={{ color: "#f1f5f9" }}
        >
          Unlock Your{" "}
          <span className="gradient-text">Career Potential</span>
        </h2>

        <p className="text-base leading-relaxed mb-10" style={{ color: "#94a3b8" }}>
          Analyze your resume, improve your ATS score, discover company matches,
          identify skill gaps, and prepare for interviews using AI.
        </p>

        {/* Feature pills */}
        <div className="flex flex-col gap-3">
          {[
            { emoji: "📄", label: "AI Resume Analysis & ATS Scoring" },
            { emoji: "🏢", label: "Company Match & Job Readiness" },
            { emoji: "🎤", label: "Mock Interview Preparation" },
            { emoji: "📊", label: "Skill Gap & Learning Roadmap" },
          ].map((feat) => (
            <div
              key={feat.label}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.18)",
              }}
            >
              <span className="text-lg">{feat.emoji}</span>
              <span className="text-sm font-medium" style={{ color: "#cbd5e1" }}>
                {feat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Login card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full max-w-sm mx-4 lg:mx-16 rounded-3xl p-8"
        style={{
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(99, 102, 241, 0.25)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1) inset",
        }}
      >
        {/* Card top shine */}
        <div
          className="absolute top-0 left-8 right-8 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)",
          }}
        />

        {/* Mobile logo */}
        <div className="flex lg:hidden items-center justify-center gap-2 mb-6">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            <FaBrain className="text-white text-sm" />
          </div>
          <span className="text-base font-bold text-white">AI Student Analyzer</span>
        </div>

        {/* Heading */}
        <div className="mb-7">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
            style={{
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#818cf8",
            }}
          >
            <HiSparkles className="text-xs" />
            Welcome back
          </div>
          <h2 className="text-2xl font-bold text-white">Sign in to continue</h2>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>
            Your AI career journey awaits
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#64748b" }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-dark w-full"
            />
            <AnimatePresence>
              {emailError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs mt-1.5"
                  style={{ color: "#f87171" }}
                >
                  {emailError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#64748b" }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-dark w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
                style={{ color: "#475569" }}
              >
                {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              </button>
            </div>
            <AnimatePresence>
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs mt-1.5"
                  style={{ color: "#f87171" }}
                >
                  {passwordError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
            style={{ padding: "13px 24px", fontSize: "14px" }}
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : null}
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-5">
          <div className="dividerLine" />
          <span className="dividerText">OR</span>
          <div className="dividerLine" />
        </div>

        {/* Google */}
        <button
          type="button"
          className="googleBtn"
          onClick={googleLogin}
          disabled={isLoading}
        >
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        {/* Sign up link */}
        <div className="signupContainer mt-5">
          <span>Don't have an account?</span>
          <a href="#" className="signupLink">
            Sign up free
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
