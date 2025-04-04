import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavbarEx';
import FetchDetails from './Components/FetchDetails';
import Cart from './Components/CartPage';
import MainPage from './Components/MainPage';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [token, setToken] = useState(localStorage.getItem("token")); // Track token state

  // Sync token when user logs in/out
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Add to Cart Function
  const addToCart = (product) => {
    const updatedCart = [...cart, product]; 
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove from Cart Function
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <BrowserRouter>
      {/* Pass cartCount only if user is logged in */}
      <Navbar cartCount={token ? cart.length : null} /> 

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<MainPage addToCart={addToCart} />} />
        <Route path="/details/:id" element={<FetchDetails />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;