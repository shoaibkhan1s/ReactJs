import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { add } from "../features/cartSlice";

function Product() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    // add dispatch action
    dispatch(add(product));
  };

  const cards = products.map((product) => (
    <div
      className="col-md-3"
      style={{ marginBottom: "10px", overflowX: "hidden" }}
    >
      <Card loading="lazy" key={product.id} className="h-100">
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "100px", height: "130px" }}
          />
        </div>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            {product.title}
          </Card.Title>
          <Card.Text
            style={{
              textAlign: "center",
              position: "absolute",
              bottom: "3.4rem",
              left: "9.38rem",
              fontWeight: "600",
            }}
          >
            INR: {product.price}
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{ textAlign: "center" }}>
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <>
      <div
        style={{ textAlign: "center", fontSize: "3.5rem", fontWeight: "600" }}
      >
        Product Dashboard
      </div>
      <div className="row">{cards}</div>
    </>
  );
}

export default Product;
