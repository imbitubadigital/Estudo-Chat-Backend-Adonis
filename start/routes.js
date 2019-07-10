'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('login', 'SessionController.store')
Route.post('user', 'UserController.store')
Route.get('products', 'ProductController.index')

Route.group(() => {
  Route.get('online/:id', 'CheckOnlineController.show')
  Route.get('conversations', 'ConversationsController.index')
  Route.get('/called-users/:id', 'CalledUsersController.show')
  Route.post('called-users', 'CalledUsersController.store')
  Route.get('called/:id', 'CalledController.show')
  Route.get('called', 'CalledController.index')
  Route.get('users/:id', 'UserController.show')
  Route.post('products', 'ProductController.store')
  Route.put('products/:id', 'ProductController.update')
  Route.post('chat', 'ChatController.store')
  Route.put('chat/:id', 'ChatController.update')
  Route.get('chat/:id', 'ChatController.show')
  Route.get('chat-status/:id', 'ChatController.status')
}).middleware('auth')
