import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CartPage({ cart, removeFromCart }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login state

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(cart)
    if (!token) {
      setIsLoggedIn(false); // User is not logged in
    }
  }, [navigate]);

  // Calculate Total Price Using forEach()
  let totalPrice = 0;
  cart.forEach(product => {
    totalPrice += product.price;
  });

  let totalItems = 0;
  cart.forEach(product => {
    totalItems += 1;
  });

  return (
    <Container className="cart-products">
    {/* Show message if user is not logged in */}
      {!isLoggedIn ? (
        <div className="text-center">
          <p className="text-danger">⚠️ You need to <strong>log in</strong> to view your cart.</p>
          <Button variant="primary" onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
        <h2> Your Shopping Cart </h2>
        <Row>
          {cart.map((product, index) => (
            <Col md={3} sm={6} key={index}>
              <Card style={{ textAlign: "center" }} className="my-3">
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="product-price">${product.price}</Card.Text>
                  <Button variant="danger" onClick={() => removeFromCart(product._id)}>Remove</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Col md={3} sm={6}>
            <div className="cart-price">
              <h4> Total Items : {totalItems} </h4>
              <h3 className="heading"> Total Price : <span className="price">${totalPrice.toFixed(2)}</span></h3>
              <center> <button> Buy Now </button> </center>
            </div>
          </Col>
        </Row>
      </>
      )}
    </Container>
  );
}

export default CartPage;