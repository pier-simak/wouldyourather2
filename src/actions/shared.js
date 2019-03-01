import { getInitialData } from '../utils/api'
import { getUserData,getQuestionData } from '../utils2/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { selectQuestion } from '../actions/questions'
import { receiveTweets } from '../actions/tweets'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, tweets }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveTweets(tweets))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}

export function handleUserData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getUserData()
      .then(({ users }) => {
        dispatch(receiveUsers(users))
        dispatch(hideLoading())
      })
  }
}

export function handleQuestionData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getQuestionData()
      .then(({ questions }) => {
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}

export function handleLogin (id) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(setAuthedUser(id))
    dispatch(hideLoading())
  }
}

export function handleSelectQuestion (question) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(selectQuestion(question))
    dispatch(hideLoading())
  }
}