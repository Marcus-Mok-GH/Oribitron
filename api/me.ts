import { getUserFromRequest } from "../lib/server-auth.js";

export default async function handler(req: any, res: any) {
  try {
    const user = await getUserFromRequest(req);
    return res.status(200).json({ user });
  } catch (err) {
    console.error("me error", err);
    return res.status(500).json({ user: null });
  }
}
