import React, { useState , useEffect} from 'react'
import { Container, Row, Col, Card, Button, Image, Form} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cart from './Images/cart.png'

function MainPage({ addToCart }) {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);  // Filtered products
    const [categories, setCategories] = useState([]);  // Unique categories
    const [selectedCategory, setSelectedCategory] = useState("All");  // Selected category
    const [isLoggedIn, setIsLoggedIn] = useState(true); // ✅ Track login state
    
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false); // ✅ User is not logged in
      }
      axios.get("http://localhost:8005/products/all")
        .then(response => {
          setProducts(response.data);
          setFilteredProducts(response.data);  // Initially show all products
  
          //Extract unique categories
          const uniqueCategories = ["All", ...new Set(response.data.map((product) => product.category))];
          setCategories(uniqueCategories);
        })
        .catch(error => {
          console.log("Error fetching products : ", error);
        });
    }, []);  

    const handleCategoryChange = (event) => {
      const category = event.target.value;
      setSelectedCategory(category);
  
      if (category === "All") {
        setFilteredProducts(products); // Show all products
      } else {
        setFilteredProducts(products.filter(product => product.category === category)); // Filter by category
      }
    };

    const navigate = useNavigate();

  return (
    <Container className='products'>
      {!isLoggedIn ? (
        <div className="text-center">
          <p className="text-danger">⚠️ You need to <strong>log in</strong> to view your cart.</p>
          <Button variant="primary" onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
    ) : (
      <>
      <div className="title">
        <Image src={cart} fluid/>
        <h2> Product Data </h2>
        <Form.Group controlId="categorySelect" className="mb-3 select-category justify-content-end">
          <Form.Label> Category </Form.Label>
          <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>
      <Row>
      {filteredProducts.length > 0 ?
        ( filteredProducts.map((product) => (
          <Col md={3} xs={12} sm={6} key={product._id}>
            <Card style={{ textAlign: "center" }} className="my-3">
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title> {product.name} </Card.Title>
                <Card.Text className="product-price"> ${product.price}</Card.Text>
                <div className="card-buttons">
                <Button variant="warning" onClick={() => addToCart(product)}> Add to Cart </Button>
                <Button variant="primary" onClick={() => { navigate(`/details/${product._id}`) }}> View Details </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))) : (
          <p>No products available in this category.</p>
      )}
      </Row>
      </>
  )}
  </Container>
  )
}

export default MainPage
