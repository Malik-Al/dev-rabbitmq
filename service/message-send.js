const uuid = require('uuid')
const axios = require('axios');
const {RABBIT_URL_ADMIN} = require('../config')


exports.createChannelName = function (msg) { // найти и объединить значение source source_type на выходе названипе очереди
    try {
        let channelName = []
        if (!Array.isArray(msg)){
            const {source, sourceType} = msg
            channelName.push(source, sourceType)
            return channelName.join('')
        }
    }catch (e) {
       return new Error(e)
    }
}


exports.addIdObjects = function (msg){  // добавление каждому объекту уникальный id
    try {
        if (!Array.isArray(msg)){
            for (let msgElement in msg.array) {
                msg.array[msgElement].id = uuid.v4()
            }
            return msg
        }
    }catch (e) {
       return new Error(e)
    }
}


exports.namesQueues = async function() { // api queues names
    try {
        let arrayNameList = []
        const apiData = await axios.get(RABBIT_URL_ADMIN)
        for (let objects of apiData.data) {
            const {name} = objects
            arrayNameList.push(name)
        }
        return arrayNameList
    }catch (e) {
        return new Error(e)
    }
}













