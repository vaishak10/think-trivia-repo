import React, { Component,Fragment } from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';



class QuizSummary extends Component {

constructor (props){
    super(props);
    this.state = {
        score: 0,
        numberOfQuestions: 0,
        numberOfAnsweredQuestions: 0,
        correctAnswers:0,
        wrongAnswers: 0,
        hintsUsed: 0,
        fiftyFiftyUsed: 0

    };
}

componentDidMount (){
    const { state } = this.props.location;
    this.setState({
        score: (state.score/state.numberOfQuestions)* 100,
        numberOfQuestions: state.numberOfQuestions,
        numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
        correctAnswers:state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        hintsUsed: state.hintsUsed,
        fiftyFiftyUsed: state.fiftyFiftyUsed

    });
}
 render() {
     const { state } = this.props.location;
     let stats,remark;
     const userScore = this.state.score;
     if(userScore<=30){
         remark="Need to Practice";
     }else if(userScore >30 && userScore<=50){
         remark="Better luck next time!";
     }else if(userScore<=70 && userScore>50){
         remark="You cam do better!";
     }else if(userScore>=71 && userScore<=84){
         remark="You did greattt!!!";
     }else{
         remark="You are a genius";
     }

     if(state !== undefined){
            stats=(
                <Fragment>
                    <h1>Quiz has ended</h1>
                    <div className="container">
                        <h4>{remark}</h4>
                        <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                        <span className="stat left">Total Number of Questions: </span>
                        <span className="right">{this.state.numberOfQuestions}</span><br/>

                        <span className="stat left">Attempted questions: </span>
                        <span className="right">{this.state.numberOfAnsweredQuestions}</span><br/>

                        <span className="stat left">Total Number of correct answers: </span>
                        <span className="right">{this.state.correctAnswers}</span><br/>

                        <span className="stat left">Total Number of Wrong answers: </span>
                        <span className="right">{this.state.wrongAnswers}</span><br/>

                        <span className="stat left">Hints used : </span>
                        <span className="right">{this.state.hintsUsed}</span><br/>

                        <span className="stat left">50-50 lifelines used : </span>
                        <span className="right">{this.state.fiftyFiftyUsed}</span><br/>
                    </div>
                    <br/>
                    <br/>
                    <div className="play-container"> 
                        <span className="left"><Link className="play-button" id="back-home" to="/">Back Home</Link></span>
                        <span className="right"><Link className="play-button" id="lets-play" to="/play/quiz">Play Again!</Link></span>
                    </div>
                </Fragment>
            );
     }else{
         stats = (
             <section className="play-container">
             <h1 className="no-stats">No stats available</h1>
             <ul>
                <li>
                    <Link className="play-button" id="back-home" to="/">Back Home</Link>
                </li>
                <li>
                    <Link className="play-button" id="lets-play" to="/play/quiz">Play Again!</Link>
                </li>
            </ul>
            </section>
         );

     }
    return(
       <Fragment>
        <Helmet><title>Think Trivia - Summary</title></Helmet>
        {stats}
       </Fragment>
    );
 }
   

}

export default QuizSummary;