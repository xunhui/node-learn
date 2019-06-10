/**
 * 将参数和 this 传递给监听器
 * 异步事件
 */

const EventEmitter = require('events')

// class MyEmitter extends EventEmitter {}

const myEmitter1 = new EventEmitter()

//接收参数
myEmitter1.on('event1', (param1, param2) => {
    console.log(param1, param2) //123 'cc'
    console.log(this == myEmitter1) // true
    console.log('Just a event')
})

//异步事件
myEmitter1.on('event2', () => {
    console.log('I am sync')
    setTimeout(() => {
        console.log('Just a async event')
    }, 500)
})

/**
 * 调用顺序根据触发器触发顺序决定
 * 同步代码先执行
 * 异步代码后执行
 */
myEmitter1.emit('event2')
//可以传递任意参数
myEmitter1.emit('event1', 123, 'cc')
