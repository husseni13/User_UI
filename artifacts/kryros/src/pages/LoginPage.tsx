import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
          {/* Top illustration area */}
          <div className="relative bg-muted/30 p-6 pb-4">
            <Link href="/">
              <span className="text-xl font-black tracking-tight">KRY<span className="text-primary">ROS</span></span>
            </Link>
            <div className="flex items-center justify-between mt-4">
              <div>
                <h1 className="text-2xl font-black text-foreground">Welcome Back</h1>
                <p className="text-sm text-muted-foreground mt-1">Login to continue shopping with KRYROS</p>
              </div>
              <div className="w-20 h-20 flex-shrink-0">
                <div className="relative w-full h-full">
                  <div className="absolute right-0 top-0 w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-black text-primary">K</span>
                  </div>
                  <div className="absolute left-0 bottom-0 w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                    <span className="text-lg font-black text-foreground">R</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 pt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground/50"
                  data-testid="input-email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Password</label>
                <span className="text-xs text-primary cursor-pointer hover:underline">Forgot Password?</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground/50"
                  data-testid="input-password"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${remember ? "bg-primary border-primary" : "border-border"}`}
                >
                  {remember && <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-none stroke-white stroke-2"><polyline points="20 6 9 17 4 12" /></svg>}
                </div>
                <span className="text-xs text-foreground">Remember me</span>
              </label>
              <span className="text-xs text-muted-foreground">Keep me signed in</span>
            </div>

            <button
              type="submit"
              data-testid="btn-login"
              className="w-full py-3.5 bg-foreground text-background rounded-xl font-bold text-sm hover:opacity-90 transition-opacity active:scale-95"
            >
              Login
            </button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Google", color: "text-red-500", char: "G" },
                { label: "Apple", color: "text-foreground", char: "" },
                { label: "Facebook", color: "text-blue-600", char: "f" },
              ].map(({ label, color, char }) => (
                <button key={label} type="button" className="flex items-center justify-center gap-1.5 py-2.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
                  <span className={`font-black ${color}`}>{char || label[0]}</span>
                  {label}
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register">
                <span className="text-primary font-semibold cursor-pointer hover:underline">Register Now</span>
              </Link>
            </p>
          </form>

          {/* Trust badges */}
          <div className="flex items-center justify-around px-6 pb-5 pt-2 border-t border-border">
            {[
              { title: "Secure & Safe", sub: "Your data is protected" },
              { title: "Fast & Easy", sub: "Quick access to your account" },
              { title: "24/7 Support", sub: "We're here to help" },
            ].map(({ title, sub }) => (
              <div key={title} className="text-center">
                <p className="text-[10px] font-bold text-foreground">{title}</p>
                <p className="text-[9px] text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
