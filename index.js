const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { messages, hashMessage, getMessage } = require('./api/messages');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded())
  .use(express.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/messages', hashMessage)
  .get('/messages/:hash', getMessage)
  .get('/add', (req, res) => res.render('pages/add_message'))
  .get('/messages', messages)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
