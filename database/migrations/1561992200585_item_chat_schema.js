'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemChatSchema extends Schema {
  up () {
    this.create('item_chats', table => {
      table.increments()
      table.text('content').notNullable()
      table.boolean('visualized').defaultTo(false)
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('chat_id')
        .unsigned()
        .references('id')
        .inTable('chats')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('item_chats')
  }
}

module.exports = ItemChatSchema
