import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNameById, checkOption } from '../utils2/api'
class QuestionDetail extends Component {
    getQuestionDetail = (id) => {
        let qlist = Object.values(this.props.questions)
        for(let i=0; i<qlist.length; i++){
            if(qlist[i].id === id){
                return qlist[i]
            }
        }
    }
    render() {
        let option = checkOption(this.props.users,this.props.authedUser,this.props.selectquestion)
        let det = this.getQuestionDetail(this.props.selectquestion)
        return(
            <div className='center'>
                <h3>{"Asked By "+getNameById(this.props.users,det.author)}</h3>
                <h4>Results:</h4>
                <p>{det.optionOne.text}</p>
                {option === "optionOne" ? <p>Your Vote</p>: null}
                <p>{det.optionTwo.text}</p>
                {option === "optionTwo" ? <p>Your Vote</p>: null}
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