import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import FormulaireAlert from "./FormulaireAlert/FormulaireAlert";
import Equipe from "./Equipe/Equipe";
import Header from "./Header/Header";

ReactDOM.render(<FormulaireAlert />, document.getElementById('root'));
ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Equipe />, document.getElementById('team'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
