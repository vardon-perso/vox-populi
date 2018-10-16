import React from 'react'
import PersonneList from "./PersonneList";
import {PageHeader} from "react-bootstrap";
import './Team.css'

const Team = ({people}) => (
  <div>
    <PageHeader className={"Team-Header"}>
      L'équipe <small> (Qui sommes nous ?)    </small>
    </PageHeader>
    <div className={"App"}>
      <PersonneList people={people}/>
    </div>
  </div>
);

export default Team