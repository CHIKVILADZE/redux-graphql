import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/actions';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h1>Shopify Products</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card border-3 border-muted">
              {product.images && product.images.nodes.length > 0 && (
                <img
                  src={product.images.nodes[0].src}
                  alt={product.title}
                  className="card-img-top"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <span>{product.handle} </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
