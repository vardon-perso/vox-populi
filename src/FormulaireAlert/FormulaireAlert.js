import React, {Component} from 'react'
import PropTypes from 'prop-types'
import App from "../App";
import {Col, Grid, Panel, Row} from "react-bootstrap";
import Question from "./Question";
import ResponsesList from "./ResponsesList";
import StepButton from "../tools/StepButton";
import Navigationbar from "../navigation/Navigationbar";
import ResponseModal from "./ResponseModal";
import '../App.css'
import InfoPanel from "./InfoPanel";

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
      {label: "Des faits relatifs à la sécurité sanitaire des produits de santé et des médicaments", nextQuestionId: 99},
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
  },
];

const QUESTIONS_LIST2 = [
  {
    id: "1",
    label: "A quelle date les faits ont-ils été dénoncés ?",
    responses: [
      {
        label: "Avant Le 10 décembre 2016",
        nextQuestionId: "1.1",
        info: undefined,
      },
      {
        label: "Après le 11 décembre 2016",
        nextQuestionId: "1.2",
        info: undefined,
      }
    ],
    previousQuestionId: undefined
  },
  {
    id: "1.2",
    label: "Qui est l'auteur du signalement ?",
    responses: [
      {
        label: "Une personne physique",
        nextQuestionId: "1.2.1",
        info: "Si l'auteur du signalement est une personne physique, le régime de protections'applique.",
      },
      {
        label: "Une personne morale",
        nextQuestionId: undefined,
        info: "Si l'auteur du signalement est une personne morale à but lucratif (société commerciale, société civile etc.) ou une personne morale à but non lucratif (association loi 1901 etc.), le régime de protection du statut de lanceur d'alerte NE S'APPLIQUE PAS.",
      }
    ],
    previousQuestionId: "1"
  },
  {
    id: "1.2.1",
    label: "Quel est l'objet du signalement ?",
    responses: [
      {
        label: "Un crime ou un délit",
        nextQuestionId: undefined,
        info: "Si le signalement porte sur un crime ou un délit dont son auteur a connaissance, le régime de protection s'applique.",
      },
      {
        label: "Une violation grave et manifeste d'un engagement international régulièrement ratifié ou approuvé par la France, d'un acte unilatéral d'une organisation internationale pris sur le fondement de cet engagement, de la loi ou du règlement",
        nextQuestionId: "1.2.1.1",
        info: undefined,
      },
      {
        label: "Une menace ou un préjudice grave pour l'intérêt général",
        nextQuestionId: undefined,
        info: "Si le signalement porte sur une menace ou un préjudice grave pour l'intérêt général, le régime de protection s'applique.",
      },
      {
        label: "Des informations couvertes par le secret de la défense nationale, le secret médical ou le secret des relations entre un avocat et son client",
        nextQuestionId: undefined,
        info: "Si le signalement porte sur des informations couvertes par le secret de la défense nationale, le secret médical ou le secret des relations entre un avocat et son client, le régime de protection NE S'APPLIQUE PAS.",
      }
    ],
    previousQuestionId: "1.2"
  },
  {
    id: "1.2.1.1",
    label: "Quelles sont les motivations du signalement ?",
    responses: [
      {
        label: "Le signalement est effectué de manière désintéressée par son auteur",
        nextQuestionId: "1.2.1.1.1",
        info: "Si le signalement est effectué de manière désintéressée par son auteur, le régime de protection s'applique.",
      },
      {
        label: "L'auteur du signalement est motivé par un grief ou une animosité personnels ou encore par la perspective d'un avantage personnel",
        nextQuestionId: undefined,
        info: "Si le signalement est effectué de manière désintéressée par son auteur, le régime de protection s'applique.",
      }
    ],
    previousQuestionId: "1.2.1"
  },
  {
    id: "1.2.1.1.1",
    label: "L'auteur du signalement a-t-il respecté la procédure de signalement?",
    responses: [
      {
        label: "PAS FINI",
        nextQuestionId: undefined,
        info: undefined,
      },
      {
        label: "PAS FINI",
        nextQuestionId: undefined,
        info: undefined,
      },
      {
        label: "PAS FINI",
        nextQuestionId: undefined,
        info: undefined,
      },
    ],
    previousQuestionId: "1.2.1.1"
  }
];

class FormulaireAlert extends Component {
  constructor() {
    super();

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      id: FormulaireAlert.defaultProps.id,
      label: FormulaireAlert.defaultProps.label,
      responses: FormulaireAlert.defaultProps.responses,
      selectedResponse: {label: ""},
      previousQuestionId: FormulaireAlert.defaultProps.previousQuestionId,
      finalResponse: "",
      show: false,
      info: ""
    };
  }

  static defaultProps = {
    id: "1",
    label: "A quelle date les faits ont-ils été dénoncés ?",
    responses: [
      {
        label: "Avant Le 10 décembre 2016",
        nextQuestionId: "1.1",
        info: undefined,
      },
      {
        label: "Après le 11 décembre 2016",
        nextQuestionId: "1.2",
        info: undefined,
      }
    ],
    previousQuestionId: undefined
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
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

  handleInfo = (info) => {
    this.setState({
      info: info
    });
  };

  setSelectedResponse = (response) => {
    this.setState({
      selectedResponse: response
    })
  };

  getNextQuestion = (response) => {
    if(this.state.selectedResponse.label !== ""){
      const nextQuestion = QUESTIONS_LIST2.filter(question => question.id === response.nextQuestionId);
      this.handleInfo(response.info);
      if(nextQuestion[0] !== undefined) {
        this.setState({
          id: nextQuestion[0].id,
          label: nextQuestion[0].label,
          responses: nextQuestion[0].responses,
          selectedResponse: {label: ""},
          previousQuestionId: nextQuestion[0].previousQuestionId
        });
        // if(nextQuestion[0] === undefined) {
        //   this.setState(this.resetState());
        //   this.setState({
        //     finalResponse: nextQuestion[0].finalResponse
        //   });
        //   this.handleShow();
        // }
      } else {
    console.log("La question suivante n'existe pas encore");
      }
    } else {
      console.log("MDR TU PEUX PAS FAIRE ÇA MAMENE !!!!");
    }
  };

  // resetState() {
  //   return {
  //     id: FormulaireAlert.defaultProps.id,
  //     question: FormulaireAlert.defaultProps.question,
  //     responses: FormulaireAlert.defaultProps.responses,
  //     selectedResponse: {label: ""},
  //     previousQuestionId: FormulaireAlert.defaultProps.previousQuestionId,
  //     isFinished: false,
  //     show: false
  //   };
  // }

  getPreviousQuestion = (previousQuestionId) => {
    if(previousQuestionId !== undefined) {
      const previousQuestion = QUESTIONS_LIST2.filter(question => question.id === previousQuestionId);
      this.setState({
        id: previousQuestion[0].id,
        label: previousQuestion[0].label,
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
          <Row className="App-header">
            <Col mdOffset={2} md={8}>
              <Panel>
                <Panel.Heading>Questionaire lanceur d'alerte</Panel.Heading>
                <Panel.Body>
                  <Question label={this.state.label}/>
                  <br/>

                  <ResponsesList
                    responses={this.state.responses}
                    onChange={this.setSelectedResponse}
                  />
                  <br/>

                  <Row>
                    <Col xs={2} xsOffset={1} mdOffset={1} md={2}>
                      <StepButton label={"Précédent"}
                                  onClick={this.getPreviousQuestion}
                                  parameter={this.state.previousQuestionId}
                                  style={"primary"}/>
                    </Col>
                    <Col xsOffset={4} xs={2} mdOffset={6} md={2}>
                      <StepButton label={"Suivant"}
                                  onClick={this.getNextQuestion}
                                  parameter={this.state.selectedResponse}
                                  style={"primary"}/>
                    </Col>
                  </Row>
                </Panel.Body>
              </Panel>
              <InfoPanel info={this.state.info}/>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default FormulaireAlert