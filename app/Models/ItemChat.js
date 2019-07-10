'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ItemChat extends Model {
  static boot () {
    super.boot()
    this.addHook('afterCreate', 'ChatHook.sendWs')
    this.addHook('afterUpdate', 'ChatHook.sendStatusWs')
  }

  chat () {
    return this.belongsTo('App/Models/Chat')
  }
  user () {
    return this.belongsTo('App/Models/User')
  }

  product () {
    return this.belongsTo('App/Models/Product')
  }
}

module.exports = ItemChat
