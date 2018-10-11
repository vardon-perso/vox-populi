import React, {Component} from 'react'
import {Button, Collapse, Fade, PageHeader} from "react-bootstrap";
import '../App.css'
import './Equipe.css'
import PersonneList from "./PersonneList";


class Equipe extends Component {
  constructor() {
    super();
    this.state = {
      people: [
        {nom: "Elric", prenom: "Edward", role: "Alchimiste d'Etat", imagePath: "/asset/Edward.jpeg"},
        {nom: "Elric", prenom: "Alphonse", role: "Alchimiste", imagePath: "/asset/Alphonse.jpeg"},
        {nom: "Vardon", prenom: "Alexandre", role: "Dev", imagePath: "/asset/Alexandre.jpeg"},
        {nom: "Elric", prenom: "Edward", role: "Alchimiste d'Etat", imagePath: "/asset/Edward.jpeg"},
        {nom: "Elric", prenom: "Alphonse", role: "Alchimiste", imagePath: "/asset/Alphonse.jpeg"},
        {nom: "Vardon", prenom: "Alexandre", role: "Dev", imagePath: "/asset/Alexandre.jpeg"}
      ],
    }
  }

  render() {
    return(
      <div>
        <PageHeader className={"Equipe-Header"}>
          L'équipe <small> (Qui sommes nous ?)    </small>
        </PageHeader>;
        <div className={"App"}>
          <PersonneList people={this.state.people}/>
        </div>
      </div>
    )
  }
}

export default Equipe