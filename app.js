var express = require('express')
var app = express()

app.use(express.static('public'))

envPrefix = "MYAPP"
envReply = null

app.get('/config', function(req, res) {
    if (envReply == null) {
        envReply = {}
        for (var envKey in process.env) {
            if (envKey.startsWith(envPrefix)) {
                envReply[envKey] = process.env[envKey]
            }
        }
    }
    
    res.send(envReply)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
