import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleLogin } from '../actions/shared'


function UserData(props){
  let user = props.users.filter( function (data) {
    return data.id === props.authedUser
  });
  return <div>{"Hello "+user[0].name}</div>
}
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.selection = React.createRef();
  }
  Login = (id) => {
    this.props.dispatch(handleLogin(id))
  }
  render() {
    return (
      <div>
        {this.props.loggedIn === false ? (
          <div>
            <h3>Sign In</h3>
            <select ref={(input)=> this.selection = input}>
              {this.props.users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <button onClick={() => {this.Login(this.selection.value)}}>Sign In</button>
          </div>
        ) :
        (
          <div>
          <h3 className='center'><UserData users={this.props.users} authedUser={this.props.authedUser}></UserData></h3>
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