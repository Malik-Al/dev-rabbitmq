let amqp = require('amqplib/callback_api')
const {SMTP_TO_MAIL, RABBIT_URL} = require('../config')
const {namesQueues} = require('./message-send')
const {mailSend} = require('./mail-send/mail.send')

const worker = function (){
    try {
        amqp.connect(RABBIT_URL, function (error0, connection){
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

                    let resQueueNames = queueNames.filter(r => r !== 'phone_changer') // кроме очереди phone_changer

                    for (let queue of resQueueNames) { /// цикл перебора массив имен очередей

                        channel.assertQueue(queue, {
                            durable: true  // Это гарантирует, что очередь будет объявлена перед попыткой ее использования. после перезгрузки очередь не будет потяряно
                        })

                        channel.prefetch(1) // значением 1 говорит не отправлять новое сообщение рабочему процессу, пока он не обработает и не подтвердит предыдущее сообщение

                            channel.consume(queue, async function (msg) {

                                let dataRabbit = await mailSend(SMTP_TO_MAIL, msg.content.toString()) // отправка сообщения на почту outlook

                                console.log("GET Received %s", msg.content.toString())

                                if(!dataRabbit.response){ // если приходит undefined пробрасывать сообщение обратно в очередь
                                    return channel.nack(msg, false, true) // режим Не подтверждения
                                }
                                if(dataRabbit.response){ // подтверждения сообщения
                                    return channel.ack(msg) // режим подтверждения по одному сообщению
                                }

                                return dataRabbit
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



