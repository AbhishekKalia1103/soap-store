export interface Product {
  _id?: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  ingredients: string[];
  weight: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  tags: string[];
}

export const products: Product[] = [
  {
    slug: "ubtan",
    name: "Ubtan",
    description: "A traditional skincare ritual in a bar. Our Ubtan Soap is inspired by age-old Indian beauty recipes that gently exfoliate, brighten and restore natural glow. Best for dull skin, uneven tone, and tan removal. Suitable for all skin types. Chemical-free, paraben-free, handmade and skin-loving.",
    price: 249,
    image: "/images/products/ubtan.jpeg",
    images: [
      "/images/products/ubtan.jpeg",
      "/images/products/promo-1.jpeg",
      "/images/products/turmeric-haldi.jpeg"
    ],
    category: "Ayurvedic",
    ingredients: ["Turmeric", "Gram Flour (Besan)", "Sandalwood Powder", "Saffron Extract", "Essential Oils", "Natural Base Oils (Coconut / Castor / Olive)"],
    weight: "100g",
    inStock: true,
    rating: 4.9,
    reviews: 156,
    tags: ["bestseller"]
  },
  {
    slug: "neem-aloe",
    name: "Neem & Aloe",
    description: "Your natural solution for acne-prone and oily skin. Neem is known for its antibacterial properties that help cleanse deeply and fight breakouts. Best for acne-prone and oily skin. Suitable for oily and combination skin types. Anti-bacterial, detoxifying, oil-control and handmade.",
    price: 179,
    originalPrice: 199,
    image: "/images/products/neem-aloe.jpeg",
    images: [
      "/images/products/neem-aloe.jpeg",
      "/images/products/promo-2.jpeg"
    ],
    category: "Detox",
    ingredients: ["Neem Powder / Neem Extract", "Tulsi Extract", "Tea Tree Oil", "Activated Base Oils", "Aloe Vera"],
    weight: "100g",
    inStock: true,
    rating: 4.7,
    reviews: 203,
    tags: ["bestseller"]
  },
  {
    slug: "rose",
    name: "Rose",
    description: "Infused with the softness of fresh roses, this soap deeply hydrates while calming irritated skin. Leaves your skin smooth, fresh, and lightly fragrant. Best for dry and sensitive skin. Suitable for all skin types. Gentle, moisturizing, with a romantic fragrance. Handmade with love.",
    price: 199,
    image: "/images/products/rose.jpeg",
    images: [
      "/images/products/rose.jpeg",
      "/images/products/promo-1.jpeg"
    ],
    category: "Floral",
    ingredients: ["Rose Petals", "Rose Water", "Glycerin / Natural Base Oils", "Vitamin E", "Essential Oils"],
    weight: "100g",
    inStock: true,
    rating: 4.8,
    reviews: 124,
    tags: ["bestseller"]
  },
  {
    slug: "coffee-ubtan",
    name: "Coffee Ubtan",
    description: "A natural body polishing bar that removes dead skin and improves circulation. Perfect for smooth, glowing skin. Best for body exfoliation and tan removal. Suitable for all skin types. A natural scrub that is energizing, skin-polishing and handmade.",
    price: 189,
    originalPrice: 239,
    image: "/images/products/coffee-ubtan.jpeg",
    images: [
      "/images/products/coffee-ubtan.jpeg",
      "/images/products/promo-2.jpeg"
    ],
    category: "Exfoliating",
    ingredients: ["Coffee Grounds", "Cocoa Powder", "Coconut Oil", "Shea Butter", "Vitamin E"],
    weight: "100g",
    inStock: true,
    rating: 4.5,
    reviews: 98,
    tags: ["new"]
  },
  {
    slug: "chandan-honey",
    name: "Chandan & Honey",
    description: "A luxurious blend of pure sandalwood and raw honey that nourishes, softens, and adds a natural glow to your skin. Sandalwood cools and soothes while honey locks in moisture. Best for dry, dull, and mature skin. Suitable for all skin types. Nourishing, cooling, glow-boosting and handmade.",
    price: 199,
    originalPrice: 249,
    image: "/images/products/placeholder.svg",
    images: [
      "/images/products/placeholder.svg"
    ],
    category: "Ayurvedic",
    ingredients: ["Sandalwood Powder", "Raw Honey", "Turmeric", "Coconut Oil", "Shea Butter", "Essential Oils"],
    weight: "100g",
    inStock: false,
    rating: 4.6,
    reviews: 89,
    tags: ["new"]
  }
];

export const categories = [
  { name: "All", slug: "all" },
  { name: "Ayurvedic", slug: "ayurvedic" },
  { name: "Floral", slug: "floral" },
  { name: "Detox", slug: "detox" },
  { name: "Exfoliating", slug: "exfoliating" },
  { name: "Mini Soaps", slug: "mini-soaps" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}
