import {
  _getUsers,
  _getQuestions
} from './_DATA.js'

export function getUserData () {
  return Promise.all([
    _getUsers()
  ]).then(([users]) => ({
    users
  }))
}

export function getQuestionData () {
  return Promise.all([
    _getQuestions()
  ]).then(([questions]) => ({
    questions
  }))
}
