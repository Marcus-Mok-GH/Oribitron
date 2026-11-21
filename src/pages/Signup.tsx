import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Button } from "../components/ui";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signup(email, password, name || undefined);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Join Oribitron to personalise your LLM index.
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-card p-6">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted-foreground">Name (optional)</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-white/20"
            placeholder="Ada Lovelace"
            autoComplete="name"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted-foreground">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-white/20"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted-foreground">Password</span>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-white/20"
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <Button type="submit" size="md" disabled={busy}>
          {busy ? "Creating account…" : "Create account"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
