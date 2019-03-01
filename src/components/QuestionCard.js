import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSelectQuestion } from '../actions/shared'
class QuestionCard extends Component {
    render(){
        return(
            <div>
                <div>{this.props.author+" asks:"}</div>
                <div>{".."+this.props.question+".."}</div>
                <button onClick={() => {
                    this.props.hideContainer() 
                    this.props.dispatch(handleSelectQuestion(this.props.qid))}}>View Poll</button>
            </div>
        )
    }
}

export default connect()(QuestionCard)