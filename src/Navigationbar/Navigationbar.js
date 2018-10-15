import React from 'react'
import {Navbar} from 'react-bootstrap'
import './Navigationbar.css'

const Navigationbar = () => (
  <Navbar className={"Navigationbar"}>
    <Navbar.Header>
      <Navbar.Brand>
        <a className={"Navigationbar-Title"} href="#home">Vox Populi</a>
      </Navbar.Brand>
    </Navbar.Header>
  </Navbar>
);

export default Navigationbar