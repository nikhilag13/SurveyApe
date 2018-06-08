import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/surveys.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import ContentEdit from 'material-ui/svg-icons/image/edit';
import AddSurveyee from 'material-ui/svg-icons/social/group-add';
import Chart from 'material-ui/svg-icons/editor/insert-chart';
import UnPublish from 'material-ui/svg-icons/content/remove-circle';
import CloseSurvey from 'material-ui/svg-icons/action/visibility-off';
import ContentAdd from 'material-ui/svg-icons/image/edit';
import * as $ from "jquery";
import axios from "axios/index";
//import swal from "sweetalert/typings/sweetalert";
import IconButton from 'material-ui/IconButton';
//import swal from "sweetalert/typings/sweetalert";

import swal1 from 'sweetalert';
//import swal from "sweetalert/typings/sweetalert";

const ROOT_URL = 'http://localhost:8080';

const style = {
    marginLeft: 200,
    textAlign: 'right',
};

const styleAdd = {
    height: 30,
    width: 30,
    color: '#424242',
    marginLeft: 50,

}
const ChartStyle = {
    height: 30,
    width: 30,
    color: '#424242',
    marginLeft: 10,

};

class Surveys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveysCreated: [],
            surveysToSubmit: []
        }
    }


    componentWillMount() {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };
        axios.create({withCredentials: true})
            .get(`${ROOT_URL}/surveys`, axiosConfig)
            .then(response => {
                this.setState({
                    surveysCreated: response.data[0],
                    surveysToSubmit: response.data[1]
                });
            })
            .catch(error => {
                //swal("got error");
                console.log(error);
            });

        axios.create({withCredentials: true})
            .get(`${ROOT_URL}/session`, axiosConfig)
            .then(response => {
                if (response.data.code == 400) {
                    swal1("Invalid Session", "Please Sign in", "error")
                    this.props.history.push("/");
                }
            })
            .catch(error => {
                //swal("got error");
                console.log(error);
            });
    }

    clickedEditToCreate = (temp, name) => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };

        var surveyid = {"surveyId": temp};
        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/renderSurvey`, surveyid, axiosConfig)
            .then(response => {
                console.log(response);
                this.props.history.push({
                    pathname: '/renderForm',
                    state: {
//                        data:response.data,

                        surveyId: surveyid,
                        surveyName: name
                    }
                })
            })
            .catch(error => {
                console.log(error);
            });


    };

    clickedEdit = (temp, name) => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };
        console.log(temp);
        console.log(name);
        var surveyid = {"surveyId": temp};

        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/renderSurvey`, surveyid, axiosConfig)
            .then(response => {
                console.log(response);
                this.props.history.push({
                    pathname: '/SurveyBuilder',
                    state: {
                        data: response.data,
                        surveyId: surveyid,
                        surveyName: name
                    }
                })
            })
            .catch(error => {
                //swal("got error");
                console.log(error);
            });
    };
    unPublishSurvey = (temp, name) => {

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };
        console.log(temp);
        console.log(name);
        var surveyid = {"surveyId": temp};
        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/Unpublish`, surveyid, axiosConfig)
            .then(response => {
                if (response.data.code == 200) {
                    swal1("Success", "Survey Unpublished Succesfully", "success")
                    axios.create({withCredentials: true})
                        .get(`${ROOT_URL}/surveys`, axiosConfig)
                        .then(response => {
                            this.setState({
                                surveysCreated: response.data[0],
                                surveysToSubmit: response.data[1]
                            });
                        })
                        .catch(error => {
                            //swal("got error");
                            console.log(error);
                        });
                }
                else {
                    swal1("Invalid Attempt", "Cannot Unpublish this survey", "warning")
                }
            })
            .catch(error => {
                //swal("got error");
                console.log(error);
            });
    };
    CloseSurvey = (temp, name) => {

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };
        console.log(temp);
        console.log(name);
        var surveyid = {"surveyId": temp};
        alert("inside");
        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/close`, surveyid, axiosConfig)
            .then(response => {
                if (response.data.code == 200) {
                    swal1("Success", "Survey closed Succesfully", "success");
                    axios.create({withCredentials: true})
                        .get(`${ROOT_URL}/surveys`, axiosConfig)
                        .then(response => {
                            this.setState({
                                surveysCreated: response.data[0],
                                surveysToSubmit: response.data[1]
                            });
                        })
                        .catch(error => {
                            //swal("got error");
                            console.log(error);
                        });
                }
                else {
                    swal1("Expiry Date Set", "Sorry, Cannot close this survey", "warning")
                }
            })
            .catch(error => {
                //swal("got error");
                console.log(error);
            });
    };


    render() {
        {
            console.log(this.state.surveysCreated)
        }
        {
            console.log(this.state.surveysToSubmit)
        }
        return (
            <div>
                <div class="row">
                    <div class="col-md-5 surveyBox">
                        <h4 class="Questrial">Created Surveys</h4>
                        <hr style=
                                {{'width': '50%', 'textAlign': 'center'}}/>
                        {
                            this.state.surveysCreated.reverse().map((card, index) => (
                                <div className="EachSurveyBox">
                                    <div class="row">
                                        <b>
                                            <div className="Questrial" style={{'font-size': '20px'}}>{card.name}</div>
                                        </b>
                                        <div className="icon">
                                            {
                                                card.status == 'Saved' ? (
                                                    <FloatingActionButton mini={true}
                                                                          style={style}
                                                                          onClick={() => this.clickedEdit(card.id, card.name)}
                                                    >
                                                        <ContentEdit/>
                                                    </FloatingActionButton>
                                                ) : (
                                                    <FloatingActionButton mini={true}
                                                                          style={style}
                                                                          disabled={true}
                                                    >
                                                        <ContentEdit/>
                                                    </FloatingActionButton>
                                                )
                                            }

                                        </div>
                                    </div>
                                    <div class="row">
                                        <p className="Questrial" style={{'font-size': '15px'}}>
                                            Expiry: {card.expiryDate}</p>
                                        <div className="Questrial ml-5" style={{'font-size': '15px'}}>Status:
                                            <b>{card.status}</b></div>
                                        <div className="icon pull-right">
                                            {
                                                card.status == 'published' || card.status == 'closed' ? (
                                                    <div>
                                                        {card.status != 'closed' ?
                                                            <IconButton tooltip="Add Surveyees" touch={true}
                                                                        tooltipPosition="top-right">
                                                                <AddSurveyee style={styleAdd}
                                                                             className="pointer"
                                                                             onClick={() => {
                                                                                 this.props.history.push({
                                                                                     pathname: "/AddSurveyee",
                                                                                     state: {
                                                                                         surveyId: card.id
                                                                                     }
                                                                                 });
                                                                             }}
                                                                />
                                                            </IconButton>
                                                            : ""
                                                        }
                                                        <IconButton tooltip="See Statistics" touch={true}
                                                                    tooltipPosition="top-right">
                                                            <Chart className="icon pointer" style={ChartStyle}
                                                                   onClick={() => {
                                                                       this.props.history.push({
                                                                           pathname: '/Stats',
                                                                           state: {
                                                                               surveyId: card.id
                                                                           }
                                                                       })
                                                                   }}
                                                            />
                                                        </IconButton>

                                                        {card.status != 'closed' ?

                                                            <IconButton tooltip="UnPublish Survey" touch={true}
                                                                        tooltipPosition="top-right">
                                                                <UnPublish style={ChartStyle}
                                                                           className="pointer"
                                                                           onClick={() => {
                                                                               this.unPublishSurvey(card.id, card.name);
                                                                           }}
                                                                />
                                                            </IconButton>
                                                            : ""}

                                                        {
                                                            card.enableclose ? (
                                                                <IconButton tooltip="Close Survey" touch={true}
                                                                            tooltipPosition="top-right">
                                                                    <CloseSurvey style={ChartStyle}
                                                                                 className="pointer"
                                                                                 onClick={() => {
                                                                                     this.CloseSurvey(card.id, card.name);
                                                                                 }}

                                                                    />
                                                                </IconButton>
                                                            ) : ''
                                                        }
                                                    </div>) : ''

                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div class="col-md-5 surveyBox">
                        <h4 class="Questrial">Submitted Surveys</h4>
                        <hr style=
                                {{'width': '50%', 'textAlign': 'center'}}/>
                        {
                            this.state.surveysToSubmit.reverse().map((card, index) => (
                                <div className="EachSurveyBox">
                                    <div class="row">
                                        <b>
                                            <div className="Questrial" style={{'font-size': '20px'}}>{card.name}</div>
                                        </b>
                                        <div className="icon">
                                            {
                                                card.status == 'Saved' || card.status == 'To be Submitted' ? (
                                                    <FloatingActionButton mini={true}
                                                                          style={style}
                                                                          onClick={() => this.clickedEditToCreate(card.id, card.name)}
                                                    >
                                                        <ContentEdit/>
                                                    </FloatingActionButton>
                                                ) : (
                                                    <FloatingActionButton mini={true}
                                                                          style={style}
                                                                          disabled={true}
                                                    >
                                                        <ContentEdit/>
                                                    </FloatingActionButton>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div class="row">
                                        <p className="Questrial" style={{'font-size': '15px'}}>
                                            Expiry: {card.expiryDate}</p>
                                        <div className="Questrial ml-5" style={{'font-size': '15px'}}>Status:
                                            <b>{card.status}</b></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Surveys);