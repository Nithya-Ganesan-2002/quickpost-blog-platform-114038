"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

// PUBLIC_INTERFACE
export default function AuthPage() {
  const { user, signUp, signIn, signOut, loading } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (loading) {
    return <div className="text-center pt-12">Loading...</div>;
  }
  if (user) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded border">
        <div className="mb-2">You are logged in as <span className="font-semibold">{user.email}</span>.</div>
        <button
          className="mt-4 bg-[#f5a623] text-white px-4 py-2 rounded font-semibold"
          onClick={() => {
            signOut();
            router.push("/");
          }}>
          Logout
        </button>
      </div>
    );
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setSuccess(null);
    if (!email || !password) {
      setErr("Email and password are required.");
      return;
    }
    if (mode === "signup") {
      const { error } = await signUp(email, password);
      if (error) {
        setErr(error);
      } else {
        setSuccess("Signup successful. Please check your email to confirm.");
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setErr(error);
      } else {
        setSuccess("Logged in successfully!");
        router.push("/");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form className="bg-white px-10 py-8 shadow-lg rounded border max-w-md w-full" onSubmit={handleAuth}>
        <h2 className="text-xl font-bold mb-6">
          {mode === "login" ? "Login" : "Register"}
        </h2>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        <button type="submit" className="w-full bg-[#0070f3] hover:opacity-90 text-white py-2 rounded font-semibold mb-2">
          {mode === "login" ? "Login" : "Register"}
        </button>
        <button
          type="button"
          className="w-full bg-gray-200 hover:bg-gray-100 text-gray-700 py-2 rounded font-semibold"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "New here? Register" : "Already registered? Login"}
        </button>
        {err && <div className="text-red-600 mt-3 text-center">{err}</div>}
        {success && <div className="text-green-600 mt-3 text-center">{success}</div>}
      </form>
    </div>
  );
}
