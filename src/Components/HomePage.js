import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  // Fetch images from backend
  useEffect(() => {
    axios.get("http://localhost:8005/products/all")
      .then(response => {
        const images_data = response.data.map((product) => product.image);
        setImages(images_data);
        if (images_data.length > 0) {
          setCurrentImage(images_data[0]); // Set first image initially
        }
      })
      .catch(error => {
        console.error("Error fetching images:", error);
      });
  }, []);

  // Auto-change image every 5 seconds
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        setCurrentImage(images[newIndex]); // Update current image
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <Container className="hero-section">
      <Row className="hero-grid">
        <Col md={6} sm={6} className="hero-grid-heading">
          <h1> 75% OFF !</h1>
          <h1>Discover Amazing Products</h1>
          {/* <h2> From leading Brands </h2>
          <h2> At lowest price ever ...</h2> */}
          <h4> Unbeatable prices & top quality items </h4>
          <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto, asperiores tempore? Aspernatur, consequuntur omnis, itaque repellat perspiciatis autem doloribus eius asperiores illum dolorem quam nisi cum, alias et! </p>
          <button> <a href="/home"> Shop Now </a> </button>
        </Col>

        {/* Display different image after 5 seconds */}
        <Col md={6} sm={6} xs={12} className="mb-4">
          {currentImage && <Image src={currentImage} fluid />}
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
