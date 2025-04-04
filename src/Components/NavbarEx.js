import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown, Button, Modal, Form, Row, Col,Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cart from './Images/cart.png'
import { AiOutlineShoppingCart } from "react-icons/ai";

function NavbarEx({cartCount}) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);  // Store products in state
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

  // ✅ Fetch products from API when component mounts & after product is added
  const fetchProducts = () => {
    axios.get("http://localhost:8005/products/all")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    fetchProducts(); // ✅ Fetch products on initial load
  }, []);

  const handleClose = () => {
    setShow(false);
    setNewProduct({ // Reset form data after closing modal
      name: "",
      category: "",
      price: "",
      description: "",
      stock: "",
      ratings: "",
      brand: "",
      image: ""
    });
    fetchProducts(); // ✅ Reload products when closing the modal
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    axios.post("http://localhost:8005/products/add", newProduct)
      .then(response => {
        console.log("Product added:", response.data);
        alert("Product added successfully!");
        fetchProducts(); //  Reload products after adding
        handleClose();   // Close modal and reset form
      })
      .catch(error => {
        console.error("Error adding product:", error);
        alert("Failed to add product!");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Navbar expand="lg" className="mb-4" bg="dark">
        <Container>
          <Navbar.Brand as={Link} to='/'>         
            <Image src={cart} fluid/>
            Products
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            {/* <Nav className="me-auto">
              <NavDropdown title="Category" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/category/">Get</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/post">Post</NavDropdown.Item>
              </NavDropdown>
            </Nav> */}
            <Nav.Link><Button variant="info" onClick={handleShow}>Add Product</Button></Nav.Link>
          </Navbar.Collapse>
          <Nav.Link as={Link} to="/cart" className='add-to-cart-icon'> <AiOutlineShoppingCart className='navbar-cart'/> {cartCount} </Nav.Link>
          <Button variant="secondary mx-2" onClick={() => {navigate("/login")}}> Login </Button>
          <Button variant="secondary mx-2" onClick={handleLogout}> Logout </Button>
        </Container>
      </Navbar>

      {/* Modal for Adding a Product */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column md="3"> Name: </Form.Label>
              <Col md="9"> <Form.Control type="text" name="name" placeholder="Enter name" value={newProduct.name} onChange={handleChange} required /> </Col>
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