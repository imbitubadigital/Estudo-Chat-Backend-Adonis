'use strict'

class MeuChannelController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  onMessage (data) {
    this.socket.broadcastToAll('message', data)
  }
}

module.exports = MeuChannelController
