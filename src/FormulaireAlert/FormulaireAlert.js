import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Col, Grid, Panel, Row} from "react-bootstrap";
import Question from "./Question";
import ResponsesList from "./ResponsesList";
import StepButton from "../tools/StepButton";
import ResponseModal from "./ResponseModal";
import '../App.css'
import InfoPanel from "./InfoPanel";
import './FormulaireAlert.css'

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
            {
                label: "Des faits relatifs à la sécurité sanitaire des produits de santé et des médicaments",
                nextQuestionId: 99
            },
            {
                label: "Des faits relatifs à un risque grave pour la santé publique ou l'environnement",
                nextQuestionId: 113
            },
            {
                label: "Un conflit d’intérêts relatifs aux membres du gouvernement, aux principaux exécutifs locaux ou aux personnes chargées d’une mission de service public",
                nextQuestionId: 114
            },
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
            {
                label: "Une personne morale à but lucratif (société commerciale, société civile etc.) ou une personne morale à" +
                "but non lucratif (association loi 1901 etc.)", nextQuestionId: 122
            }
        ],
        previousQuestionId: 1,
        isFinished: true
    },
    {
        id: 111,
        question: "Qui dénonce les faits ?",
        responses: [
            {label: "Un salarié employé dans le secteur privé", nextQuestionId: 1111},
            {
                label: "Une autre personne (un indépendant, un agent public, un fonctionnaire public, un salarié d'une" +
                "entreprise privée qui a connaissance de faits en dehors de l'exercice de ses fonctions).",
                nextQuestionId: 1112
            }
        ],
        previousQuestionId: 11,
        isFinished: false
    },
    {
        id: 1111,
        question: "De quelle façon ?",
        responses: [
            {label: "Le salarié a connaissance des faits dans l'exercice de ses fonctions.", nextQuestionId: 11111},
            {
                label: "Au Service Central de Prévention et de la Corruption (SCPC), devenu Agence Française Anticorruption" +
                "(AFA)", nextQuestionId: 11112
            },
            {
                label: "Les faits dont le salarié a connaissance et qu'il a dénoncé n'ont pas été découvert dans l'exercice" +
                "de ses fonctions.", nextQuestionId: 11113
            }
        ],
        previousQuestionId: 111,
        isFinished: false
    },
    {
        id: 11111,
        question: "Comment sont dénoncés les faits ?",
        responses: [
            {label: " Les faits sont dénoncés de bonne foi", nextQuestionId: 111111},
            {
                label: "La personne dénonçant les faits de corruption les sait partiellement ou totalement inexacts.",
                nextQuestionId: 111112
            },
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
    label: "À quelle date les faits ont-ils été dénoncés ?",
    responses: [
      {
      label: "Avant le 10 décembre 2016",
      nextQuestionId: "1.1",
      info: "*La corruption s’entend par (i) utiliser et abuser une fonction (publique ou privée) à des fins privées en vue d’obtenir un avantage injustifié ou (ii) d’échanger son influence réelle ou supposée contre un avantage fourni par un tiers (trafic d’influence).Dans les deux cas, la corruption peut être active (le corrompu sollicité l'avantage) ou passive (le corrupteur octroie l'avantage).",
    },
      {
      label: "Après le 11 décembre 2016",
      nextQuestionId: "1.2",
      info: undefined,
    },
    ],
    previousQuestionId: undefined,
  },
    {
    id: "1.1",
    label: "Quels faits ont été dénoncés ?",
    responses: [{
      label: "Des faits de corruption*",
      nextQuestionId: "1.1.1",
      info: undefined,
    }, {
      label: "Des faits relatifs à la sécurité sanitaire des produits de santé et des médicaments",
      nextQuestionId: "1.1.2",
      info: "Sont notamment compris parmis les médicaments et produits de santé à usage humain (i) les insecticides, acaricides et antiparasitaires à usage humain ; (ii) les préparations magistrales, hospitalières et officinales ; (iii) les substances stupéfiantes, psychotropes ou vénéneuses utilisées en médecine, (iv) les huiles essentielles et les plantes médicinales ; (v) les matières premières à usage pharmaceutique ; (vi) produits contraceptifs et contragestifs ; (vii) biomatériaux et dispositifs médicaux ; (viii) les dispositifs médicaux de diagnostic in vitro ; (ix) les produits sanguins labiles ; (x) organes, tissus, cellules et produits d'origine humaine ou animale, y compris prélevés à l'occasion d'une intervention chirurgicale ; (xi) les produits cellulaires à finalité thérapeutique ; (xii) le lait maternel collecté, qualifié, préparé et conservé par les lactariums ; (xiii) les produits destinés à l'entretien ou à l'application des lentilles de contact ; (xiv) les procédés et appareils destinés à la désinfection des locaux et des véhicules dans les cas prévus à l'article L. 3114-1 du Code de la santé publique ; (xv) les lentilles oculaires non correctrices ; (xvi) les produits cosmétiques ; (xvii) les micro-organismes et toxines mentionnés à l'article L. 5139-1 du Code de la santé publique ; (xviii) les produits de tatouage ; (xix) logiciels qui ne sont pas des dispositifs médicaux et qui sont utilisés par les laboratoires de biologie médicale, pour la gestion des examens de biologie médicale et lors de la validation, de l'interprétation, de la communication appropriée en application du 3° de l'article L. 611-2 du Code de la santé publique et de l'archivage des résultats ; (xx) les dispositifs à finalité non strictement médicale utilisés dans les laboratoires de biologie médicale pour la réalisation des examens de biologie médicale ; (xxi) logiciels d'aide à la prescription et les logiciels d'aide à la dispensation ; (xxii) les produits biocides destinés à la désinfection des locaux en milieu de soins ; (xxiii) les produits répulsifs non thérapeutiques (désinfectants pour la peau et les mains).",
    } , {
      label: "Des faits relatifs à un risque grave pour la santé publique ou l'environnement",
      nextQuestionId: "1.1.3",
      info: undefined,
    } , {
      label: "Un conflit d'intérêts relatif aux membres du gouvernement aux principaux exécutifs locaux ou aux personnes chargées d'une mission de service public",
      nextQuestionId: "1.1.4",
      info: undefined,
    } , {
      label: "Un crime ou un délit qui n'entre pas dans les catégories précédentes",
      nextQuestionId: "1.1.5",
      info: undefined,
    } , {
      label: "D'autres faits",
      nextQuestionId: undefined,
      info: "Les lois de protection sectorielles ne s'appliquent pas. La personne ayant dénoncé les faits ne peut pas bénéficier du régime de protection des lanceurs d'alerte (nullité des représailles). Elle peut néanmoins demander une réparation au titre de la violation de son droit fondamental qu'est la liberté d'expression (article 10 CEDH), et/ou demander à ce que soit faite application du droit du travail (harcèlement moral, licenciement abusif, etc.)",
    }
    ],
    previousQuestionId: "1",
  },
    {
    id: "1.1.1",
    label: "Qui dénonce les faits",
    responses: [{
      label: "Un salarié employé dans le secteur privé qui a connaissance de faits dans le cadre de ses fonctions",
      nextQuestionId: "1.1.1.1",
      info: "Révéler des faits de bonne foi implique la réunion de 4 conditions cumulatives : (1) Le dénonciateur doit poursuivre un but légitime (par exemple, dénoncer des faits illégaux ou présentant un risque pour l'intérêt général) ; (2) Les faits doivent être révélés sans aucune animosité personnelle de la part du dénonciateur (par exemple, se venger ou causer du tort à la personne concernée par l'infraction) ; (3) Le dénonciateur doit faire preuve de prudence et de mesure dans l'expression des faits litigieux (préférer la discrétion et la confidentialité dans la révélation des faits plutôt qu'une médiatisation ; emploi de termes factuels) ; (4) L'enquête menée pour révéler les faits doit être fiable.",
    }, {
      label: "Une autre personne",
      nextQuestionId: undefined,
      info: "La loi du 13 novembre 2007 ne s'applique pas. La personne ayant dénoncé les faits ne peut bénéficier du régime de protection des lanceurs d'alerte (nullité des représailles). Elle peut néanmoins demander une réparation au titre de la violation de son droit fondamental qu'est la liberté d'expression (article 10 CEDH), et/ou demander à ce que soit faite application du droit du travail (harcèlement moral, licenciement abusif, etc)",
    }
    ],
    previousQuestionId: "1.1"
  },
    {
    id: "1.1.1.1",
    label: "Les faits sont-ils dénoncés de bonne foi?",
    responses: [{
      label: "Oui",
      nextQuestionId: "1.1.1.1.1",
      info: undefined,
    }, {
      label: "Non",
      nextQuestionId: undefined,
      info: "Le régime de protection du lanceur d'alerte ne s'applique pas. La personne ayant dénoncé des faits de corruption qu'elle sait partiellement ou totalement inexacts se rend coupable de dénonciation calomnieuse. Elle encourt 5 ans d'emprisonnement et 45 000 euros d'amende.",
    }
    ],
    previousQuestionId: "1.1.1",
  },
    {
    id: "1.1.1.1.1",
    label: "Les faits sont-ils dénoncés à l'écrit ou sont-ils étayés par des éléments de preuve qui établissent leur véracité?",
    responses: [{
      label: "Oui",
      nextQuestionId: "1.1.1.1.1.1",
      info:undefined,
    }, {
      label: "Non",
      nextQuestionId: undefined,
      info: "L'alerte n'est pas constituée, le régime de protection du lanceur d'alerte ne s'applique pas.",
    }
    ],
    previousQuestionId: "1.1.1.1",
  },
    {
    id: "1.1.1.1.1.1",
    label: "A qui les faits sont-ils dénoncés en premier lieu?",
    responses: [{
      label: "A l'employeur du salarié",
      nextQuestionId: undefined,
      info: "A son supérieur hiérarchique, au procureur de la République par le biais d'un signalement, ou à l'organe chargé de la déontologie dans son entreprise. Le régime de protection du lanceur d'alerte s'applique (nullité des représailles).",
    }, {
      label: "A l'une des autorités judiciaires ou administratives compétentes",
      nextQuestionId: undefined,
      info: "Au Service Central de Prévention et de la Corruption (SCPC), devenu Agence Française Anticorruption (AFA) ; ou au Procureur de la République, au Parquet National Financier ou dans un commissariat. Le régime de protection du lanceur d'alerte s'applique (nullité des représailles).",
    }, {
      label: "A tout autre personne (collègue, association, média, etc)",
      nextQuestionId: undefined,
      info: "Le régime de protection du lanceur d'alerte ne s'applique pas. La personne ayant dénoncé les faits ne peut pas bénéficier du régime de protection des lanceurs d'alerte (nullité des représailles). Elle peut néanmoins demander une réparation au titre de la violation de son droit fondamental qu'est la liberté d'expression (article 10 CEDH), et/ou demander à ce que soit faite application du droit du travail (harcèlement moral, licenciement abusif, etc).",
    }
    ],
    previousQuestionId: "1.1.1.1.1",
  },
    {
    id: "1.1.2",
    label: "Dans quelle catégorie appartiennent les produits de santé et médicaments dont il est question?",
    responses: [{
      label: "Ceux des médicaments et produits de santé à usage humain",
      nextQuestionId: "1.1.2.1" ,
      info: "Révéler des faits de bonne foi implique la réunion de 4 conditions cumulatives : (1) Le dénonciateur doit poursuivre un but légitime (par exemple, dénoncer des faits illégaux ou présentant un risque pour l'intérêt général) ; (2) Les faits doivent être révélés sans aucune animosité personnelle de la part du dénonciateur (par exemple, se venger ou causer du tort à la personne concernée par l'infraction) ; (3) Le dénonciateur doit faire preuve de prudence et de mesure dans l'expression des faits litigieux (préférer la discrétion et la confidentialité dans la révélation des faits plutôt qu'une médiatisation ; emploi de termes factuels) ; (4) L'enquête menée pour révéler les faits doit être fiable.",
    }, {
      label: "D'autres types de médicaments et produits de santé n'étant pas à usage humain ",
      nextQuestionId: "1.1.3.1",
      info: "Sont notamment compris parmis eux (i) les médicaments vétérinaires ; (ii) les produits phytopharmaceutiques (Règlement n°1107/2009) ; (iii) les produits biocides (Règlement n°528/2012) ; les équipements de protection individuelle qui ne répondent pas à la définition du dispositif médical ; (iv) les denrées alimentaires (compléments alimentaires).  Dans ce cas, la loi Bertrand du 29 décembre 2011 ne s'applique pas, de sorte que l'intéressé ne bénéficiera pas du régime de protection du lanceur d'alerte. Il est néanmoins opportun de vérifier que les produits concernés entraînent ou non un risque grave pour la santé publique ou l'environnement, ce qui pourrait permettre à l'intéressé d'éventuellement profiter du régime de protection du lanceur d'alerte. ",
    }
    ],
    previousQuestionId: "1.1",
  },
    {
    id: "1.1.2.1",
    label: "Les faits sont-ils dénoncés de bonne foi?",
    responses: [{
      label: "Oui",
      nextQuestionId: "1.1.2.1.1",
      info: undefined,
    }, {
      label: "Non",
      nextQuestionId: undefined,
      info: "Le régime de protection du lanceur d'alerte ne s'applique pas. La personne ayant dénoncé des faits relatifs à la sécurité sanitaire des produits qu'elle sait partiellement ou totalement inexacts se rend coupable de dénonciation calomnieuse. Elle encourt 5 ans d'emprisonnement et 45 000 euros d'amende.",
    }
    ],
    previousQuestionId: "1.1.2",
  },
    {
    id:	"1.1.2.1.1",
    label : "Les faits sont-ils dénoncés à l'écrit ou sont-ils étayés par des éléments de preuve qui établissent leur véracité?",
    responses: [{
      label: "Oui",
      nextQuestionId: "1.1.2.1.1.1",
      info:undefined,
    }, {
      label: "Non",
      nextQuestionId: undefined,
      info: "L'alerte n'est pas constituée, le régime de protection du lanceur d'alerte ne s'applique pas.",
    }
    ],
    previousQuestionId: "1.1.2.1",
  },
    {
    id:	"1.1.2.1.1.1",
    label : "A qui les faits sont-ils dénoncés en premier lieu?",
    responses: [
      {
      label: "A son supérieur hiérarchique",
      nextQuestionId: "1.1.2.1.1.1.1",
      info:undefined,
    },
      {
      label: "A l'organe chargé de la déontologie dans son entreprise ou de son administration de rattachement",
      nextQuestionId: undefined,
      info : "Le régime de protection du lanceur d'alerte ne s'applique pas. La personne ayant dénoncé les faits ne peut bénéficier du régime de protection des lanceurs d'alerte (nullité des représailles). Elle peut néanmoins demander une réparation au titre de la violation de son droit fondamental qu'est la liberté d'expression (article 10 CEDH), et/ou demander à ce que soit faite application du droit du travail (harcèlement moral, licenciement abusif, etc).",
    },
      {
      label: "A l'une des autorités judiciaires ou administratives compétententes en la matière : Procureur de la République, Préfet ou Agence Nationale de sécurité du médicament",
      nextQuestionId: undefined,
      info : "Le régime de protection du lanceur d'alerte ne s'applique pas. La personne ayant dénoncé les faits ne peut bénéficier du régime de protection des lanceurs d'alerte (nullité des représailles). Elle peut néanmoins demander une réparation au titre de la violation de son droit fondamental qu'est la liberté d'expression (article 10 CEDH), et/ou demander à ce que soit faite application du droit du travail (harcèlement moral, licenciement abusif, etc).",
      },
      {
      label: "A toute autre personne (collègue, association, média, etc)",
      nextQuestionId: undefined,
      info : "Le régime de protection du lanceur d'alerte ne s'applique pas. La personne ayant dénoncé les faits ne peut bénéficier du régime de protection des lanceurs d'alerte (nullité des représailles). Elle peut néanmoins demander une réparation au titre de la violation de son droit fondamental qu'est la liberté d'expression (article 10 CEDH), et/ou demander à ce que soit faite application du droit du travail (harcèlement moral, licenciement abusif, etc).",
      }
  ],
  previousQuestionId: "1.1.2.1.1",
  },
    {
    id:	"1.1.2.1.1.1",
    label : "A qui les faits sont-ils dénoncés dans un second temps?",
    responses : [{
      label: "Au Procureur de la République, par le biais d'un signalement",
      nextQuestionId: "1.1.2.1.1.1",
      info:undefined,
    }, {
      label: "Au Préfet ou à l'Agence nationale de sécurité du médicament",
        nextQuestionId: "1.1.2.1.1.1",
      info:undefined,
      }
    ],
    previousQuestionId: "1.1.2.1",
  },
    {
    id: "1.1.3",
    label: "Qui dénonce les faits?",
    responses: [{
      label: "Un salarié du secteur privé ayant connaissance des faits dans l'exercice de ses fonctions",
      nextQuestionId: "1.1.3.1" ,
      info: undefined,
    }, {
      label: "Le représentant du personnel au CHSCT",
      nextQuestionId: "1.1.3.1",
      info: undefined,
    }
    ],
    previousQuestionId: "1.1",
  },
    {
    id: "1.1.3.1",
    label: "Les produits ou procédés de fabircation utilisés ou mis en oeuvre par l'établissement font-ils peser un risque grave sur la santé publique ou l'environnement?",
    responses: [{
      label: "Oui",
      nextQuestionId: "1.1.3.1.1",
      info: "Révéler des faits de bonne foi implique la réunion de 4 conditions cumulatives : (1) Le dénonciateur doit poursuivre un but légitime (par exemple, dénoncer des faits illégaux ou présentant un risque pour l'intérêt général) ; (2) Les faits doivent être révélés sans aucune animosité personnelle de la part du dénonciateur (par exemple, se venger ou causer du tort à la personne concernée par l'infraction) ; (3) Le dénonciateur doit faire preuve de prudence et de mesure dans l'expression des faits litigieux (préférer la discrétion et la confidentialité dans la révélation des faits plutôt qu'une médiatisation ; emploi de termes factuels) ; (4) L'enquête menée pour révéler les faits doit être fiable.",
    }, {
      label: "Non",
      nextQuestionId: "",
      info: "Les faits dénoncés n'entrent pas dans le champ d'application de ces dispositions",
    }
    ],
    previousQuestionId: "1.1.3",
  },
    {
    id: "1.1.3.1.1",
    label: "Les faits sont-ils dénoncés de bonne foi?",
    responses: [{
      label: "Oui",
      nextQuestionId: "1.1.3.1.1.1",
      info: undefined,
    }, {
      label: "Non",
      nextQuestionId: "undefined",
      info: "Le régime de protection du lanceur d'alerte ne s'applique pas. La personne ayant dénoncé des faits de corruption qu'elle sait partiellement ou totalement inexacts se rend coupable de dénonciation calomnieuse. Elle encourt 5 ans d'emprisonnement et 45 000 euros d'amende.",
    }
    ],
    previousQuestionId: "1.1.3.1",
  },
    {
    id: "1.1.3.1.1.1",
    label: "Les faits sont-ils dénoncés par écrit à l'employeur?",
    responses: [{
      label: "Oui",
      nextQuestionId: "1.1.3.1.1.1.1",
      info: undefined,
    }, {
      label: "Non",
      nextQuestionId: undefined,
      info: "Le régime de protection du lanceur d'alerte ne s'applique pas. Les faits doivent être dénoncés par écrit à l'employeur.",
    }
    ],
    previousQuestionId: "1.1.3.1.1",
  },
    {
    id: "1.1.3.1.1.1.1",
    label: "L'employeur y a-t-il donné suite?",
    responses: [{
      label: "L'employeur a informé le salarié des suites qu'il entendait donner à l'alerte dans un délai d'un mois.",
      nextQuestionId: undefined,
      info: "Le salarié bénéficie du régime de protection contre les mesures de discrimination et nullité des représailles. Si vous subissez une quelconque mesure de discrimination ou représailles, contactez un avocat.",
    }, {
      label: "Si l'alerte émane du CHSCT, l'employeur, qui a dû examiner l'alerte conjointement avec le représentant du personnel, a inforé le salarié des suites qu'il entendait donner à l'alerte dans un délai d'un mois",
      nextQuestionId: undefined,
      info: "Le salarié bénéficie du régime de protection contre les mesures de discrimination et nullité des représailles. Si vous subissez une quelconque mesure de discrimination ou représailles, contactez un avocat.",
    }, {
      label: "Aucune des réponses proposées",
      nextQuestionId: undefined,
      info: "Le salarié peut saisir dès à présent le Préfet de son département pour lancer l'alerte. Il bénéficie du régime de protection contre les mesures de discrimination et nullité des représailles. Si vous subissez une quelconque mesure de discrimination ou représailles, contactez un avocat. ",
    }
    ],
    previousQuestionId: "1.1.3.1.1",
  },
    {
    id: "1.1.4",
    label: "Qui dénonce les faits?",
    responses: [{
      label: "Le lanceur d'alerte est un fonctionnaire",
      nextQuestionId: "1.1.4.1",
      info: undefined,
    }, {
      label: "Toute autre personne physique ou morale",
      nextQuestionId: undefined,
      info: "Le régime de protection des fonctionnaires lanceurs d'alertes issu de la loi du 13 juillet 1983 modifié par la loi du 20 avril 2016 n'est pas applicable",
    }
    ],
    previousQuestionId: "1.1",
  },
    {
    id: "1.1.4.1",
    label: "L'alerte porte sur...",
    responses: [{
      label: "...un crime",
      nextQuestionId: "1.1.4.1.1",
      info: "Révéler des faits de bonne foi implique la réunion de 4 conditions cumulatives : (1) Le dénonciateur doit poursuivre un but légitime (par exemple, dénoncer des faits illégaux ou présentant un risque pour l'intérêt général) ; (2) Les faits doivent être révélés sans aucune animosité personnelle de la part du dénonciateur (par exemple, se venger ou causer du tort à la personne concernée par l'infraction) ; (3) Le dénonciateur doit faire preuve de prudence et de mesure dans l'expression des faits litigieux (préférer la discrétion et la confidentialité dans la révélation des faits plutôt qu'une médiatisation ; emploi de termes factuels) ; (4) L'enquête menée pour révéler les faits doit être fiable.",
    }, {
      label: "...un délit",
      nextQuestionId: "1.1.4.1.1",
      info: "Révéler des faits de bonne foi implique la réunion de 4 conditions cumulatives : (1) Le dénonciateur doit poursuivre un but légitime (par exemple, dénoncer des faits illégaux ou présentant un risque pour l'intérêt général) ; (2) Les faits doivent être révélés sans aucune animosité personnelle de la part du dénonciateur (par exemple, se venger ou causer du tort à la personne concernée par l'infraction) ; (3) Le dénonciateur doit faire preuve de prudence et de mesure dans l'expression des faits litigieux (préférer la discrétion et la confidentialité dans la révélation des faits plutôt qu'une médiatisation ; emploi de termes factuels) ; (4) L'enquête menée pour révéler les faits doit être fiable.",
    }, {
      label: "...l'existence avérée ou potentielle d'un conflit d'intérêts",
      nextQuestionId: "1.1.4.1.1",
      info: "Révéler des faits de bonne foi implique la réunion de 4 conditions cumulatives : (1) Le dénonciateur doit poursuivre un but légitime (par exemple, dénoncer des faits illégaux ou présentant un risque pour l'intérêt général) ; (2) Les faits doivent être révélés sans aucune animosité personnelle de la part du dénonciateur (par exemple, se venger ou causer du tort à la personne concernée par l'infraction) ; (3) Le dénonciateur doit faire preuve de prudence et de mesure dans l'expression des faits litigieux (préférer la discrétion et la confidentialité dans la révélation des faits plutôt qu'une médiatisation ; emploi de termes factuels) ; (4) L'enquête menée pour révéler les faits doit être fiable.",
    }, {
      label: "Aucune des solutions proposées",
      nextQuestionId: undefined,
      info: "Le régime de protection des fonctionnaires lanceurs d'alertes issu de la loi du 13 juillet 1983 modifié par la loi du 20 avril 2016 n'est pas applicable",
    }
    ],
    previousQuestionId: "1.1.4",
  },
    {
    id : "1.1.4.1.1",
    label: "Les faits sont-ils dénoncés de bonne foi?",
    responses: [{
      label: "Oui",
      nextQuestionId: "1.1.4.1.1.1",
      info: undefined,
    }, {
      label: "Non",
      nextQuestionId: undefined,
      info: "Le régime de protection du fonctionnaire lanceur d'alerte ne s'applique pas. Ce dernier encourt également 5 ans d'emprisonnement et 45 000 euros d'amende en application de l'article 226-10 du Code pénal.",
    }
    ],
    previousQuestionId: "1.1.4.1",
  },
    {
    id : "1.1.4.1.1.1",
    label: "L'agent agit-il sur la base de faits tangibles et mesurables relatif au conflit d'intérêt?",
    responses: [{
      label: "Oui",
      nextQuestionId: "1.1.4.1.1.1.1",
      info: undefined,
    }, {
      label: "Non",
      nextQuestionId: undefined,
      info: "Des éléments seulement hypothétiques ou dont les contours ne sont pas définissables ne sauraient donner lieu à une alerte sérieuse et ne le fonctionnaire ne sera donc pas protégé.",
    }
    ],
    previousQuestionId: "1.1.4.1.1",
  },
    {
    id : "1.1.4.1.1.1.1",
    label: "L'agent a-t-il dans un premier temps alerté son supérieur hiérarchique ou son référent déontologique?",
    responses: [{
      label: "Oui",
      nextQuestionId: "1.1.4.1.1.1.1.1",
      info: undefined,
    }, {
      label: "Non",
      nextQuestionId: undefined,
      info: "L'agent a l'obligation d'alerter dans un premier temps son supérieur hiérarchique ou son référent déontologique. Il doit également faire preuve de prudence et de mesure dans son signalement, car il pourrait engager sa responsabilité et subir des sanctions disciplinaires, même s'il est de bonne foi. C'est pour cela qu'il est tenu de privilégier une alerte endogène. La diffusion des informations s'opère d'abord auprès du supérieur ou d'une autorité ou instance compétente (CEDH Guja).",
    }
    ],
    previousQuestionId: "1.1.4.1.1.1",
  },
    {
    id : "1.1.4.1.1.1.1.1",
    label: "L'agent public a-t-il respecté un équilibre entre le respect de ses obligations déontologique et l'effectivité de son alerte ?",
    responses: [{
      label: "Oui",
      nextQuestionId: undefined,
      info: "L'agent public doit pour ce faire respecter ses obligations de discrétion professionnelle, d'obéissance hiérarchique, de réserve et de loyauté professionnelle. Dans ce cas, il bénéficie du régime de protection de l'agent public lancer d'alerte. Cela se traduit par une protection accordée pour le parcours professionnel de l'agent public (mesure concernant notamment le recrutement, la titularisation, la rémunération, la formation, l'évaluation, la notation, la discipline, la promotion, l'affectation et la mutation), et une protections fonctionnelle de l'agent public (ex : atteinte dans l'exercice de ses fonctions comme des menaces, violences, voies de fait, injures, diffamations ou outrages, etc., et où il est démontré le lien entre l'alerte lancée et cette atteinte). Contactez un avocat si besoin.",
    }, {
      label: "Non",
      nextQuestionId: undefined,
      info: "L'agent public doit faire preuve de prudence et de mesure dans son signalement, car il pourrait engager sa responsabilité et subir des sanctions disciplinaires, même s'il est de bonne foi.",
    }
    ],
    previousQuestionId: "1.1.4.1.1.1.1",
  },
    {
    id : "1.1.5",
    label: "Dans quel secteur les faits dénoncés ont-ils été observés?",
    responses: [{
      label: "Secteur privé",
      nextQuestionId: "1.1.5.1",
      info: undefined,
    }, {
      label: "Secteur public",
      nextQuestionId: "1.1.5.2",
      info: undefined,
    }
    ],
    previousQuestionId: "1.1",
  },
    {
    id : "1.1.5.1",
    label: "Au jour de la dénonciation, le lanceur d'alerte exerce-t-il ou a-t-il candidaté pour exercer une activité salariée au sein de l'établissement dans lequel l'alerte est constatée?",
    responses: [{
      label: "Oui",
      nextQuestionId: undefined,
      info: "Le lanceur d'alerte est protégé contre les représailles de son (ex)employeur.",
    }, {
      label: "Non",
      nextQuestionId: undefined,
      info: "Le lanceur d'alerte n'a pas vocation à être protégé contre les représailles par la loi n° 2013-1117.",
    }
    ],
    previousQuestionId: "1.1.5",
  },
    {
    id : "1.1.5.2",
    label: "Au jour de la dénonciation, le lanceur d'alerte exerce-t-il ou a-t-il candidaté pour exercer une activité salariée au sein de l'établissement dans lequel l'alerte est constatée?",
    responses: [{
      label: "Oui",
      nextQuestionId: "1.1.5.2.1",
      info: undefined,
    }, {
      label: "Non",
      nextQuestionId: undefined,
      info: "Le lanceur d'alerte n'a pas vocation à être protégé contre les représailles par la loi n° 2013-1117.",
    }
    ],
    previousQuestionId: "1.1.5",
  },
    {
    id : "1.1.5.2.1",
    label: "Le lanceur d'alerte conteste-il le non renouvellement de son contrat de travail?",
    responses: [{
      label: "Oui",
      nextQuestionId: undefined,
      info: "Le lanceur d'alerte n'est pas protégé contre les mesures de représailles prenant la forme du non renouvellement de son contrat de travail. En effet, l'une des omissions de la loi 2013-1117 est qu'il n'est pas possible de contester le non-renouvellement d'un contrat d'agent public non-titulaire.",
    }, {
      label: "Non",
      nextQuestionId: undefined,
      info: "Le lanceur d'alerte est protégé contre les représailles de son (ex)employeur.",
    }
    ],
    previousQuestionId: "1.1.5",
  },
    {
    id : "1.2",
    label: "Qui est l'auteur du signalement?",
    responses: [{
      label: "Une personne physique",
      nextQuestionId: "1.2.1",
      info: undefined,
    }, {
      label: "Un agent du service public",
      nextQuestionId: "1.2.2",
      info: "Des organismes publics ont alors l'obligation de mettre en place une procédure de signalement. Ces derniers sont : (i) les administrations de l'Etat (administrations centrales, services à compétence nationale, services déconcentrés relatifs des administrations de l'Etat), (ii) les communes de plus de 10.000 habitants, les départements et les régions, les collectivités mentionnées à l'article 72-3 de la Constitution, les établissements publics relevant de ces derniers, les établissements publics de coopération intercommunale à fiscalité propre regroupant au moins une commune de plus de 10.000 habitants, (iii) les autorités pucliques indépendantes d'au moins 50 agents et les autorités administratives indépendantes, (iv) ou tout autre personne morale de droit public ou de droit privé d'au moins 50 agents ou salariés (établissements publics, groupement d'intérêt public, etc). Les autres entités ne rentrant pas dans la liste précitée n'ont pas l'obligation de mettre en place une procédure de signalement.",
    }, {
      label: "Une personne morale (à but lucratif ou non-lucratif)",
      nextQuestionId: undefined,
      info: "Le régime de protection du lanceur d'alerte ne s'applique pas.",
    }
    ],
    previousQuestionId: "1",
  },
    {
    id : "1.2.1",
    label: "Quel est l'objet du signalement",
    responses: [{
      label: "Un crime ou un délit dont son auteur a connaissance",
      nextQuestionId: "1.1.5",
      info: undefined,
    }, {
      label: "Une violation grave et manifeste (i) d'un engagement international régulièrement ratifié ou approuvé par la France, (ii) d'un acte unilatéral d'une organisation internationale pris sur le fondement de cet engagement, (iii) de la loi ou du règlement",
      nextQuestionId: "1.2.1.1",
      info: undefined,
    }, {
      label: "Une menace ou un préjudice grave pour l'intérêt général",
      nextQuestionId: "1.2.1.1",
      info: undefined,
    }, {
      label: "Des informations couvertes par le secret de la défense nationale, le secret médical ou le secret des relations entre un avocat et son client",
      nextQuestionId: undefined,
      info: "Le régime de protection du lanceur d'alerte ne s'applique pas. En revanche, si le signalement porte sur un secret au sens de la Loi n° 2018-670 du 30 juillet 2018 relative à la protection du secret des affaires, l'article 151-8 2° de ladite Loi prévoit qu'il est fait exception à l'opposabilité du secret des affaires lors de l'exercice du droit d'alerte défini à l'article 6 de la loi n° 2016-1691 du 9 décembre 2016.",
    }
    ],
    previousQuestionId: "1.2",
  },
    {
    id : "1.2.1.1",
    label: "Quelles sont les motivations du signalement?",
    responses: [{
      label: "Le signalement est effetué de manière désintéressée par son auteur",
      nextQuestionId: "1.2.1.1.1",
      info: undefined,
    }, {
      label: "Le signalement est motivé par un grief ou une animosité personnels ou encore par la perspective d'un avantage personnel, notamment d'un gain pécunier",
      nextQuestionId: undefined,
      info: "Le régime de protection du lanceur d'alerte ne s'applique pas.",
    }, {
      label: "Des informations couvertes par le secret de la défense nationale, le secret médical ou le secret des relations entre un avocat et son client",
      nextQuestionId: undefined,
      info: "Le régime de protection du lanceur d'alerte ne s'applique pas. En revanche, si le signalement porte sur un secret au sens de la Loi n° 2018-670 du 30 juillet 2018 relative à la protection du secret des affaires, l'article 151-8 2° de ladite Loi prévoit qu'il est fait exception à l'opposabilité du secret des affaires lors de l'exercice du droit d'alerte défini à l'article 6 de la loi n° 2016-1691 du 9 décembre 2016.",
    }
    ],
    previousQuestionId: "1.2.1",
  },
    {
    id : "1.2.1.1.1",
    label: "Dans un premier temps, à qui l'intéressé a-t-il adressé son signalement?",
    responses: [{
      label: "A son supérieur hiérarchique",
      nextQuestionId: "1.2.1.1.1.1",
      info: undefined,
    }, {
      label: "Au Défenseur des droits",
      nextQuestionId: undefined,
      info: "La protection civile contre d'éventuelles représailles à l'égard du lanceur d'alerte (notamment concernant les dispositions relatives à la discrimination fondée sur le statut du lanceur d'alerte) s'applique. La protecion pénale contre d'éventuelles représailles à l'égard du lanceur d'alerte (à travers l'incrimination de délit d'entrave à l'alerte éthique notamment) s'applique. Le lanceur d'alerte jouit également d'une irresponsabilité pénale qui porte atteinte à un secret protégé par la loi.",
    }, {
      label: "Le signalement n'est pas adressé en tout premier lieu au supérieur hiérarchique",
      nextQuestionId: undefined,
      info: "Le régime de protection du lanceur d'alerte ne s'applique pas.",
    }
    ],
    previousQuestionId: "1.2.1.1",
  },
    {
    id : "1.2.1.1.1.1",
    label: "Dans un second temps, et si le supérieur hiérarchique n'a pas donné suite au signalement, à qui l'intéressé a-t-il adressé son signalement?",
    responses: [{
      label: "A l'autorité judiciaire, à l'autorité administrative ou à l'ordre professionnel compétent",
      nextQuestionId: "1.2.1.1.1.1.1",
      info: undefined,
    }, {
      label: "Au Défenseur des droits",
      nextQuestionId: undefined,
      info: "La protection civile contre d'éventuelles représailles à l'égard du lanceur d'alerte (notamment concernant les dispositions relatives à la discrimination fondée sur le statut du lanceur d'alerte) s'applique. La protecion pénale contre d'éventuelles représailles à l'égard du lanceur d'alerte (à travers l'incrimination de délit d'entrave à l'alerte éthique notamment) s'applique. Le lanceur d'alerte jouit également d'une irresponsabilité pénale qui porte atteinte à un secret protégé par la loi.",
    }, {
      label: "A aucun des acteurs précités et le signalement est rendu public",
      nextQuestionId: undefined,
      info: "Le régime de protection du lanceur d'alerte ne s'applique pas.",
    }
    ],
    previousQuestionId: "1.2.1.1.1",
  },
    {
    id : "1.2.1.1.1.1.1",
    label: "Le signalement est-il pris en compte dans un délai de trois mois à partir du signalement à l'autorité judiciaire, administrative ou l'ordre compétent?",
    responses: [{
      label: "Oui",
      nextQuestionId: undefined,
      info: "La protection civile contre d'éventuelles représailles à l'égard du lanceur d'alerte (notamment concernant les dispositions relatives à la discrimination fondée sur le statut du lanceur d'alerte) s'applique. La protecion pénale contre d'éventuelles représailles à l'égard du lanceur d'alerte (à travers l'incrimination de délit d'entrave à l'alerte éthique notamment) s'applique. Le lanceur d'alerte jouit également d'une irresponsabilité pénale qui porte atteinte à un secret protégé par la loi.",
    }, {
      label: "Non",
      nextQuestionId: undefined,
      info: "L'auteur peut rendre son signalement public dans ce cas. La protection civile contre d'éventuelles représailles à l'égard du lanceur d'alerte (notamment concernant les dispositions relatives à la discrimination fondée sur le statut du lanceur d'alerte) s'applique. La protecion pénale contre d'éventuelles représailles à l'égard du lanceur d'alerte (à travers l'incrimination de délit d'entrave à l'alerte éthique notamment) s'applique. Le lanceur d'alerte jouit également d'une irresponsabilité pénale qui porte atteinte à un secret protégé par la loi.",
    }, {
      label: "Le délai n'est pas encore expiré, mais un signalement a été fait au Défenseur des droits avant toute information publique",
      nextQuestionId: undefined,
      info: "L'auteur peut rendre son signalement public dans ce cas. La protection civile contre d'éventuelles représailles à l'égard du lanceur d'alerte (notamment concernant les dispositions relatives à la discrimination fondée sur le statut du lanceur d'alerte) s'applique. La protecion pénale contre d'éventuelles représailles à l'égard du lanceur d'alerte (à travers l'incrimination de délit d'entrave à l'alerte éthique notamment) s'applique. Le lanceur d'alerte jouit également d'une irresponsabilité pénale qui porte atteinte à un secret protégé par la loi.",
    }, {
      label: "L'auteur du signalement a rendu public son alerte avant la fin du délai de trois mois",
      nextQuestionId: undefined,
      info: "Le régime de protection du lanceur d'alerte ne s'applique pas.",
    }
    ],
    previousQuestionId: "1.2.1.1.1.1",
  },
    {
    id : "1.2.2",
    label: "Qui est l'auteur du signalement?",
    responses: [{
      label: "La personne procédant à un signalement visant l'organisme qui l'emploie ou celui auquel il apporte sa collaboration dans un cadre professionnel.",
      nextQuestionId: "1.2.2.1",
      info: "Le droit de procéder au signalement ne se limite pas au service auquel l'agent est affecté mais à l'ensemble des services qui l'emploient.",
    }, {
      label: "Un agent affecté dans une collectivité, un établissement public ou un organisme non soumis à l’obligation de mettre en place une procédure d’alerte.",
      nextQuestionId: undefined,
      info: "L'agent peut réaliser un signalement s'il respecte la procédure graduée prévue au I de l’article 8 de la loi Sapin II. Ils peuvent ainsi s’adresser au supérieur hiérarchique direct ou indirect ou, le cas échéant, à l’autorité territoriale.",
    }, {
      label: "Un tiers ou un usager des organismes précités",
      nextQuestionId: undefined,
      info: "Ces personnes peuvent réaliser un signalement, mais doivent dans ce cas recourir au préalable au Défenseur des Droits qui les orientera vers l'organisme approprié en vertu de l'article 8 IV de la loi.",
    }
    ],
    previousQuestionId: "1.2",
  },
    {
    id : "1.2.2.1",
    label: "Quel est le statut de l'agent auteur du signalement?",
    responses: [{
      label: "Fonctionnaire titulaire ou stagiaire",
      nextQuestionId: "1.2.2.1.1",
      info: undefined,
    }, {
      label: "Contractuel de droit public ou de droit privé",
      nextQuestionId: "1.2.2.1.1",
      info: undefined,
    }, {
      label: "Collaborateur extérieur et occasionnel, y compris en tant que stagiaire ou apprenti",
      nextQuestionId: "1.2.2.1.1",
      info: undefined,
    }, {
      label: "Agent de droit local employé par les administrations et agences publiques de l'Etat à l'étranger",
      nextQuestionId: "1.2.2.1.1",
      info: undefined,
    }, {
      label: "Un autre statut",
      nextQuestionId: undefined,
      info: "La personne en question n'a pas accès à la procédure de signalement. Néanmoins, elle peut toujours dénoncer les faits s'ils font l'objet d'une qualification pénale en adressant un signalement au Procureur.",
    }
    ],
    previousQuestionId: "1.2.2",
  },
    {
    id : "1.2.2.1.1",
    label: "Quel est l'objet du signalement?",
    responses: [{
      label: "Un crime ou un délit dont son auteur a connaissance",
      nextQuestionId: "",
      info: undefined,
    }, {
      label: "Une violation grave et manifeste (i) d'un engagement international régulièrement ratifié ou approuvé par la France, (ii) d'un acte unilatéral d'une organisation internationale pris sur le fondement de cet engagement, (iii) de la loi ou du règlement",
      nextQuestionId: "1.2.2.1.1.1",
      info: undefined,
    }, {
      label: "Une menace ou un préjudice grave pour l'intérêt général",
      nextQuestionId: "1.2.2.1.1.1",
      info: "Ceux-ci doivent être d'une particulière intensité : la violation doit être grave et manifeste, de même que la menace ou le préjudice doit être grave pour l'intérêt général.",
    }, {
      label: "Des informations couvertes par le secret de la défense nationale, le secret médical ou le secret des relations entre un avocat et son client",
      nextQuestionId: undefined,
      info: "Le régime de protection du lanceur d'alerte ne s'applique pas. En revanche, si le signalement porte sur un secret au sens de la Loi n° 2018-670 du 30 juillet 2018 relative à la protection du secret des affaires, l'article 151-8 2° de ladite Loi prévoit qu'il est fait exception à l'opposabilité du secret des affaires lors de l'exercice du droit d'alerte défini à l'article 6 de la loi n° 2016-1691 du 9 décembre 2016.",
    }, {
      label: "Un conflit d'intérêt qui constitue un délit de prise illégale d'intérêts, une violation grave et manifeste de la loi, ou une menace ou un préjudice grave pour l'intérêt général",
      nextQuestionId: "1.2.2.1.1.1",
      info: undefined,
    }, {
      label: "Autre",
      nextQuestionId: undefined,
      info: "Le régime de protection prévu par la loi ne s'applique pas.",
    }
    ],
    previousQuestionId: "1.2.2.1",
  },
    {
    id : "1.2.2.1.1.1",
    label: "Le signalement porte-il sur un danger grave et imminent ou est-il fait en présence d'un risque de dommages irréversibles?",
    responses: [{
      label: "Oui",
      nextQuestionId: undefined,
      info: "Les dangers graves et imminents peuvent à la fois affecter le bien commun, les tiers ou les agents dans l’exercice de leur fonction. Les risques de dommages irréversibles peuvent, par exemple, viser certains risques graves sur la santé publique ou l’environnement. Dans ce cas, l'agent peut procéder directement à la saisine des autorités extérieurs et procéder à une divulgation puvlique. Le régime de protection du lanceur d'alerte s'applique."
    }, {
      label: "Non",
      nextQuestionId: "1.2.2.1.1.1.1",
      info: undefined,
    }
    ],
    previousQuestionId: "1.2.2.1.1",
  },
    {
    id : "1.2.2.1.1.1.1",
    label: "A qui est adressé le signalement en premier lieu? (Palier n°1)",
    responses: [{
      label: "Au référent alerte de l'organisme employeur",
      nextQuestionId: "1.2.2.1.1.1.1.1.1",
      info: "Examen de la recevabilité du signalement par le destinataire : (1) Le destinataire vérifie que les faits et actes signalés apparaissent comme un crime ou un délit, une violation grave et manifeste d’un engagement international régulièrement ratifié ou approuvé par la France, d’un acte unilatéral d’une organisation internationale pris sur le fondement d’un tel engagement, de la loi ou du règlement, ou comme une menace ou un préjudice graves pour l’intérêt général ou susceptibles d’être constitutifs d’un conflit d’intérêts ; (2) Le destinataire vérifie la recevabilité ratione personae, c'est-à-dire qu'il vérifie que l'auteur du signalement a eu personnellement connaissance des faits et actes signalés, que le signalement est désintéressé et enfin que l'auteur agit de bonne foi ; (3) Le destinataire informe l'auteur de la recevabilité du signalement avant la fin du délai raisonnable imparti pour rendre la décision sur la suite donnée au signalement.",
    }, {
      label: "Au supérieur hiérarchique direct ou indirect de la personne qui dénonce les faits. Examen de la recevabilité du signalement par le destinataire : (1) Le destinataire vérifie que les faits et actes signalés apparaissent comme un crime ou un délit, une violation grave et manifeste d’un engagement international régulièrement ratifié ou approuvé par la France, d’un acte unilatéral d’une organisation internationale pris sur le fondement d’un tel engagement, de la loi ou du règlement, ou comme une menace ou un préjudice graves pour l’intérêt général ou susceptibles d’être constitutifs d’un conflit d’intérêts ; (2) Le destinataire vérifie la recevabilité ratione personae, c'est-à-dire qu'il vérifie que l'auteur du signalement a eu personnellement connaissance des faits et actes signalés, que le signalement est désintéressé et enfin que l'auteur agit de bonne foi ; (3) Le destinataire informe l'auteur de la recevabilité du signalement avant la fin du délai raisonnable imparti pour rendre la décision sur la suite donnée au signalement.",
      nextQuestionId: "1.2.2.1.1.1.1.1.1",
      info: "A noter qu'en cas de conflit d'intérêts, l'agent doit avoir préalablement alerté (en vain) l'une des autorités hiérarchiques dont il relève.",
    }, {
      label: "A une autre personne (autorité judiciaire ou administrative, média, ONG, etc)",
      nextQuestionId: undefined,
      info: "La personne ayant dénoncé les faits est susceptible de perdre le bénéfice du régime de protection.",
    }
    ],
    previousQuestionId: "1.2.2.1.1.1",
  },
    {
    id : "1.2.2.1.1.1.1.1.1",
    label: "En l'absence de suite donnée au signalement dans un délai raisonnable, le signalement est adressé dans un deuxmième lieu à ... (Pallier n°2)",
    responses: [{
      label: "Au Procureur de la République",
      nextQuestionId: undefined,
      info: "En l'absence de suite donnée au signalement dans un délai raisonnable, le signalement peut être adress à un média ou à une ONG dont l'objet est relatif aux faits dénoncés (Pallier n°3).",
    }, {
      label: "A l'autorité administrative compétente selon les faits dénoncés",
      nextQuestionId: undefined,
      info: "Par exemple, le préfet, la haute Autorité pour la transparence de la vie publique, l'Agence française anticorruption. En l'absence de traitement du signalement par les autorités dans un délai de 3 mois, l'agent peut procéder à une divulgation publique des actes et faits dont il a connaissance, mais seulement en dernier ressort (en cas de danger grave et imminent ou en présence d'un risque de dommages irréversibles), à défaut il ne bénéficierait pas du régime de protection. Il bénéficie du régime de protection de l'agent public, à savoir : (1) l'octroi de garanties (de confidentialité, d'irresponsabilité pénale  concernant des mesures discriminatoires) ; (2) d'une protection contre les mesures discriminatoires et les sanctions disciplinaires. Néanmoins, si l'agent a réalisé une dénonciation calomnieuse ou une fausse déclaration, il s'expose à une peine de cinq ans d'emprisonnement et 45 000 euros d'amende sur le fondement de l'article 266-10 du Code pénal et ce sans préjudice des autres sanctions qui pourraient être prises à son encontre. En cas de signalement abusif ou constitutif d’une infraction pénale, l’auteur du signalement ne bénéficie plus de la protection de l’article 6 ter A : il peut voir sa responsabilité civile engagée et également se voir infliger une sanction disciplinaire.",
    }, {
      label: "A l'ordre professionnel duquel relève la connaissance des faits dénoncés",
      nextQuestionId: undefined,
      info: "En l'absence de traitement du signalement par les autorités dans un délai de 3 mois, l'agent peut procéder à une divulgation publique des actes et faits dont il a connaissance, mais seulement en dernier ressort (en cas de danger grave et imminent ou en présence d'un risque de dommages irréversibles), à défaut il ne bénéficierait pas du régime de protection. Il bénéficie du régime de protection de l'agent public, à savoir : (1) l'octroi de garanties (de confidentialité, d'irresponsabilité pénale  concernant des mesures discriminatoires) ; (2) d'une protection contre les mesures discriminatoires et les sanctions disciplinaires. Néanmoins, si l'agent a réalisé une dénonciation calomnieuse ou une fausse déclaration, il s'expose à une peine de cinq ans d'emprisonnement et 45 000 euros d'amende sur le fondement de l'article 266-10 du Code pénal et ce sans préjudice des autres sanctions qui pourraient être prises à son encontre. En cas de signalement abusif ou constitutif d’une infraction pénale, l’auteur du signalement ne bénéficie plus de la protection de l’article 6 ter A : il peut voir sa responsabilité civile engagée et également se voir infliger une sanction disciplinaire.",
    }, {
      label: "Une autre personne",
      nextQuestionId: undefined,
      info: "La personne ayant dénoncé les faits est susceptible de perdre le bénéfice du régime de protection.",
    }
    ],
    previousQuestionId: "1.2.2.1.1.1",
  }
]





;

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
        if (this.state.selectedResponse.label !== "") {
            const nextQuestion = QUESTIONS_LIST2.filter(question => question.id === response.nextQuestionId);
            this.handleInfo(response.info);
            if (nextQuestion[0] !== undefined) {
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
        if (previousQuestionId !== undefined) {
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
            <div className={"FormulaireAlert"}>
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