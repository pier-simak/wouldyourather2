import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUserData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion.js'
import LeaderBoard from './LeaderBoard'
import LogOutPage from './LogOutPage'
import Nav from './Nav'
import QuestionDetail from './QuestionDetail';
import PageNotFound from './PageNotFound'
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleUserData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav loggedIn={this.props.loggedIn}/>
            {this.props.loading === true
              ? null
              : <div>
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/new' component={NewQuestion} />
                  <Route path='/leaderboard' component={LeaderBoard} />
                  <Route path='/logout' component={LogOutPage} />
                  <Route path='/questions/:question_id' component={QuestionDetail} />
                  <Route component={PageNotFound} />
                </Switch>
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    loading: Object.values(users).length === 0,
    loggedIn: authedUser !== null
  }
}

export default connect(mapStateToProps)(App)