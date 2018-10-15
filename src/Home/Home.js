import React, {Component} from 'react'
import "./Home.css"
import {Image} from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <div className={"Home"}>
        <Image className={"Home-Logo"} src="/asset/vox-populi-logo.png"/>
      </div>
    )
  }
}

export default Home