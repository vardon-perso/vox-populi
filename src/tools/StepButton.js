import React from 'react'
import {Button} from "react-bootstrap";
import './StepButton.css'

const StepButton = ({label, onClick, parameter, style}) => (
  <Button className={"StepButton"} onClick={() => onClick(parameter)} bsStyle={style}>
    {label}
  </Button>
);

export default StepButton

