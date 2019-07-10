'use strict'

const User = use('App/Models/User')
class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async show ({ auth }) {
    const user = await User.query()
      .where('id', auth.user.id)
      .first()
    return { user }
  }
}

module.exports = UserController
