import React from 'react'
import {Radio} from "react-bootstrap";

const Response = ({response, onChange}) => (
  <div>
    <Radio name="radioGroup" onChange={() => onChange(response)} key={response.label} inline>
      {response.label}
    </Radio>
  </div>
);

export default Response