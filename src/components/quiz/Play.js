import React, { Component , Fragment } from 'react';
import {Helmet} from 'react-helmet';
import M from 'materialize-css';
import { ToastContainer, toast } from 'react-toastify';

import questions from '../../questions.json';
import isEmpty from '../../utils/is-empty';
import 'react-toastify/dist/ReactToastify.css';

class Play extends Component{
    constructor (props){
        super(props);

        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyfifty: 2,
            usedFiftyFifty: false,
            time: {}
        };   
    }

    componentDidMount () { //called when component loads
        const {questions, currentQuestion ,nextQuestion, previousQuestion} = this.state;
       this.displayQuestions(questions,currentQuestion,nextQuestion,previousQuestion);  
      
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
           let {currentQuestionIndex} = this.state;
           if (!isEmpty(this.state.questions)) {
                questions = this.state.questions;
                currentQuestion = questions[currentQuestionIndex]; //first item from questions.json file
                nextQuestion = questions[currentQuestionIndex +1];
                previousQuestion = questions[currentQuestionIndex - 1];

                const answer = currentQuestion.answer;
                this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer
                });

           }
    };


    handleOptionClick = (e) => {
        toast.configure();
        if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
          this.correctAnswer();    
        } else {
            this.wrongAnswer();
        }

    }

    handleNextbuttonClick = () => {
        if (this.state.nextQuestion !== undefined){
           this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
           }), () => {
               this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
           });
        }
    };

    handlePreviousbuttonClick = () => {
        if (this.state.previousQuestion !== undefined){
           this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1
           }), () => {
               this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
           });
        }
    };

    handleQuitButtonClick = () => {
        if(window.confirm('Are you sure to Quit?')){
            this.props.history.push('/'); //takes a link which takes us back to home page
        }
    };

    handlebuttonClick = (e) => {
        switch(e.target.id) {
            case 'next-button':
                this.handleNextbuttonClick();
                 break;
            case 'previous-button':
                this.handlePreviousbuttonClick();
                 break;
            case 'quit-button':
                this.handleQuitButtonClick();
                break;
            default:
                break;
        }
    };


     
    //detect answer clicked is correct or wrong
    correctAnswer = () => {
        M.toast({
          html:'Correct Answer!',
          classes: 'toast-valid',
          displayLength: 1500
        });   
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion); //this is new state; this method is called after stats have been updated.
        });
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        
        M.toast({
          html:'Wrong Answer!',
          classes: 'toast-invalid',
          displayLength: 1500
        });   
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion); //this is new state; this method is called after stats have been updated.
        });
    }


    render() {
        const { currentQuestion, currentQuestionIndex, numberOfQuestions } = this.state;
        return(
         <Fragment>
             <Helmet>
                 <title>Think Trivia</title>
                </Helmet>
                 <div className="questions">
                     <h2>Q1</h2>
                     <div className="lifeline-container">
                         <p>
                             <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span><span className="lifeline">2</span>
                         </p>
                         <p>
                             <span className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"></span><span className="lifeline">5</span>
                         </p>
                     </div>
                     <div>
                         <p>
                             <span className="left">{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                             <span className="right">1:00<span className="mdi mdi-clock-outline mdi-24px"></span></span>
                        </p>
                     </div>
                    <h4>{currentQuestion.question}</h4>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>  
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p> 
                        <ToastContainer />   
                    </div>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>  
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p> 
                        <ToastContainer /> 
                    </div>

                    <div className="button-container">
                        <button id="previous-button" onClick={this.handlebuttonClick}>Pevious</button>
                        <button id="next-button" onClick={this.handlebuttonClick}>Next</button>
                        <button id="quit-button" onClick={this.handlebuttonClick}>Quit</button>
                    </div>
                 </div>
         </Fragment>   
        
        );
    };
}

export default Play;