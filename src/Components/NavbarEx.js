import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Modal, Form, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cart from './Images/cart.png';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { toast, ToastContainer } from 'react-toastify';

function NavbarEx({ cartCount }) {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    ratings: "",
    brand: "",
    image: ""
  });

  useEffect(() => {
    // Check login status on mount
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:8005/products/all")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  };

  const handleClose = () => {
    setShow(false);
    setNewProduct({
      name: "",
      category: "",
      price: "",
      description: "",
      stock: "",
      ratings: "",
      brand: "",
      image: ""
    });
    fetchProducts();
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    axios.post("http://localhost:8005/products/add", newProduct)
      .then(response => {
        toast.success("Product added successfully!", { autoClose: 3000 });
        fetchProducts();
        handleClose();
      })
      .catch(error => {
        console.error("Error adding product:", error);
        toast.error("Failed to add product. Please try again.", { autoClose: 3000 });
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      <Navbar expand="lg" className="mb-4" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to='/'>
            <Image src={cart} fluid /> Products
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>

            {/* Add Product Button - Visible only if logged in */}
            {isLoggedIn && (
              <Nav.Link><Button variant="info" onClick={handleShow}>Add Product</Button></Nav.Link>
            )}

            {/* Cart Icon */}
            {isLoggedIn && (
              <Nav.Link as={Link} to="/cart" className='add-to-cart-icon'>
                <AiOutlineShoppingCart className='navbar-cart' /> {cartCount}
              </Nav.Link>
            )}

            {/* Show Login only if not logged in */}
            {!isLoggedIn && (
              <Button variant="secondary mx-2" onClick={() => navigate("/login")}>Login</Button>
            )}

            {/* Show Logout only if logged in */}
            {isLoggedIn && (
              <Button variant="secondary mx-2" onClick={handleLogout}>Logout</Button>
            )}

          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Add Product Modal */}
      <Modal show={show} onHide={handleClose}>
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>Add a New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column md="3"> Name: </Form.Label>
              <Col md="9">
                <Form.Control type="text" name="name" placeholder="Enter name" value={newProduct.name} onChange={handleChange} required />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column md="3"> Category: </Form.Label>
              <Col md="9"> <Form.Control type="text" name="category" placeholder="Enter category" value={newProduct.category} onChange={handleChange} required /> </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column md="3"> Price: </Form.Label>
              <Col md="9"> <Form.Control type="number" name="price" placeholder="Enter price" value={newProduct.price} onChange={handleChange} required /> </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column md="3"> Description: </Form.Label>
              <Col md="9"> <Form.Control as="textarea" name="description" rows={3} placeholder="Enter description" value={newProduct.description} onChange={handleChange} required /> </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column md="3"> Stock: </Form.Label>
              <Col md="9"> <Form.Control type="number" name="stock" placeholder="Enter stock" value={newProduct.stock} onChange={handleChange} required /> </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column md="3"> Ratings: </Form.Label>
              <Col md="9"> <Form.Control type="number" name="ratings" placeholder="Enter ratings" step={0.1} value={newProduct.ratings} onChange={handleChange} required /> </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column md="3"> Brand: </Form.Label>
              <Col md="9"> <Form.Control type="text" name="brand" placeholder="Enter brand" value={newProduct.brand} onChange={handleChange} required /> </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column md="3"> Image URL: </Form.Label>
              <Col md="9"> <Form.Control type="text" name="image" placeholder="Enter image URL" value={newProduct.image} onChange={handleChange} required /> </Col>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleAddProduct}>Add Product</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavbarEx;