import { useState } from "react";
import { Link, useLocation } from "wouter";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
          {/* Header */}
          <div className="relative bg-muted/30 p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <Link href="/login">
                <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </Link>
              <span className="text-xl font-black">KRY<span className="text-primary">ROS</span></span>
              <Link href="/login">
                <span className="text-sm text-primary font-semibold cursor-pointer hover:underline">Login</span>
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-foreground">Create Account</h1>
                <p className="text-sm text-muted-foreground mt-1">Join KRYROS and enjoy premium shopping Experience</p>
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-black text-primary">K</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 pt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground/50"
                  data-testid="input-name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground/50"
                  data-testid="input-email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-10 py-3 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground/50"
                  data-testid="input-password"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Use 8+ characters with a mix of letters, numbers & symbols</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-10 py-3 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground/50"
                  data-testid="input-confirm-password"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <div
                onClick={() => setAgreed(!agreed)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${agreed ? "bg-primary border-primary" : "border-border"}`}
              >
                {agreed && <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-none stroke-white stroke-2"><polyline points="20 6 9 17 4 12" /></svg>}
              </div>
              <span className="text-xs text-foreground">
                I agree to the{" "}
                <Link href="/terms"><span className="text-primary cursor-pointer hover:underline">Terms & Conditions</span></Link>
                {" "}and{" "}
                <Link href="/privacy"><span className="text-primary cursor-pointer hover:underline">Privacy Policy</span></Link>
              </span>
            </label>

            <button
              type="submit"
              data-testid="btn-register"
              className="w-full py-3.5 bg-foreground text-background rounded-xl font-bold text-sm hover:opacity-90 transition-opacity active:scale-95"
            >
              Register
            </button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Google", color: "text-red-500" },
                { label: "Apple", color: "text-foreground" },
                { label: "Facebook", color: "text-blue-600" },
              ].map(({ label, color }) => (
                <button key={label} type="button" className="flex items-center justify-center gap-1.5 py-2.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
                  <span className={`font-black ${color}`}>{label[0]}</span>
                  {label}
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login">
                <span className="text-primary font-semibold cursor-pointer hover:underline">Login Now</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
