import React from 'react'
import './Question.css'

const Question = ({label}) => (
  <div className={"Question"}>
    <p className={"Question-Title"}>Question</p>
    <p>{label}</p>
  </div>
);

export default Question