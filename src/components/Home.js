import React, { Fragment } from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

const Home = () => (
    <Fragment>
        <Helmet>
            <title>Think Trivia-Home</title>
        </Helmet>
       <div id="home">
        <section>
            <div>
            <img className="logo" src={require('./logo.png')} alt="sample logo" />
            </div>
            <h1>Think Trivia</h1>
            <div className="play-button-container" >
                <ul>
                  <li><Link className="play-button" to="/play/instructions">Play</Link></li>
                </ul>
            </div>
            <div className="auth-container">
                <Link to="/login" className="auth-buttons" id="login-button">Login</Link>
                <Link to="/register" className="auth-buttons" id="signup-button">Register</Link>
            </div>
        </section>
       </div>
    </Fragment>
   
    );

export default Home;
