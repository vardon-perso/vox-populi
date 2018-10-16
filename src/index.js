import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import FormulaireAlert from "./FormulaireAlert/FormulaireAlert";
import Header from "./Header/Header";
import Navigationbar from "./Navigationbar/Navigationbar";
import Infos from "./Infos/Infos";

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Navigationbar />, document.getElementById('navbar'));
ReactDOM.render(<Infos/>, document.getElementById('infos'))
ReactDOM.render(<FormulaireAlert />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
