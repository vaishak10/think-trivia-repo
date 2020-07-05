import React, { Component , Fragment } from 'react';
import {Helmet} from 'react-helmet';
import M from 'materialize-css';
import { ToastContainer, toast } from 'react-toastify';
import classnames from 'classnames';

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
            previousRandomNumbers: [],
            nextButtonDisabled: false,
            previousButtonDisabled: true,
            time: {}
        };   
        this.interval = null;
    }

    componentDidMount () { //called when component loads
        const {questions, currentQuestion ,nextQuestion, previousQuestion} = this.state;
       this.displayQuestions(questions,currentQuestion,nextQuestion,previousQuestion);
       this.startTimer();  
      
    }


    //this method gets called when a question is changed.
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
                answer,
                previousRandomNumbers: []
                }, () => {
                    this.showOptions();
                    this.handleDisabledButton();
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

    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option => {
            option.style.visibility = "visible";
        });

        this.setState({
            usedFiftyFifty: false
        });
    }

    handleHints = () => {
        if(this.state.hints > 0){
            const options = Array.from(document.querySelectorAll('.option')); //returns array list
            let indexOfAnswer;
    
            options.forEach((option, index) => {
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                    indexOfAnswer = index;
                }
            });
          
            while(true){
                const randomNumber = Math.round(Math.random() * 3);
                if(randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)){
                    options.forEach((option,index) => {
                        if(index === randomNumber){
                            option.style.visibility = 'hidden';
                            this.setState( (prevState) => ({
                                hints: prevState.hints - 1,
                                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                            }));
                        }
                        
                    });
                    break; //break from while loop
                }
                if(this.state.previousRandomNumbers.length >= 3) break;
            }
    
        }
        
    } 


    handleFiftyFifty = () =>{
         if(this.state.fiftyfifty > 0 && this.state.usedFiftyFifty === false){
             const options = document.querySelectorAll('.option');
            const randomNumbers  = [];
            let indexOfAnswer;
            
            options.forEach((option, index) => {
            if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                indexOfAnswer = index;
               }
            });

            let count = 0;
            do {
                const randomNumber = Math.round(Math.random() * 3);
                if(randomNumber !== indexOfAnswer) {
                    if(randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer) ){
                        randomNumbers.push(randomNumber);
                        count++;      
                    } else {
                        while (true){
                            const newRandomNumber = Math.round(Math.random() * 3);
                            if(!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)){
                                randomNumbers.push(newRandomNumber);
                                count++;
                                break;
                            }
                        }
                    }
                }
            }while(count < 2);
            options.forEach((option,index) => {
                if(randomNumbers.includes(index)){
                    option.style.visibility = 'hidden';
                }
            });
            this.setState(prevState => ({
                fiftyfifty: prevState.fiftyfifty -1 ,
                usedFiftyFifty: true
            }) );
        }

    }
     
    startTimer = () => {
        const countDownTime = Date.now() + 900000;
        this.interval = setInterval(() =>{
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
            const seconds = Math.floor((distance % (1000*60))/(1000));

            if(distance < 0){
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes : 0,
                        seconds:0
                    }
                }, () => {
                    alert('Quiz has ended');
                    this.props.history.push('/');

                });
            }else{
                this.setState({
                    time:{
                        minutes,
                        seconds
                    }
                });
            }
        }, 1000);
    }


    handleDisabledButton = () => {
        if(this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0){
            this.setState({
                previousButtonDisabled: true
            });
        }else{
            this.setState({
                previousButtonDisabled: false,
            });

        }

        if(this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions){
            this.setState({
                nextButtonDisabled: true
            });
        }else{
            this.setState({
                nextButtonDisabled: false,
            });

        }
    }

    render() {
        const { 
            currentQuestion,
            hints,fiftyfifty, 
            currentQuestionIndex, 
            numberOfQuestions,time } = this.state;
        return(
         <Fragment>
             <Helmet>
                 <title>Think Trivia</title>
                </Helmet>
                 <div className="questions">
                     <h2>Think Trivia</h2>
                     <div className="lifeline-container">
                         <p>
                             <span onClick={this.handleFiftyFifty}  className="mdi mdi-set-center mdi-24px lifeline-icon">
                             <span className="lifeline">{fiftyfifty}</span>
                             </span>
                         </p>
                         <p>
                             <span onClick={this.handleHints} className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon">
                             <span className="lifeline">{hints}</span>
                             </span>
                         </p>
                     </div>
                     <div>
                         <p>
                             <span className="left">{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                             <span className="right">{time.minutes}:{time.seconds}<span className="mdi mdi-clock-outline mdi-24px"></span></span>
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
                        <button className={classnames('', {'disable':this.state.previousButtonDisabled})} id="previous-button" onClick={this.handlebuttonClick}>Pevious</button>
                        <button className={classnames('', {'disable':this.state.nextButtonDisabled})} id="next-button" onClick={this.handlebuttonClick}>Next</button>
                        <button id="quit-button" onClick={this.handlebuttonClick}>Quit</button>
                    </div>
                 </div>
         </Fragment>   
        
        );
    };
}

export default Play;