import React, {Component} from 'react'
import Description from "./Description/Description";
import Team from "./Team/Team";
import "./Infos.css"
import {Col, Grid, Row} from "react-bootstrap";

class Infos extends Component {
  constructor() {
    super();
    this.state = {
      people: [
        {nom: "Traore", prenom: "Joaquim ", role: "Elève avocat", imagePath: "/asset/joaquim-traore.jpeg"},
        {nom: "Treignat", prenom: "Maxime ", role: "Elève avocat", imagePath: "/asset/maxime-treignat.jpg"},
        {nom: "Tricot", prenom: "Delphine", role: "Elève avocat", imagePath: "/asset/delphine-tricot.jpg"},
        {nom: "Vahedi", prenom: "Arsalan ", role: "Elève avocat", imagePath: "/asset/arsalan-vahedi.jpg"},
        {nom: "Vardon", prenom: "Elodie", role: "Elève avocat", imagePath: "/asset/elodie-vardon.jpeg"},
        {nom: "Vardon", prenom: "Alexandre", role: "Développeur", imagePath: "/asset/alexandre-vardon.jpg"}
      ],
    }
  }
  render() {
    return(
      <div className={"Infos"}>
        <Row>
          <Col mdOffset={1} md={5} xs={12}>
            <Description/>
          </Col>
          <Col md={5} xs={12}>
            <Team people={this.state.people}/>
          </Col>
        </Row>
      </div>

    )
  }
}

export default Infos