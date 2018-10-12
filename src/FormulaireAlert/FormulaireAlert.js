import React, {Component} from 'react'
import PropTypes from 'prop-types'
import App from "../App";
import {Col, Grid, Panel, Row} from "react-bootstrap";
import Question from "./Question";
import ResponsesList from "./ResponsesList";
import StepButton from "../tools/StepButton";
import Navigationbar from "../navigation/Navigationbar";
import ResponseModal from "./ResponseModal";

const QUESTIONS_LIST = [
  {
    id: 1,
    question: "A quelle date les faits ont-ils été dénoncés ?",
    responses: [
      {label: "Avant le 10 décembre 2016", nextQuestionId: 11},
      {label: "Après le 11 décembre 2016", nextQuestionId: 99}
    ],
    previousQuestionId: undefined,
    isFinished: false
  },
  {
    id: 11,
    question: "Quels faits ont été dénoncés ?",
    responses: [
      {label: "Des faits de corruption", nextQuestionId: 111},
      {label: "Des faits relatifs à la sécurité sanitaire des produits de santé et des médicaments", nextQuestionId: 112},
      {label: "Des faits relatifs à un risque grave pour la santé publique ou l'environnement", nextQuestionId: 113},
      {label: "Un conflit d’intérêts relatifs aux membres du gouvernement, aux principaux exécutifs locaux ou aux personnes chargées d’une mission de service public", nextQuestionId: 114},
      {label: "Un crime ou un délit", nextQuestionId: 115},
      {label: "D'autres faits qui n'entrent dans aucune des qualifications précédentes", nextQuestionId: 116}
    ],
    previousQuestionId: 1,
    isFinished: false
  },
  {
    id: 12,
    question: "Qui est l'auteur du signalement ?",
    responses: [
      {label: "Une personne physique", nextQuestionId: 121},
      {label: "Une personne morale à but lucratif (société commerciale, société civile etc.) ou une personne morale à" +
        "but non lucratif (association loi 1901 etc.)", nextQuestionId: 122}
    ],
    previousQuestionId: 1,
    isFinished: true
  },
  {
    id: 111,
    question: "Qui dénonce les faits ?",
    responses: [
      {label: "Un salarié employé dans le secteur privé", nextQuestionId: 1111},
      {label: "Une autre personne (un indépendant, un agent public, un fonctionnaire public, un salarié d'une" +
        "entreprise privée qui a connaissance de faits en dehors de l'exercice de ses fonctions).", nextQuestionId: 1112}
    ],
    previousQuestionId: 11,
    isFinished: false
  },
  {
    id: 1111,
    question: "De quelle façon ?",
    responses: [
      {label: "Le salarié a connaissance des faits dans l'exercice de ses fonctions.", nextQuestionId: 11111},
      {label: "Au Service Central de Prévention et de la Corruption (SCPC), devenu Agence Française Anticorruption" +
        "(AFA)", nextQuestionId: 11112},
      {label: "Les faits dont le salarié a connaissance et qu'il a dénoncé n'ont pas été découvert dans l'exercice" +
        "de ses fonctions.", nextQuestionId: 11113}
    ],
    previousQuestionId: 111,
    isFinished: false
  },
  {
    id: 11111,
    question: "Comment sont dénoncés les faits ?",
    responses: [
      {label: " Les faits sont dénoncés de bonne foi", nextQuestionId: 111111},
      {label: "La personne dénonçant les faits de corruption les sait partiellement ou totalement inexacts.",
        nextQuestionId: 111112},
    ],
    previousQuestionId: 1111,
    isFinished: false
  },
  {
    id: 111111,
    question: "A qui les faits sont-ils dénoncés en premier lieu ?",
    responses: [
      {label: "A l'employeur du salarié", nextQuestionId: 1111111},
      {label: "A l'une des autorités judiciaire ou administrative compétentes", nextQuestionId: 1111112},
      {label: "A toute autre personne (collègue, association, média)", nextQuestionId: 1111113},
    ],
    previousQuestionId: 11111,
    isFinished: false
  },
  {
    id: 99,
    finalResponse: "La loi du 13 novembre 2007 ne s'applique pas. La personne ayant dénoncé les faits ne peut" +
    "bénéficier du régime de protection des lanceurs d'alerte (nullité des représailles). Elle peut néanmoins demander" +
    "une réparation au titre de la violation de son droit fondamental qu'est la liberté d'expression (article 10 CEDH)," +
    "et/ou demander à ce que soit faite application du droit du travail (harcèlement moral, licenciement abusif, etc.).",
    isFinished: true
  }
];

class FormulaireAlert extends Component {
  constructor() {
    super();

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      id: FormulaireAlert.defaultProps.id,
      question: FormulaireAlert.defaultProps.question,
      responses: FormulaireAlert.defaultProps.responses,
      selectedResponse: {label: ""},
      previousQuestionId: FormulaireAlert.defaultProps.previousQuestionId,
      finalResponse: "",
      isFinished: false,
      show: false,

    };
  }

  static defaultProps = {
    id: 1,
    question: "A quelle date les faits ont-ils été dénoncés ?",
    responses: [
      {label: "Avant le 10 décembre 2016", nextQuestionId: 11},
      {label: "Après le 11 décembre 2016", nextQuestionId: 99}
    ],
    previousQuestionId: undefined
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired
  };

  handleClose = () => {
    this.setState({
      show: false
    });
  };

  handleShow = () => {
    this.setState({
      show: true
    });
  };

  setSelectedResponse = (response) => {
    this.setState({
      selectedResponse: response
    })
  };

  getNextQuestion = (nextQuestionId) => {
    if(this.state.selectedResponse.label !== ""){
      const nextQuestion = QUESTIONS_LIST.filter(question => question.id === nextQuestionId);
      if(nextQuestion[0] !== undefined) {
        this.setState({
          id: nextQuestion[0].id,
          question: nextQuestion[0].question,
          responses: nextQuestion[0].responses,
          selectedResponse: {label: ""},
          previousQuestionId: nextQuestion[0].previousQuestionId
        });
        if(nextQuestion[0].isFinished) {
          this.setState(this.resetState());
          this.setState({
            finalResponse: nextQuestion[0].finalResponse
          });
          this.handleShow();
        }
      } else {
    console.log("La question suivante n'existe pas encore");
      }
    } else {
      console.log("MDR TU PEUX PAS FAIRE ÇA MAMENE !!!!");
    }
  };

  resetState() {
    return {
      id: FormulaireAlert.defaultProps.id,
      question: FormulaireAlert.defaultProps.question,
      responses: FormulaireAlert.defaultProps.responses,
      selectedResponse: {label: ""},
      previousQuestionId: FormulaireAlert.defaultProps.previousQuestionId,
      isFinished: false,
      show: false
    };
  }

  getPreviousQuestion = (previousQuestionId) => {
    if(previousQuestionId !== undefined) {
      const previousQuestion = QUESTIONS_LIST.filter(question => question.id === previousQuestionId);
      this.setState({
        id: previousQuestion[0].id,
        question: previousQuestion[0].question,
        responses: previousQuestion[0].responses,
        selectedResponse: {label: ""},
        previousQuestionId: previousQuestion[0].previousQuestionId
      })
    }
    else {
      console.log("MDR TU PEUX PAS FAIRE ÇA MAMENE !!!!");
    }
};


  render() {
    return (
      <div className={App}>
        <Navigationbar/>
        <ResponseModal show={this.state.show}
                       handleClose={this.handleClose}
                       finalResponse={this.state.finalResponse}
        />
        <Grid bsStyle={"container-fluid"}>
          <Row>
            <Col mdOffset={2} md={8}>
              <Panel>
                <Panel.Heading>Questionaire lanceur d'alerte</Panel.Heading>
                <Panel.Body>
                  <Question label={this.state.question}/>
                  <br/>

                  <ResponsesList
                    responses={this.state.responses}
                    onChange={this.setSelectedResponse}
                  />
                  <br/>

                  <Row>
                    <p>Réponse : {this.state.selectedResponse.label}</p>
                    <Col xs={2} xsOffset={1} mdOffset={1} md={2}>
                      <StepButton label={"Précédent"}
                                  onClick={this.getPreviousQuestion}
                                  parameter={this.state.previousQuestionId}
                                  style={"primary"}/>
                    </Col>
                    <Col xsOffset={4} xs={2} mdOffset={6} md={2}>
                      <StepButton label={"Suivant"}
                                  onClick={this.getNextQuestion}
                                  parameter={this.state.selectedResponse.nextQuestionId}
                                  style={"primary"}/>
                    </Col>
                  </Row>
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default FormulaireAlert