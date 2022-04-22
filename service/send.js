let amqp = require('amqplib/callback_api');
const {createChannelName, addIdObjects} = require('./message-send')
const {RABBIT_URL} = require('../config')

exports.send = function (msg){
    try {
        amqp.connect(RABBIT_URL, function(error0, connection){
            if(error0){
                throw error0
            }
            connection.createChannel(function (error1, channel) {
                if(error1){
                    throw error1
                }
                //--------------------------------------------------------

                let queue = createChannelName(msg)

                channel.assertQueue(queue, {
                    durable: true
                })

                const res = addIdObjects(msg)

                for (let msgElement of res.array) {

                    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgElement)), { // добавить сообщение в очерердь
                        persistent: true,
                    })

                    console.log("POST Sent '%s'", msgElement)
                }
                channel.close()
                //--------------------------------------------------------
            })

            setTimeout(function (){
                connection.close()
            },500)
        })
        return msg

    }catch (e) {
        return new Error(e)
    }
}


