'use strict'

var express = require('express')
var implicity = require('./index')

var app = express()

app.use('/api', implicity.api)
app.use('/', implicity.web)

var port = 3000 || process.env.PORT
app.listen(port, function() {
  console.log('Implicity server started on port ' + port)
})