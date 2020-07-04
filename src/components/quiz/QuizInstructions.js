import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';



const QuizInstructions =  () => (
    <Fragment>

        <Helmet><title>Instructions - Think trivia</title></Helmet>
        <div id="instructions">
            <section>
              <h1>How to play!</h1>
              <h5>Read the instructions carefully!!!</h5>
              <ol className="browser-default" id="main-li">
                 <li>Duration of the quiz is 15 minutes.</li>
                 <li>There are total 15 questions to answer</li>
                 <li>Every question has 4 options</li>
                 <li>Choose your answers wisely and submit</li>
                 <li>There are 2 lifelines:
                     <ul id="sublist">
                         <li>* 50-50 </li>
                         <li>* 5 hints</li>

                     </ul>
                 </li>
                 <li>
                     Selecting a 50-50 lifeline by clicking on the 50-50 icon 
                     <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>

                 </li>
                 <li>
                     using a hint option by clicking the icon
                     <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>
                     will remove one wrong and leave two wrong and one correct answer.
                 </li>
                 <li>
                     feel free to quit the quiz at any time
                 </li>
                 <li>
                     Timer starts as soon as the quiz loads
                 </li>
                 <li>
                     So ,if are you done reading the tips ... LET'S BEGIN THINK TRIVIA!!!
                 </li>
              </ol>
              <br/>
              <div className="auth-container"> 
                  <span className="left"><Link className="auth-button" id="back-home" to="/">Back to Home</Link></span>
                  <span className="right"><Link className="auth-button" id="lets-play" to="/play/quiz">LETS QUIZ'IT</Link></span>
              </div>
            </section>
        </div>
    </Fragment>
);

export default QuizInstructions;