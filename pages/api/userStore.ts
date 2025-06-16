import fs from 'fs';
import path from 'path';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address: {
    residential: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  password: string;
};


export const users: User[] = [];

console.log("Active users:", users.length);

const filePath = path.join(process.cwd(), 'data', 'users.json');

export function getUsers(): User[] {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as User[];
}

export function saveUsers(users: User[]) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
}