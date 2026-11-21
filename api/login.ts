import { verifyPassword, createSession, sessionCookie, query } from "../lib/server-auth.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, password } = req.body ?? {};
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Email and password are required." });
  }
  const cleanEmail = email.trim().toLowerCase();
  try {
    const result = await query(
      "SELECT id, email, name, password_hash FROM users WHERE email = $1",
      [cleanEmail]
    );
    const user = result.rows[0];
    if (!user || !verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const token = await createSession(user.id);
    res.setHeader("Set-Cookie", sessionCookie(token));
    return res.status(200).json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error("login error", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
