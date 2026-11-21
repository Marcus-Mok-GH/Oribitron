import { parseCookies, SESSION_COOKIE, clearedSessionCookie, query } from "../lib/server-auth.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const token = parseCookies(req.headers.cookie)[SESSION_COOKIE];
  if (token) {
    try {
      await query("DELETE FROM sessions WHERE token = $1", [token]);
    } catch (err) {
      console.error("logout error", err);
    }
  }
  res.setHeader("Set-Cookie", clearedSessionCookie());
  return res.status(200).json({ ok: true });
}
