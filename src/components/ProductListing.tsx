import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import "../index.css";
import Pagination from "./Pagination";

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
};

const PAGE_SIZE = 9;

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalProducts: number = products.length;
  const start: number = (currentPage - 1) * PAGE_SIZE;
  const end: number = start + PAGE_SIZE;

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=200"
        );
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  return !products.length ? (
    <span>No products found</span>
  ) : (
    <div className="container">
      <div className="product-container">
        {products.slice(start, end).map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-img"
            />
            <div className="product-details">
              <span className="product-title">{product.title}</span>
              <span className="product-price">${product.price.toFixed(2)}</span>
              <StarRating rating={product.rating} size={20} />
              <span
                className={`${
                  product.stock !== 0 ? "available" : "out-of-stock"
                }`}
              >
                {product.stock !== 0 ? "Available" : "Out of stock"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalProducts={totalProducts}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ProductListing;
