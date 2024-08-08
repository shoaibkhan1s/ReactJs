import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import {Link, NavLink } from 'react-router-dom'


function NavPanel() {
  const cartProducts = useSelector(state=>state.cart)
  // console.log(cartProducts)
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link to="/" as={Link}>Products</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            <Nav.Link to='/cart' as={Link}>My Bag {cartProducts.length}</Nav.Link>
          </Navbar.Text>
        </Navbar.Collapse>
    </Container>
  </Navbar>
  
  )
}

export default NavPanel