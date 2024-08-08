import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { remove } from "../features/cartSlice";

function Cart() {
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeToCart = (id) => {
    // dispatch remove action
    dispatch(remove(id));
  };

  const cards = products.map((product) => (
    <div
      className="col-md-12"
      style={{ marginBottom: "10px", overflowX: "hidden" }}
    >
      <Card key={product.id} className="h-100">
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
          <Button variant="danger" onClick={() => removeToCart(product.id)}>
            Remove item
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
        Cart
      </div>
      <div className="row">{cards}</div>
    </>
  );
}

export default Cart;
