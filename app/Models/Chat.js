'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  product () {
    return this.belongsTo('App/Models/Product')
  }

  items () {
    return this.hasMany('App/Models/ItemChat')
  }
}

module.exports = Chat
