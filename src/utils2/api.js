import {
  _getUsers
} from './_DATA.js'

export function getUserData () {
  return Promise.all([
    _getUsers()
  ]).then(([users]) => ({
    users
  }))
}
