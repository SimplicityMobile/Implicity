'use strict'

let express = require('express')
let implicity = require('./index')

let app = express()

app.use('/api', implicity.api)
app.use('/', implicity.web)

let port = 3000 || process.env.PORT
app.listen(port, function() {
  console.log('Implicity server started on port ' + port)
})