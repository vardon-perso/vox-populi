import React from 'react'
import {Image, Panel} from "react-bootstrap";
import './Equipe.css'

const Personne = ({prenom, nom, role, imagePath}) => (
  <Panel className={"Equipe-Panel"}>
    <Panel.Body>
      <Image className={"Equipe-Image"} src={imagePath} circle />
      <p></p>
      <p className={"Equipe-Role"}>{prenom} {nom}</p>
      <p>{role}</p>
    </Panel.Body>
  </Panel>
);

export default Personne
