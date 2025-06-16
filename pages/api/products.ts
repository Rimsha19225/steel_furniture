
import type { NextApiRequest, NextApiResponse } from 'next';

const products = [
  {
    id: "1",
    name: "3 door cupboard",
    price: 1821,
    image: "/images/cupboard 1.png",
    description: "Spacious, elegant, modern 3-door wooden wardrobe.",
    quantity: 1
  },
  {
    id: "2",
    name: "2 door cupboard",
    price: 2365,
    image: "/images/cupboard 2.png",
    description: "Stylish, compact, modern 2-door wooden cupboard.",
    quantity: 1
  },
  {
    id: "3",
    name: "Divider",
    price: 1270,
    image: "/images/cupboard 3.png",
    description: "Sleek, functional, wooden room divider with storage.",
    quantity: 1
  },
  {
    id: "4",
    name: "3 door cupboard",
    price: 2000,
    image: "/images/cupboard 3.png",
    description: "Spacious, elegant, modern 3-door wooden wardrobe.",
    quantity: 1
  },
  {
    id: "5",
    name: "Mirror Dividor",
    price: 1500,
    image: "/images/cupboard 3.png",
    description: "Reflective panel splitting space decoratively.",
    quantity: 1
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(products);
}
