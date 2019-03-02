import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNameById, checkOption } from '../utils2/api'
import { handleSaveQuestionAnswer, handleUserData, handleQuestionData } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class QuestionDetail extends Component {
    state = {
        toHome: false
    }
    constructor(props) {
        super(props);
        this.btnvote1 = React.createRef();
        this.btnvote2 = React.createRef();
    }
    getQuestionDetail = (id) => {
        let qlist = Object.values(this.props.questions)
        for(let i=0; i<qlist.length; i++){
            if(qlist[i].id === id){
                return qlist[i]
            }
        }
    }
    saveQuestionAnswer = (option) =>{
        this.btnvote1.style.display = "none"
        this.btnvote2.style.display = "none"
        this.props.dispatch(handleSaveQuestionAnswer(this.props.authedUser,this.props.match.params.question_id,option))
        this.props.dispatch(handleUserData())
        this.props.dispatch(handleQuestionData())
    }
    backToHome = () => {
        this.setState({toHome:true})
    }
    render() {
        if (this.state.toHome === true || this.props.isLoggedIn === false) {
            return <Redirect to='/' />
        }
        let option = checkOption(this.props.users,this.props.authedUser,this.props.match.params.question_id)
        let det = this.getQuestionDetail(this.props.match.params.question_id)
        let vote1count = det.optionOne.votes.length
        let vote2count = det.optionTwo.votes.length
        let votetotal = vote1count+vote2count
        let percent1 = (vote1count/(votetotal))*100
        let percent2 = (vote2count/(votetotal))*100
        return(
            <div className='center'>
            {option==="" ? (
                <div>
                    <h3>{getNameById(this.props.users,det.author) + " Asks : "}</h3>
                        <h4>Would You Rather...</h4>
                        <span>{det.optionOne.text+" "}</span>
                        <button ref={(b1)=> this.btnvote1 = b1} onClick={() => {this.saveQuestionAnswer("optionOne")}}>Vote</button>
                        <p></p>
                        <span>{det.optionTwo.text+" "}</span>
                        <button ref={(b2)=> this.btnvote2 = b2} onClick={() => {this.saveQuestionAnswer("optionTwo")}}>Vote</button>
                </div>
            ) : (
                <div>
                    <h3>{"Asked By "+getNameById(this.props.users,det.author)}</h3>
                    <h4>Results:</h4>
                    <span>{"Would you rather "+det.optionOne.text+" ? "}</span>
                    {option === "optionOne" ? <span>(Your vote)</span>: null}
                    <div>{vote1count+" out of "+votetotal+" votes ("+percent1+"%)"}</div>
                    <p></p>
                    <span>{"Would you rather "+det.optionTwo.text+" ? "}</span>
                    {option === "optionTwo" ? <span>(Your vote)</span>: null}
                    <div>{vote2count+" out of "+votetotal+" votes ("+percent2+"%)"}</div>
                </div>
            )}
            <p></p>
            <button onClick={this.backToHome}>Back</button>
            </div>
        )
    }
}

function mapStateToProps ({ questions, users, selectquestion, authedUser }) {
  return {
    questions:questions,
    selectquestion:selectquestion,
    users:users,
    authedUser:authedUser,
    loggedIn: authedUser !== null,
  }
}

export default connect(mapStateToProps)(QuestionDetail)