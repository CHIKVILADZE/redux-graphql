require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const graphqlQuery = `
  query {
    products(first: 10, reverse: true) {
      edges {
        node {
          id
          title
          handle
          images(first: 1) {
            nodes {
              src
            }
          }
        }
      }
    }
  }
`;

app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/products', async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.SHOPIFY_STORE_URL}admin/api/2023-10/graphql.json`,
      { query: graphqlQuery },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
        },
      }
    );

    const products = response.data.data.products.edges.map((edge) => edge.node);

    res.json(products);
  } catch (error) {
    console.error('Error fetching products from Shopify:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
