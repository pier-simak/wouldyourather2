import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleLogin } from '../actions/shared'
import QuestionList from './QuestionList'

function UserData(props){
  let user = props.users.filter( function (data) {
    return data.id === props.authedUser
  });
  return <div>{"Hello "+user[0].name}</div>
}
const pStyle = {
    display:"none"
 };
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.selection = React.createRef();
    this.answered = React.createRef();
    this.unanswered = React.createRef();
  }
  Login = (id) => {
    if(id !== "none"){
      this.props.dispatch(handleLogin(id))
    }
  }
  
  handleClick = (state) => {
    switch(state){
      case "answered" : 
         	this.unanswered.style.display = "none" 
    		  this.answered.style.display = "block" 
        	break
      case "unanswered" : 
        	this.unanswered.style.display = "block" 
    		  this.answered.style.display = "none" 
        	break
      default : 
        	break
    }
   
  }
  render() {
    return (
      <div>
        {this.props.loggedIn === false ? (
          <div className='center'>
            <h3>Welcome to the Would You Rather App!</h3>
            <h4>Please sign in to continue</h4>
            <select ref={(input)=> this.selection = input} defaultValue='none'>
              <option value='none' disabled>Select User</option>
              {this.props.users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <p></p>
            <button className='btn' onClick={() => {this.Login(this.selection.value)}}>Sign In</button>
          </div>
        ) :
        (
          <div>
            <h3 className='center'><UserData users={this.props.users} authedUser={this.props.authedUser}></UserData></h3>
            <div className='center'>
              <div>
                <button onClick={() => {this.handleClick("unanswered")}}>Unanswered Question</button>
                <button onClick={() => {this.handleClick("answered")}}>Answered Question</button>
              </div>
              <div ref={(d)=> this.unanswered = d}>
                <QuestionList typeQ="unanswered"></QuestionList>
              </div>
              <div style={pStyle} ref={(d)=> this.answered = d}>
                <QuestionList typeQ="answered"></QuestionList>
              </div>
            </div>

            <ul className='dashboard-list'>
              
            </ul>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    users: Object.values(users),
    loggedIn: authedUser !== null,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(Dashboard)