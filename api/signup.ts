import {
  hashPassword,
  validateEmail,
  createSession,
  sessionCookie,
  query,
} from "../lib/server-auth.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, password, name } = req.body ?? {};
  if (typeof email !== "string" || !validateEmail(email.trim().toLowerCase())) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }
  const cleanEmail = email.trim().toLowerCase();
  try {
    const existing = await query("SELECT id FROM users WHERE email = $1", [cleanEmail]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }
    const result = await query(
      "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name",
      [cleanEmail, hashPassword(password), typeof name === "string" && name.trim() ? name.trim() : null]
    );
    const user = result.rows[0];
    const token = await createSession(user.id);
    res.setHeader("Set-Cookie", sessionCookie(token));
    return res.status(201).json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error("signup error", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
