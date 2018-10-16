import React from 'react'
import {Image, Panel} from "react-bootstrap";
import './Team.css'

const Personne = ({prenom, nom, role, imagePath}) => (
  <Panel className={"Team-Panel"}>
    <Panel.Body>
      <Image className={"Team-Image"} src={imagePath} circle />
      <p></p>
      <p className={"Team-Role"}>{prenom} {nom}</p>
      <p>{role}</p>
    </Panel.Body>
  </Panel>
);

export default Personne
