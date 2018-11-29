import express from 'express'
import rndstring from 'randomstring'
import bodyParser from 'body-parser'
var cors = require('cors')();
let app = express()
app.use(cors)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '1gb', extended: false }));

import {Users, Words} from './mongo';
require('./func')

app.listen(3130, ()=>{
    console.log('Server on 3130')
})
  
require('./routes/auth')(app, Users, rndstring)
require('./routes/word')(app, Words) 