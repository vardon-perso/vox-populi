import React, {Component} from 'react'
import {Image} from "react-bootstrap";
import "./Header.css"

class Header extends Component {
  render() {
    return (
      <div className={"Header"}>
        <div className={"Header-Content"}>
          <div className={"Header-Info"}>Algorithme et droit</div>
          <Image className={"Header-Logo"} src="/asset/vox-populi-logo.png"/>
          <div className={"Header-Info"}>Lanceur d'alerte</div>
        </div>
      </div>
    )
  }
}

export default Header