const { time } = require('console')
const { EventEmitter, captureRejections } = require("events")
const { resolve } = require('path')

const delay = (time) => 
new Promise(resolve => setTimeout(resolve, time))

const MetricsBus = () => {
    const e = new EventEmitter({ 
        captureRejections: true,
    })

    e.on('error', error => {
        console.error('MetricsBus capturou o erro', error)
    })

    const publish = (metric) =>{
        e.emit('metric', metric)
    }

    const subscribe = (subscriber) =>{
        e.on('metric', subscriber)
    }

    return {
        publish,
        subscribe,
    }

}

const bus = MetricsBus()

const Metric = ({ name , value, unit }) => ({
    name,
    value,
    unit,
    timestamp: new Date
})

const loggerMetricsSubscriber = async (metric) => {
    await delay(10)
    console.log(JSON.stringify(metric, null, 2))
}

module.exports = {
  bus,
  MetricsBus,
  loggerMetricsSubscriber,
  Metric,
}