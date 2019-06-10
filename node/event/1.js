/**
 * Node 中能触发事件的对象都是 EventEmitter 类的实例
 * 使用 eventEmitter.on() 注册监听器 (listener)， eventEmitter.emit() 触发事件 (emitter)。
 */

const EventEmitter = require('events')

// class MyEmitter extends EventEmitter {}

const myEmitter = new EventEmitter()

myEmitter.on('myEvent', () => {
    console.log('Just a event')
})

myEmitter.emit('myEvent')
