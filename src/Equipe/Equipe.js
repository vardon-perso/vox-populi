import React, {Component} from 'react'
import {PageHeader} from "react-bootstrap";
import '../App.css'
import './Equipe.css'
import PersonneList from "./PersonneList";


class Equipe extends Component {
  constructor() {
    super();
    this.state = {
      people: [
        {nom: "Traore", prenom: "Joaquim ", role: "Elève avocat", imagePath: "/asset/joaquim-traore.jpeg"},
        {nom: "Treignat", prenom: "Maxime ", role: "Elève avocat", imagePath: "/asset/maxime-treignat.jpg"},
        {nom: "Tricot", prenom: "Delphine", role: "Elève avocat", imagePath: "/asset/delphine-tricot.jpg"},
        {nom: "Vahedi", prenom: "Arsalan ", role: "Elève avocat", imagePath: "/asset/arsalan-vahedi.jpg"},
        {nom: "Vardon", prenom: "Elodie", role: "Elève avocat", imagePath: "/asset/elodie-vardon.jpeg"},
        {nom: "Vardon", prenom: "Alexandre", role: "Développeur", imagePath: "/asset/alexandre-vardon.jpg"}
      ],
    }
  }

  render() {
    return(
      <div>
        <PageHeader className={"Equipe-Header"}>
          L'équipe <small> (Qui sommes nous ?)    </small>
        </PageHeader>
        <div className={"App"}>
          <PersonneList people={this.state.people}/>
        </div>
      </div>
    )
  }
}

export default Equipe