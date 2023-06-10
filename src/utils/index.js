const topicProtocol = value =>{

    let topic = value
    topic = topic.indexOf('http') === -1 ? `https://${topic}` : topic
    topic = topic.indexOf('http://') === 0 ? `https://${topic.split('http://')[1]}` : topic
    topic = topic.replace('www.','')
    topic = topic.replace('www.','')
    topic = topic.split('?')[0]

    return topic
}

module.exports = {
    topicProtocol
}