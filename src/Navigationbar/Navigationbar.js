import React, {Component} from 'react'
import {Navbar} from 'react-bootstrap'
import './Navigationbar.css'

class Navigationbar extends Component {
  render() {
    return (
      <Navbar className={"Navigationbar"}>
        <Navbar.Header>
          <Navbar.Brand>
            <a className={"Navigationbar-Title"} href="#home">Vox Populi</a>
          </Navbar.Brand>
          <Navbar.Brand>
            <a className={"Navigationbar-Text"} href="#home">Formulaire</a>
          </Navbar.Brand>
          <Navbar.Brand>
            <a className={"Navigationbar-Text"} href="#home">Equipe</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    )
  }
}

export default Navigationbar