import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Button, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';

function FetchDetails() {

  // Initialize product state
  const [product, setProduct] = useState(null)

  // Get product ID from URL parameter
  const {id} = useParams()

  // Fetch product details from API here using id
  useEffect(()=> {
    axios.get(`http://localhost:8005/products/product/${id}`)
    .then(response => {
        setProduct(response.data)
        // console.log("Product fetched successfully:", product)
    })
    .catch(error => {
        console.error("Error fetching product details:", error)
    })
  })

  return (
    <Container className='details-container'>
        {
            product &&
            <Row>
                <Col md={5}>
                    <center> <Image src={product.image} fluid /> </center>
                </Col>
                <Col md={7} className='product-details'>
                    <h2> {product.name} </h2>
                    <h5> {product.description} </h5>
                    <div className='ratings-container'> <p> {product.ratings} </p> <Rating name="half-rating-read" defaultValue={product.ratings} precision={0.1} readOnly /> </div>
                    <h4 className='price'> ${product.price} </h4>
                    <Button variant="danger" size="sm" className='my-2'> Limited Time Deal </Button>
                    <p className='stock'> Only last <span className="stock-no"> {product.stock} </span> left...</p>
                    <div className="product-data">
                        <h5> More Details : </h5>
                        <Table bordered className='my-3'>
                        <tbody>
                        <tr> <td> Brand </td> <td> {product.brand} </td> </tr>
                        <tr> <td> Category </td> <td> {product.category} </td> </tr>
                        </tbody>
                        </Table>
                    </div>
                    <div className="button-container">
                        <Button variant="warning" size='lg'> Add to Cart </Button>
                        <Button variant="primary" size='lg'> Buy Now </Button>
                    </div>
                </Col>
            </Row>
        }
    </Container>
  )
}

export default FetchDetails
