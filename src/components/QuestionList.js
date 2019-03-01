import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleQuestionData } from '../actions/shared'
import QuestionCard from './QuestionCard'
import { getNameById } from '../utils2/api'
function Answered(props){
    return (
        <div>
            {Object.values(props.q).map(qu => {
                return props.checkAnsweredBy(qu.id,props.authedUser) === true ?
                <QuestionCard
                    hideContainer={props.hideContainer}
                    key={qu.id}
                    qid={qu.id}
                    author={getNameById(props.users,qu.author)}
                    question={qu.optionOne.text}></QuestionCard> :
                null
              })}
        </div>)
}
function Unanswered(props){
    return (
        <div>
            {Object.values(props.q).map(qu => {
                return props.checkAnsweredBy(qu.id,props.authedUser) === false ?
                <QuestionCard
                    hideContainer={props.hideContainer}
                    key={qu.id}
                    qid={qu.id}
                    author={getNameById(props.users,qu.author)}
                    question={qu.optionOne.text}></QuestionCard> :
                null
              })}
        </div>)
}

class QuestionList extends Component {
    componentDidMount(){
        this.props.dispatch(handleQuestionData())
    }
    checkAnsweredBy(questionid,userid){
        var check = false
        let q = Object.values(this.props.questions)
        for(let i=0; i<q.length; i++){
            if(q[i].id === questionid){
                let votes1 = q[i].optionOne.votes
                let votes2 = q[i].optionTwo.votes
                for(let j=0; j<votes1.length; j++){
                    if(votes1[j]===userid){
                        check = true
                    }
                }
                for(let j=0; j<votes2.length; j++){
                    if(votes2[j]===userid){
                        check = true
                    }
                }
            }
        }
        return check
    }
    render(){
        return(
            <div>
                {this.props.typeQ === "answered" ? (
                    <Answered 
                        hideContainer={this.props.hideContainer}
                        q={this.props.questions} 
                        users={this.props.users} 
                        authedUser={this.props.authedUser}
                        checkAnsweredBy={this.checkAnsweredBy.bind(this)}></Answered>
                ) : (
                    <Unanswered 
                        hideContainer={this.props.hideContainer}
                        q={this.props.questions} 
                        users={this.props.users} 
                        authedUser={this.props.authedUser}
                        checkAnsweredBy={this.checkAnsweredBy.bind(this)}></Unanswered>
                )}
            </div>
        )
    }
}


function mapStateToProps ({ users, questions, authedUser }) {
    return {
        questions:questions,
        users:users,
        authedUser:authedUser
    }
}

export default connect(mapStateToProps)(QuestionList)