import React, { Component } from 'react'

class QuestionCard extends Component {
    render(){
        return(
            <div>
                <div>{this.props.author+" asks:"}</div>
                <div>{".."+this.props.question+".."}</div>
                <button>View Poll</button>
            </div>
        )
    }
}

export default QuestionCard