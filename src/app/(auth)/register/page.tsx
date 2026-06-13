"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Mail, Lock, User, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Trim inputs to prevent accidental spaces causing invalid email errors
    const sanitizedEmail = email.trim();
    const sanitizedPassword = password.trim();

    if (sanitizedPassword.length < 6) {
      setError({ title: "Weak Password", message: "Password must be at least 6 characters long." });
      setLoading(false);
      return;
    }

    const { data, error: supabaseError } = await supabase.auth.signUp({
      email: sanitizedEmail,
      password: sanitizedPassword,
      options: {
        data: {
          username: username.trim(),
        },
      },
    });

    if (supabaseError) {
      // Comprehensive Error Mapping
      let errorTitle = "Registration Failed";
      let errorMessage = supabaseError.message;

      const rawMsg = supabaseError.message.toLowerCase();
      
      if (rawMsg.includes("already registered") || rawMsg.includes("already exists")) {
        errorTitle = "Email Already Registered";
        errorMessage = "An account with this email already exists. Please sign in instead.";
      } else if (rawMsg.includes("invalid email")) {
        errorTitle = "Invalid Email Address";
        errorMessage = "The email address you entered is not valid. Please check for typos or spaces.";
      } else if (rawMsg.includes("password") && rawMsg.includes("weak")) {
        errorTitle = "Weak Password";
        errorMessage = "Your password is too weak. Please use a stronger password with numbers and symbols.";
      } else if (rawMsg.includes("database error saving new user")) {
        errorTitle = "Database Trigger Error";
        errorMessage = "Your account was created in Auth, but failed to sync to the public profile. This is usually due to a Database Trigger issue in Supabase.";
      } else if (rawMsg.includes("rate limit")) {
        errorTitle = "Too Many Requests";
        errorMessage = "You have attempted to register too many times. Please wait a moment and try again.";
      }

      setError({ title: errorTitle, message: errorMessage });
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-emerald-500/20 flex items-center justify-center rounded-2xl mb-6 border border-emerald-500/50">
          <Shield className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">Registration Successful!</h1>
        <p className="text-foreground/70 mb-8">
          Please check your email to verify your account before logging in.
        </p>
        <Link href="/login" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-primary/20 flex items-center justify-center rounded-2xl mb-6 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
        <Shield className="w-8 h-8 text-primary" />
      </div>
      
      <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
        Create an Account
      </h1>
      <p className="text-sm text-foreground/60 mb-8 text-center">
        Join the ecosystem to build your portfolio and tenant spaces.
      </p>

      {error && (
        <div className="w-full bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6">
          <h3 className="font-bold text-sm mb-1">{error.title}</h3>
          <p className="text-xs opacity-90">{error.message}</p>
        </div>
      )}

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        disabled={googleLoading || loading}
        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6 shadow-sm"
      >
        {googleLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        )}
        Sign up with Google
      </button>

      <div className="w-full flex items-center gap-4 mb-6">
        <div className="h-px bg-white/10 flex-1" />
        <span className="text-xs text-white/40 font-medium">OR REGISTER WITH EMAIL</span>
        <div className="h-px bg-white/10 flex-1" />
      </div>

      <form onSubmit={handleEmailRegister} className="w-full space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
            placeholder="username"
            required
            className="w-full bg-black/50 border border-white/10 focus:border-primary rounded-xl px-10 py-3 text-foreground placeholder:text-foreground/30 outline-none transition-all"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="w-full bg-black/50 border border-white/10 focus:border-primary rounded-xl px-10 py-3 text-foreground placeholder:text-foreground/30 outline-none transition-all"
          />
        </div>
        
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
            className="w-full bg-black/50 border border-white/10 focus:border-primary rounded-xl px-10 py-3 text-foreground placeholder:text-foreground/30 outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(var(--primary),0.2)] hover:shadow-[0_0_25px_rgba(var(--primary),0.4)] disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-sm text-foreground/60 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
}
