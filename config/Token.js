const jwt = require('jwt-simple')

module.exports = {
  async GetUserLogged(user) {
    const atm = Math.floor(Date.now() / 1000)

    const UserInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      notes: user.notes,
      iat: atm,
      exp: atm + (3 * 24 * 60 * 60)
    }
    const authSecret = process.env.APP_AUTH_SECRET
    return {
      ...UserInfo,
      token: jwt.encode(UserInfo, authSecret)
    }
  }
}