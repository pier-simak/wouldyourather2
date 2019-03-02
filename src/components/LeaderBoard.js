import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
class LeaderBoard extends Component {
    render(){
        if (this.props.loggedIn === false) {
            return <Redirect to='/' />
        }
        return(
            <div className='center'>
            {this.props.users.sort((a,b) =>
                (Object.values(b.answers).length+b.questions.length) - (Object.values(a.answers).length+a.questions.length)
            )
            .map((user) => 
               <div key={user.id}>
                    <div>{user.name}</div>
                    <div>{"Answered questions : "+Object.values(user.answers).length}</div>
                    <div>{"Created questions : "+user.questions.length}</div>
                    <div>{"Score : "+(Object.values(user.answers).length+user.questions.length)}</div>
                    <p></p>
               </div> 
                )}
            </div>
        )
    }
}

function mapStateToProps ({users, authedUser}) {
    return {
      users: Object.values(users),
      loggedIn: authedUser !== null,
    }
  }

export default connect(mapStateToProps)(LeaderBoard)