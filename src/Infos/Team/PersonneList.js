import React from 'react'
import {Col, Grid, Panel, Row} from "react-bootstrap";
import Personne from "./Personne";

const PersonneList = ({people}) => (
  <Row>
    {people.map( personne =>
      <Col xs={12} md={4}>
        <Personne nom={personne.nom}
                  prenom={personne.prenom}
                  role={personne.role}
                  imagePath={personne.imagePath}/>
      </Col>
    )}
  </Row>
);

export default PersonneList