'use strict'
const Chat = use('App/Models/Chat')
const ItemChat = use('App/Models/ItemChat')
class CalledUsers {
  async store ({ request, auth }) {
    const id = request.input('productId')
    const called = await ItemChat.query()
      .where('product_id', id)
      .whereNot('user_id', auth.user.id)
      .with('product')
      .with('user')
      .groupBy('user_id')
      .orderBy('updated_at', 'desc')
      .fetch()
    return called
  }

  async show ({ params, response, auth }) {
    const total = await await ItemChat.query()
      .where('chat_id', params.id)
      .whereNot('user_id', auth.user.id)
      .where('visualized', 0)
      .getCount()
    return total
  }
}

module.exports = CalledUsers
