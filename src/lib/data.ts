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
    slug: "lavender-bliss",
    name: "Lavender Bliss",
    description: "Calming lavender soap with essential oils for a relaxing bathing experience. Made with organic ingredients and natural lavender extracts.",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=500",
    images: [
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=500",
      "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=500"
    ],
    category: "Floral",
    ingredients: ["Lavender Essential Oil", "Coconut Oil", "Shea Butter", "Olive Oil"],
    weight: "100g",
    inStock: true,
    rating: 4.8,
    reviews: 124,
    tags: ["bestseller", "organic"]
  },
  {
    slug: "charcoal-detox",
    name: "Charcoal Detox",
    description: "Deep cleansing activated charcoal soap that removes impurities and toxins from your skin. Perfect for oily and acne-prone skin.",
    price: 349,
    originalPrice: 449,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500",
    images: [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500"
    ],
    category: "Detox",
    ingredients: ["Activated Charcoal", "Tea Tree Oil", "Coconut Oil", "Vitamin E"],
    weight: "100g",
    inStock: true,
    rating: 4.6,
    reviews: 89,
    tags: ["new"]
  },
  {
    slug: "honey-oatmeal",
    name: "Honey Oatmeal",
    description: "Gentle exfoliating soap with natural honey and oatmeal. Nourishes and moisturizes your skin while providing mild exfoliation.",
    price: 279,
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500",
    images: [
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500"
    ],
    category: "Exfoliating",
    ingredients: ["Raw Honey", "Oatmeal", "Goat Milk", "Almond Oil"],
    weight: "100g",
    inStock: true,
    rating: 4.9,
    reviews: 156,
    tags: ["bestseller"]
  },
  {
    slug: "rose-glow",
    name: "Rose Glow",
    description: "Luxurious rose-infused soap for radiant and glowing skin. Contains rose petals and rose hip oil for ultimate skin nourishment.",
    price: 399,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500",
    images: [
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500"
    ],
    category: "Floral",
    ingredients: ["Rose Essential Oil", "Rose Hip Oil", "Glycerin", "Jojoba Oil"],
    weight: "100g",
    inStock: true,
    rating: 4.7,
    reviews: 98,
    tags: ["premium"]
  },
  {
    slug: "neem-tulsi",
    name: "Neem & Tulsi",
    description: "Ayurvedic soap with neem and tulsi for antibacterial protection. Traditional recipe for healthy and clear skin.",
    price: 249,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500"
    ],
    category: "Ayurvedic",
    ingredients: ["Neem Extract", "Tulsi Extract", "Turmeric", "Coconut Oil"],
    weight: "100g",
    inStock: true,
    rating: 4.5,
    reviews: 203,
    tags: ["ayurvedic", "bestseller"]
  },
  {
    slug: "citrus-burst",
    name: "Citrus Burst",
    description: "Energizing citrus soap with orange and lemon extracts. Refreshes your senses and brightens your skin naturally.",
    price: 299,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500",
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500"
    ],
    category: "Citrus",
    ingredients: ["Orange Peel Oil", "Lemon Extract", "Vitamin C", "Olive Oil"],
    weight: "100g",
    inStock: true,
    rating: 4.4,
    reviews: 67,
    tags: ["refreshing"]
  },
  {
    slug: "coconut-cream",
    name: "Coconut Cream",
    description: "Ultra-moisturizing coconut soap for dry skin. Rich in natural oils that leave your skin soft and supple.",
    price: 269,
    image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=500",
    images: [
      "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=500"
    ],
    category: "Moisturizing",
    ingredients: ["Virgin Coconut Oil", "Coconut Milk", "Shea Butter", "Glycerin"],
    weight: "100g",
    inStock: false,
    rating: 4.8,
    reviews: 145,
    tags: ["moisturizing"]
  },
  {
    slug: "tea-tree-mint",
    name: "Tea Tree & Mint",
    description: "Refreshing antibacterial soap with tea tree and peppermint. Ideal for acne-prone skin and provides a cooling sensation.",
    price: 329,
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=500",
    images: [
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=500"
    ],
    category: "Antibacterial",
    ingredients: ["Tea Tree Oil", "Peppermint Oil", "Eucalyptus", "Aloe Vera"],
    weight: "100g",
    inStock: true,
    rating: 4.6,
    reviews: 112,
    tags: ["cooling", "new"]
  }
];

export const categories = [
  { name: "All", slug: "all" },
  { name: "Floral", slug: "floral" },
  { name: "Detox", slug: "detox" },
  { name: "Ayurvedic", slug: "ayurvedic" },
  { name: "Moisturizing", slug: "moisturizing" },
  { name: "Exfoliating", slug: "exfoliating" },
  { name: "Citrus", slug: "citrus" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}
