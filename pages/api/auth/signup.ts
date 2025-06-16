import type { NextApiRequest, NextApiResponse } from "next";
import { getUsers, saveUsers, User } from '../userStore';
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { firstName, lastName, dob, gender, email, phone, address, city, state, zip, country, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !dob || !gender || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const users = getUsers();

  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'User already exists' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists with this email." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: uuidv4(),
    firstName,
    lastName,
    dob,
    gender,
    email,
    phone,
    address: {
      residential: address || "",
      city: city || "",
      state: state || "",
      zip: zip || "",
      country: country || "",
    },
    password: hashedPassword,
  };

  users.push(newUser);
  saveUsers(users);

  // You can now store the user in a database, etc.
  console.log("Received signup data:", req.body);

  return res.status(200).json({ message: "Signup successful!" });
}