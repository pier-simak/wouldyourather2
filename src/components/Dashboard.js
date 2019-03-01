import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'

class Dashboard extends Component {
  render() {
    return (
      <div>
        {this.props.loggedIn === false ? (
          <div>
            <h3>Sign In</h3>
          </div>
        ) :
        (
          <div>
          <h3 className='center'>Your Timeline</h3>
          <ul className='dashboard-list'>
            {this.props.users.map((user) => (
              <li key={user.id}>
                <div>{user.name}</div>
              </li>
            ))}
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
    loggedIn: authedUser !== null
  }
}

export default connect(mapStateToProps)(Dashboard)