Il me faudrait ce document rempli avec les informations concernant vos questions.
Le format est le suivant :

* Entre les crochets se trouve l'ensemble des questions.
* Une question commence par une accolade et se termine par une accolade (exemple : { })
* Tous les champs présent dans le model ci dessous sont obligatoires
* Les reponses fonctionnent comme les questions. La liste des réponses doit être entre
    crochets et une réponse entre accolade
* deux questions ou deux réponses sont séparées par une virgule (exemple : {}, {})
* un id est unique, deux questions ne peuvent pas avoir le même id mais deux réponses peuvent avoir un même nextQuestionId
    ou deux questions peuvent avoir le même previousQuestionId
* Comme son nom l'indique, previousQuestionId fait réference à l'id de la question d'avant. Dans le cas de la première question,
    cet id est undefined
* Comme son nom l'indique, nexQuestionId fait réference à l'id de la question d'après'. Dans le cas où il n'y a pas de question
    après, cet id est undefined
* Label fait référence à l'intitulé (que ce soit pour une question ou un réponse selon là où il est)
* info correspond à votre zone verte. En gros ce qu'il y a dans vos cases vertes et rouges. Ça correspond à une donnée
    à afficher lorsque la réponse de la question sera validé.

******* EXEMPLE TYPE FACILE A COMPRENDRE *******
[
  {
    id: "1",
    label: "Quelle heure est-il ?",
    responses: [
      {
        label: "12h",
        nextQuestionId: "1.1",
        info: undefined,
      },
      {
        label: "9h",
        nextQuestionId: "1.2",
        info: undefined,
      },
      {
        label: "00h",
        nextQuestionId: "1.3",
        info: "Le soir les restos sont fermés",
      }
    ],
    previousQuestionId: undefined
  },
  {
      id: "1.1",
      label: "Sommes nous en hiver?",
      responses: [
        {
          label: "Oui",
          nextQuestionId: "undefined",
          info: "Tu peux manger une raclette",
        },
        {
          label: "Non",
          nextQuestionId: "undefined",
          info: "Tu peux quand même manger une raclette",
        }
      ],
      previousQuestionId: undefined
    }
]

*********** EXEMPLE TYPE PROJET ****************

[
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
  }
]