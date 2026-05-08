const data = require('../backend/data/content');

const setCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

module.exports = (req, res) => {
  setCors(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const pathname = req.url.split('?')[0];

  if (req.method === 'GET' && pathname === '/api/health') {
    res.status(200).json({ status: 'ok', service: 'Rimora Threads API' });
    return;
  }

  if (req.method === 'GET' && pathname === '/api/content') {
    res.status(200).json(data);
    return;
  }

  if (req.method === 'GET' && pathname === '/api/products') {
    const { category } = req.query || {};
    if (!category) {
      res.status(200).json(data.products);
      return;
    }

    const filtered = data.products.filter(
      (product) => product.category.toLowerCase() === String(category).toLowerCase()
    );
    res.status(200).json(filtered);
    return;
  }

  if (req.method === 'POST' && pathname === '/api/newsletter') {
    const { email } = req.body || {};

    if (!email || !String(email).includes('@')) {
      res.status(400).json({ message: 'Please provide a valid email address.' });
      return;
    }

    res.status(201).json({
      message: `Thanks for subscribing to ${data.brand.name}!`,
      email
    });
    return;
  }

  res.status(404).json({ message: 'Route not found' });
};
