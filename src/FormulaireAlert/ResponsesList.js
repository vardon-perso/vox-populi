import React from 'react'
import {FormGroup, Radio} from "react-bootstrap";
import Response from "./Response";

const ResponsesList = ({responses, onChange}) => (
  <FormGroup>
    {(responses.map(response => <Response response={response} onChange={onChange}/>))}
  </FormGroup>
);


export default ResponsesList
