import React from 'react'
import {Panel} from "react-bootstrap";

const InfoPanel = ({info}) => (
  <Panel bsStyle={"info"}>
    <Panel.Heading>Info</Panel.Heading>
    <Panel.Body>
      <p>{info}</p>
    </Panel.Body>
  </Panel>
);

export default InfoPanel
