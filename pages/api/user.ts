import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { users } from "./userStore";

const SECRET = "your_secret_key";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Missing Authorization header" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, SECRET) as { id: string; email: string };

    const user = users.find((u) => u.id === decoded.id && u.email === decoded.email);

    if (!user) return res.status(404).json({ message: "User not found" });

    const { password, ...userData } = user;
    void password;

    return res.status(200).json(userData);
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
