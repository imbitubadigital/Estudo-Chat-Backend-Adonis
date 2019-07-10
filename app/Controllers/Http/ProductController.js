'use strict'
const Product = use('App/Models/Product')

class ProductController {
  async index ({ request, response }) {
    const product = await Product.query()
      .where('status', true)
      .with('user')
      .fetch()

    return product
  }

  async store ({ request, auth }) {
    const data = request.only(['name', 'img'])
    const product = await Product.create({ ...data, user_id: auth.user.id })
    return product
  }

  async show ({ params, request, response, view }) {}

  async update ({ params, request, response, auth }) {
    const product = await Product.query()
      .where('id', params.id)
      .where('user_id', auth.user.id)
      .first()

    const data = request.only(['name', 'img'])

    product.merge(data)
    await product.save()

    return product
  }

  async destroy ({ params, request, response }) {}
}

module.exports = ProductController
