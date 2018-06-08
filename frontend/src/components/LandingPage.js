import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/landingpage.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import TakeOpenUnique from './TakeOpenUnique';
import HomePage from './HomePage';
import Team from './Team';
import Surveys from "./Surveys";
import SurveyBuilder from "./SuveryBuilder";
import ShareSurvey from "./ShareSurvey";
import TakeSurvey from "./TakeOpenSurvey";
import UniqueLinkSurvey from "./UniqueLinkSurvey";
import RenderForm from "./RenderForm";
import About from "./About";
import swal from 'sweetalert';
import EditSurvey from "./EditSurvey";
import CodeVerify from "./CodeVerify";
import AddSurveyee from "./AddSurveyee";
import Radium, {StyleRoot} from 'radium';
import Avatar from 'material-ui/Avatar';
import DP from '../images/user.png';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import {slideInRight, slideInLeft, fadeInUp,fadeIn,fadeInDown} from 'react-animations';
import Stats from "./Stats";
import axios from "axios/index";
const ROOT_URL = 'http://localhost:8080';
const styles = {
    slideInRight: {
        animation: 'x 0.8s',
        animationName: Radium.keyframes(slideInRight, 'slideInRight'),
    },
    slideInLeft: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(slideInLeft, 'slideInLeft'),
    },
    fadeInUp: {
        animation: 'x 0.8s',
        animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
    },
    fadeInDown: {
        animation: 'x 0.8s',
        animationName: Radium.keyframes(fadeInDown, 'fadeInDown'),
    },
    fadeIn: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    }
}

class LandingPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            isLoggedin:false,
        };
    }
    handleClick = (event) => {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,

        });
    };

    handleSignInSubmit= (userdata)=> {
        // alert("inside sigin");
        const temp = userdata;

        const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

        const headers = {
            'Accept': 'application/json'
        };

        const dologin = fetch(`${api}/login`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(temp),
            credentials: 'include'
        }).then(res => res.json())
            .catch(error => {
                swal("Wrong Password", "Please enter a valid password", "warning")
            });

        dologin.then((data) => {
            if (data.code == 401) {
                swal("Wrong Password", "Please enter a valid password", "warning")
            }
            else if (data.code == 200) {
                swal( "Welcome","Successfully Logged in", "success");
                this.setState(
                    {
                        isLoggedin: true
                    }
                );
                this.props.history.push("/SurveyBuilder");
            }
            else if (data.code == 400) {
                //swal("Account UnVerified", "Please verify your Account", "warning")
                // this.props.history.push("/AccountVerify");
                this.props.history.push({
                    pathname: '/AccountVerify',
                    state: temp.email
                });
            }
            else {
                swal("Invalid User", "User does not exist.Please Sign up", "error")
                this.props.history.push("/signUp");
            }
        });
    }


    handleSignOutSubmit() {

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };

        axios.create({withCredentials: true})
            .get(`${ROOT_URL}/logout`, axiosConfig)
            .then(response => {
                if(response.data.code==200){
                    this.setState(
                        {
                            isLoggedin: false
                        }
                    );
                    this.props.history.push("/");
                }
                else{

                }
            })
            .catch(error => {
                //swal("got error");
                console.log(error);
            });


    }



    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    render(){
        return (
            <div>
                <header >
                    <nav style={{'background-color':'#ffffff'}} className="navbar navbar-expand-lg navbar-dark fixed-top mb-5" id="mainNav">
                        <a className="navbar-brand d-flex align-items-center pointer " onClick={() => {
                            this.props.history.push("/");
                        }}>
                            <span className="righteous purple pl-5 " style={{'font-size':'2em'}}>Survey Ape</span>
                        </a>
                        <ul className="navbar-nav text-uppercase ml-auto">
                            <li className="nav-item mynav">
                                <a className="nav-link pointer mr-2" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/About");
                                }}>About</a>
                            </li>
                            <li className="nav-item mynav">
                                <a className="nav-link pointer mr-2" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/Team");
                                }}>Team</a>
                            </li>
                            <li className="nav-item mynav">
                                <a className="nav-link pointer mr-2" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/SignIn");
                                }}>Sign in</a>
                            </li>
                            <li className="nav-item mynav ">
                                <a className="nav-link pointer signIn" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/SignUp");
                                }}><button class="signupnav">SIGN UP</button></a>
                            </li>
                            <li className="nav-item mynav ">
                                <a className="nav-link pointer signIn" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/SurveyBuilder");
                                }}><button class="signupnav">CREATE A SURVEY</button></a>
                            </li>
                            {
                                this.state.isLoggedin ? (
                                    <li className="nav-item mynav ">
                                        <a className="nav-link pointer signIn" style={{'font-size':'1em','color':'black'}} onClick={() => {console.log('User Account');
                                        }}><div>
                                            <Avatar src={DP} onClick={this.handleClick} />
                                            <Popover
                                                open={this.state.open}
                                                anchorEl={this.state.anchorEl}
                                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                                onRequestClose={this.handleRequestClose}
                                            >
                                                <Menu>
                                                    <MenuItem primaryText="My Surveys" onClick={() => {
                                                        this.handleRequestClose();
                                                        this.props.history.push("/Surveys");}}/>
                                                    <MenuItem primaryText="Sign out" onClick={() => {
                                                        this.handleRequestClose();
                                                        this.handleSignOutSubmit();
                                                    }}/>
                                                </Menu>
                                            </Popover>
                                        </div></a>
                                    </li>
                                ):''
                            }

                        </ul>
                    </nav>
                </header>
                <div className="pt-5 mt-5">
                    <Route exact path="/" render={() => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <HomePage/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/signUp" render={() => (
                        <StyleRoot>
                            <div className="fadeInUp" style={styles.fadeInUp}>
                                <SignUp/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/signIn" render={(props) => (
                        <StyleRoot>
                            <div className="fadeInDown" style={styles.fadeInDown}>
                                <SignIn {...props} handleSignInSubmit={this.handleSignInSubmit}/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/Surveys" render={(props) => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <Surveys {...props}/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/SurveyBuilder" render={(props) => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <SurveyBuilder {...props}/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/ShareSurvey" render={(props) => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <ShareSurvey {...props}/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path='/takeSurvey/:type/:surveyId' render={(props) => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <TakeSurvey {...props}/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path='/takeSurvey/u/:surveyId' render={(props) => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <UniqueLinkSurvey {...props}/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path='/takeSurvey/open_send/:surveyId' render={(props) => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                         <TakeOpenUnique  {...props}/>
                            </div>
                        </StyleRoot>
                    )}/>






                    <Route exact path="/Team" render={() => (
                        <StyleRoot>
                            <div className="slideInRight" style={styles.slideInRight}>
                                <Team/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/editSurvey" render={() => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <EditSurvey/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/renderForm" render={() => (
                        <StyleRoot>
                            <div className="slideInRight" style={styles.slideInRight}>
                                <RenderForm/>
                            </div>
                        </StyleRoot>
                    )}/>

                    <Route exact path="/About" render={() => (
                        <StyleRoot>
                            <div className="slideInRight" style={styles.slideInRight}>
                                <About/>
                            </div>
                        </StyleRoot>
                    )}/>


                    <Route exact path="/AccountVerify" render={() => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <CodeVerify/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/AddSurveyee" render={() => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <AddSurveyee/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/Stats" render={() => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <Stats/>
                            </div>
                        </StyleRoot>
                    )}/>
                </div>
            </div>
        )
    }
}

export default withRouter(LandingPage);
