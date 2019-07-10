'use strict'
const Product = use('App/Models/Product')
const Chat = use('App/Models/Chat')
const ItemChat = use('App/Models/ItemChat')
// const ItemChat = use('App/Models/ItemChat')

class ChatController {
  async index ({ request, response, view }) {}

  async store ({ request, response, auth }) {
    const data = request.only(['product_id', 'content'])
    const product = await Product.findOrFail(data.product_id)

    const chat = await Chat.query()
      .where('product_id', data.product_id)
      .where('user_id', auth.user.id)
      .first()
    if (chat) {
      return response.status(401).send({
        error: {
          message:
            'Você já possui uma conversa iniciada relacionada a esse produto'
        }
      })
    } else {
      if (product.user_id === auth.user.id) {
        return response.status(401).send({
          error: {
            message: 'Você não pode criar uma conversa com seu próprio produto'
          }
        })
      }
      const chatInit = await Chat.create({
        user_id: auth.user.id,
        product_id: data.product_id
      })

      const itemChat = await chatInit.items().create({
        user_id: auth.user.id,
        chat_id: chatInit.id,
        visualized: 0,
        product_id: data.product_id,
        content: data.content
      })

      await itemChat.loadMany(['user', 'chat.user', 'chat.product.user'])
      return itemChat
    }
  }

  async show ({ params, request, response, auth }) {
    /*  const chat = await Chat.query()
      .where('id', params.id)
      .with('product')
      .with('user')
      .with('items.user')
      .first() */

    const itens = await ItemChat.query()
      .where('chat_id', params.id)
      .with('user')
      .with('chat.user')
      .with('chat.product.user')
      .orderBy('id', 'desc')
      .fetch()
    return itens
  }

  async update ({ params, request, response, auth }) {
    const chat = await Chat.query()
      .where('id', params.id)
      .with('product')
      .first()
    if (!chat) {
      return response.status(401).send({
        error: {
          message: 'Chat não localizado!'
        }
      })
    }
    const chatJson = await chat.toJSON()
    if (
      chatJson.user_id !== auth.user.id &&
      chatJson.product.user_id !== auth.user.id
    ) {
      return response.status(401).send({
        error: {
          message: 'Você não pode inserir dados na consersa de outro usuário!'
        }
      })
    }

    const content = request.input('content')

    const itemChat = await chat.items().create({
      user_id: auth.user.id,
      chat_id: params.id,
      visualized: 0,
      product_id: chatJson.product.id,
      content: content
    })

    await itemChat.loadMany(['user', 'chat.user', 'chat.product.user'])

    return itemChat
  }

  async status ({ params, request, response }) {
    const itemChat = await ItemChat.findOrFail(params.id)

    itemChat.visualized = 1
    await itemChat.save()
    //  await itemChat.loadMany(['user', 'chat.user', 'chat.product.user'])
    return itemChat
  }

  async destroy ({ params, request, response }) {}
}

module.exports = ChatController
