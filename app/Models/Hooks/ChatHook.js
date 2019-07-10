'use strict'
const Ws = use('Ws')
const ItemChat = use('App/Models/ItemChat')
const ChatHook = (exports = module.exports = {})

ChatHook.method = async modelInstance => {}

ChatHook.sendWs = async model => {
  const item = await ItemChat.query()
    .where('id', model.id)
    .with('user')
    .with('chat.user')
    .with('chat.product.user')
    .first()
  const itemJson = item.toJSON()
  const id =
    itemJson.user_id === itemJson.chat.user_id
      ? itemJson.chat.product.user_id
      : itemJson.chat.user_id
  // console.log('jjjjjjj', id)
  const topic = Ws.getChannel('notification:*').topic(`notification:${id}`)

  topic && topic.broadcast('aviso', item)
}

ChatHook.sendStatusWs = async model => {
  const item = await ItemChat.query()
    .where('id', model.id)
    .with('user')
    .with('chat.user')
    .with('chat.product.user')
    .first()

  const itemJson = item.toJSON()
  const id =
    itemJson.user_id !== itemJson.chat.user_id
      ? itemJson.chat.product.user_id
      : itemJson.chat.user_id

  const topic = Ws.getChannel('notification:*').topic(`notification:${id}`)

  topic && topic.broadcast('aviso_status', item)
}
