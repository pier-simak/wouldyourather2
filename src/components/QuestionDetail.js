import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNameById } from '../utils2/api'

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
        return(
            <div className='center'>
                <h3>{"Asked By "+getNameById(this.props.users,this.getQuestionDetail(this.props.selectquestion).author)}</h3>
            </div>
        )
    }
}

function mapStateToProps ({ questions, users, selectquestion }) {
  return {
    questions:questions,
    selectquestion:selectquestion,
    users:users
  }
}

export default connect(mapStateToProps)(QuestionDetail)