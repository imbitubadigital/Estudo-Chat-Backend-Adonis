'use strict'
const Ws = use('Ws')
class CheckOnlineController {
  async show ({
    params,
    auth: {
      user: { id }
    }
  }) {
    const topicAuth = Ws.getChannel('online:*').topic(`online:${id}`)
    if (topicAuth) {
      console.log('auth', topicAuth)
    }
    return 'ok'
  }
}

module.exports = CheckOnlineController
