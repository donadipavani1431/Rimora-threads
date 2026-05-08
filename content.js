const brand = {
  name: 'Rimora Threads',
  tagline: 'Contemporary streetwear designed for everyday confidence',
  supportEmail: 'care@rimorathreads.com',
  supportPhone: '+1 (800) 555-0104',
  address: '16 Hudson Street, New York, NY 10013'
};

const hero = {
  badge: 'New Season Arrival',
  heading: 'Refresh your wardrobe with Rimora Threads',
  subheading:
    'Discover premium essentials, statement pieces, and sustainable fabrics crafted for modern living.',
  ctaPrimary: 'Shop Women',
  ctaSecondary: 'Shop Men',
  highlights: ['Free shipping over $99', '30-day returns', 'Secure checkout']
};

const categories = [
  { id: 1, name: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Men', image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Accessories', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80' },
  { id: 4, name: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' }
];

const products = [
  {
    id: 101,
    title: 'Minimal Overshirt',
    category: 'Men',
    price: 74,
    oldPrice: 99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 102,
    title: 'Relaxed Utility Dress',
    category: 'Women',
    price: 89,
    oldPrice: 120,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 103,
    title: 'Rimora Signature Hoodie',
    category: 'Unisex',
    price: 65,
    oldPrice: 85,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 104,
    title: 'Canvas Street Sneaker',
    category: 'Footwear',
    price: 95,
    oldPrice: 130,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 105,
    title: 'Structured Tote Bag',
    category: 'Accessories',
    price: 58,
    oldPrice: 80,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 106,
    title: 'Soft Knit Co-ord Set',
    category: 'Women',
    price: 110,
    oldPrice: 149,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=900&q=80'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sophia Carter',
    quote: 'Rimora Threads nails comfort and style. Every order has felt premium and thoughtfully packed.'
  },
  {
    id: 2,
    name: 'Liam Johnson',
    quote: 'Great quality fabrics and true-to-size fit. The customer support team is fast and super helpful.'
  },
  {
    id: 3,
    name: 'Ava Bennett',
    quote: 'I keep coming back for new drops. Their basics have become staples in my weekly outfits.'
  }
];

const instagram = [
  'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80'
];

module.exports = {
  brand,
  hero,
  categories,
  products,
  testimonials,
  instagram
};
