var express = require('express')
var app = express()

app.use(express.static('public'))

envPrefix = "MYAPP"
envReply = null

app.get('/config.js', function(req, res) {
    if (envReply === null) {
        envReply = {}
        for (var envKey in process.env) {
            if (envKey.startsWith(envPrefix)) {
                storeKey = envKey.slice(envPrefix.length+1, envKey.length)
                envReply[storeKey] = process.env[envKey]
            }
        }
    }
    
    res.send('(function (window) { window.__config = window.__config || {}; window.__config = ' + JSON.stringify(envReply) + ' }(this));')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
