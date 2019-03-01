import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNameById, checkOption } from '../utils2/api'
import { handleSaveQuestionAnswer, handleUserData, handleQuestionData } from '../actions/shared'

class QuestionDetail extends Component {
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
        this.props.dispatch(handleSaveQuestionAnswer(this.props.authedUser,this.props.selectquestion,option))
        this.props.dispatch(handleUserData())
        this.props.dispatch(handleQuestionData())
    }
    render() {
        let option = checkOption(this.props.users,this.props.authedUser,this.props.selectquestion)
        let det = this.getQuestionDetail(this.props.selectquestion)
        return(
            <div className='center'>
                <h3>{"Asked By "+getNameById(this.props.users,det.author)}</h3>
                <h4>Results:</h4>
                <span>{det.optionOne.text+" "}</span>
                {option === "optionOne" ? <span>(Your vote)</span>: null}
                {option === "" ? <button ref={(b1)=> this.btnvote1 = b1} onClick={() => {this.saveQuestionAnswer("optionOne")}}>Vote</button>: null}
                <p></p>
                <span>{det.optionTwo.text+" "}</span>
                {option === "optionTwo" ? <span>(Your vote)</span>: null}
                {option === "" ? <button ref={(b2)=> this.btnvote2 = b2} onClick={() => {this.saveQuestionAnswer("optionTwo")}}>Vote</button>: null}
            </div>
        )
    }
}

function mapStateToProps ({ questions, users, selectquestion, authedUser }) {
  return {
    questions:questions,
    selectquestion:selectquestion,
    users:users,
    authedUser:authedUser
  }
}

export default connect(mapStateToProps)(QuestionDetail)