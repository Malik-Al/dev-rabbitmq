let amqp = require('amqplib/callback_api')
const {namesQueues} = require('./message-send')
const URL = process.env.RABBIT_URL

const worker = function (){
    try {
        amqp.connect(URL, function (error0, connection){
            if(error0){
                throw error0
            }

            connection.createChannel(function (error1, channel){
                if(error1){
                    throw error1
                }
                //------------------------------------------------

                setInterval(async () => { // каждые 5 секунд перезаписывается название очередей
                    console.log('###############---------------RESTART---------------################')

                    let queueNames = await namesQueues() // название очередей

                    for (let queue of queueNames) { /// цикл перебора массив имен очередей

                        channel.assertQueue(queue, {
                            durable: true  // Это гарантирует, что очередь будет объявлена перед попыткой ее использования. после перезгрузки очередь не будет потяряно
                        })

                        channel.prefetch(1) // значением 1 говорит не отправлять новое сообщение рабочему процессу, пока он не обработает и не подтвердит предыдущее сообщение

                        channel.consume(queue, function (msg) {

                                console.log("GET Received %s", msg.content.toString())

                                setTimeout(() => {
                                    //channel.ack(msg) // режим подтверждения по одному сообщению
                                    channel.nack(msg, false, true) // режим Не подтверждения
                                }, 5000)

                                //return msg.content.toString()

                            }, {noAck: false} // автоматический режим подтверждения
                        )
                        //---------------------------------------------------
                    }

                },5000)


            })
            //console.log('connection', connection)
        })
    }catch (e) {
        return new Error(e)
    }
}
worker()


