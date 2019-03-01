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

export function getNameById(users,id){
  for(let i=0; i<Object.values(users).length; i++){
      if(Object.values(users)[i].id === id){
          return Object.values(users)[i].name
      }
  }
  return ""
}