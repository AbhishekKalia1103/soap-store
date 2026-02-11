import mongoose from 'mongoose';
import Product from '../src/lib/db/models/Product';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/soap-store';

const products = [
  {
    slug: 'ubtan',
    name: 'Ubtan',
    description: 'A traditional skincare ritual in a bar. Our Ubtan Soap is inspired by age-old Indian beauty recipes that gently exfoliate, brighten and restore natural glow. Best for dull skin, uneven tone, and tan removal. Suitable for all skin types. Chemical-free, paraben-free, handmade and skin-loving.',
    price: 299,
    originalPrice: 399,
    image: '/images/products/ubtan.jpeg',
    images: ['/images/products/ubtan.jpeg', '/images/products/promo-1.jpeg', '/images/products/turmeric-haldi.jpeg'],
    category: 'Ayurvedic',
    ingredients: ['Turmeric', 'Gram Flour (Besan)', 'Sandalwood Powder', 'Saffron Extract', 'Essential Oils', 'Natural Base Oils (Coconut / Castor / Olive)'],
    weight: '100g',
    inStock: true,
    rating: 4.9,
    reviews: 156,
    tags: ['bestseller'],
  },
  {
    slug: 'neem-aloe',
    name: 'Neem & Aloe',
    description: 'Your natural solution for acne-prone and oily skin. Neem is known for its antibacterial properties that help cleanse deeply and fight breakouts. Best for acne-prone and oily skin. Suitable for oily and combination skin types. Anti-bacterial, detoxifying, oil-control and handmade.',
    price: 249,
    image: '/images/products/neem-aloe.jpeg',
    images: ['/images/products/neem-aloe.jpeg', '/images/products/promo-2.jpeg'],
    category: 'Detox',
    ingredients: ['Neem Powder / Neem Extract', 'Tulsi Extract', 'Tea Tree Oil', 'Activated Base Oils', 'Aloe Vera'],
    weight: '100g',
    inStock: true,
    rating: 4.7,
    reviews: 203,
    tags: ['bestseller'],
  },
  {
    slug: 'rose',
    name: 'Rose',
    description: 'Infused with the softness of fresh roses, this soap deeply hydrates while calming irritated skin. Leaves your skin smooth, fresh, and lightly fragrant. Best for dry and sensitive skin. Suitable for all skin types. Gentle, moisturizing, with a romantic fragrance. Handmade with love.',
    price: 349,
    originalPrice: 449,
    image: '/images/products/rose.jpeg',
    images: ['/images/products/rose.jpeg', '/images/products/promo-1.jpeg'],
    category: 'Floral',
    ingredients: ['Rose Petals', 'Rose Water', 'Glycerin / Natural Base Oils', 'Vitamin E', 'Essential Oils'],
    weight: '100g',
    inStock: true,
    rating: 4.8,
    reviews: 124,
    tags: ['bestseller'],
  },
  {
    slug: 'coffee-ubtan',
    name: 'Coffee Ubtan',
    description: 'A natural body polishing bar that removes dead skin and improves circulation. Perfect for smooth, glowing skin. Best for body exfoliation and tan removal. Suitable for all skin types. A natural scrub that is energizing, skin-polishing and handmade.',
    price: 299,
    originalPrice: 399,
    image: '/images/products/coffee-ubtan.jpeg',
    images: ['/images/products/coffee-ubtan.jpeg', '/images/products/promo-2.jpeg'],
    category: 'Exfoliating',
    ingredients: ['Coffee Grounds', 'Cocoa Powder', 'Coconut Oil', 'Shea Butter', 'Vitamin E'],
    weight: '100g',
    inStock: true,
    rating: 4.5,
    reviews: 98,
    tags: ['new'],
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    console.log('Clearing existing products...');
    await Product.deleteMany({});

    // Insert new products
    console.log('Inserting products...');
    const result = await Product.insertMany(products);
    console.log(`Successfully seeded ${result.length} products`);

    // Display inserted products
    for (const product of result) {
      console.log(`  - ${product.name} (${product.slug})`);
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
