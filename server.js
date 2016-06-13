'use strict'

const express = require('express')
const implicity = require('./index')

const app = express()

app.use('/api', implicity.api)
app.use('/', implicity.web)

const port = 3000 || process.env.PORT
app.listen(port, function() {
  console.log('Implicity server started on port ' + port)
})