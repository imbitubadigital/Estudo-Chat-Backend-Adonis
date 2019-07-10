'use strict'
const Chat = use('App/Models/Chat')
const ItemChat = use('App/Models/ItemChat')
class CalledController {
  async index ({ auth }) {
    const called = await Chat.query()

      .whereHas('product', builder => {
        builder.where('user_id', auth.user.id)
      })
      .with('product')
      /*  .with('user') */
      /*  .with('items') */
      .groupBy('product_id')

      .fetch()
    return called
  }

  async show ({ params, response, auth }) {
    const total = await await ItemChat.query()
      .where('product_id', params.id)
      .whereNot('user_id', auth.user.id)
      .where('visualized', 0)
      .getCount()
    return total
  }
}

module.exports = CalledController
