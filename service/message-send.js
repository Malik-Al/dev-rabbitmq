const uuid = require('uuid')
const axios = require('axios');
const URL_ADMIN = process.env.RABBIT_URL_ADMIN


exports.createChannelName = function (msg) { // найти и объединить значение source source_type на выходе названипе очереди
    try {
        let channelName = []
        if (!Array.isArray(msg)){
            //console.log('sourceName----Object----------')
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
            //console.log('add---Id---Object----------')
            for (let msgElement in msg.alternativeRequisites) {
                msg.alternativeRequisites[msgElement].id = uuid.v4()
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
        const apiData = await axios.get(URL_ADMIN)
        for (let objects of apiData.data) {
            const {name} = objects
            arrayNameList.push(name)
        }
        return arrayNameList
    }catch (e) {
        return new Error(e)
    }
}













