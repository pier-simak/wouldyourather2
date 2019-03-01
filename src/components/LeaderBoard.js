import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
    render(){
        return(
            <div className='center'>LEADERBOARD</div>
        )
    }
}

function mapStateToProps ({users}) {
    return {
      users: Object.values(users)
    }
  }

export default connect(mapStateToProps)(LeaderBoard)