import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsers } from '../userStore';

const SECRET = '9ffc0059ffe33413705e6a7976cd9fa5157712e588232bc2b906b43756da7b9467ca18cd0d46a884abb9bbefe592803dab88ed8d1253086cb5c8b4da40a9d6b9';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: '1h' }
  );

  console.log('Active users:', users.length);

  res.status(200).json({ token });
}
