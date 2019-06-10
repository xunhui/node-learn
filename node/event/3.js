/**
 * emmiter.once(eventName, handler) 只触发一次的事件，触发后监听器被清除
 * emmiter.emit('error', handler) 监听错误事件
 */


const EventEmitter = require('events')

// class MyEmitter extends EventEmitter {}

const myEmitter = new EventEmitter()

myEmitter.once('event', () => {
    console.log('I can be triggered just one time')
})

myEmitter.on('error', (err) => {
    console.error('This is an', err)
})

myEmitter.emit('event')
myEmitter.emit('error', new Error('what?!'))
//myEmitter.emit('event') //nothing