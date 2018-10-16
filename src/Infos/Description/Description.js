import React from 'react'
import {Col, Image, Row} from "react-bootstrap";
import './Description.css'

const Description = () => (
  <div className={"Description"}>
    <Row>
      <Col mdOffset={2} md={8}>
        <Image className={"Description-Logo"} src="/asset/vox-populi-logo.png"/>
        <h2>
          L’outil de diagnostic et d’aide à la décision destiné
          aux lanceurs d’alerte et aux entités chargées de les orienter
        </h2>
      </Col>
    </Row>
  </div>
);

export default Description