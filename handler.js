'use strict';
const express = require("express");
const serverlessHttp = require("serverless-http");

const getRandomInt = (max) => Math.floor(Math.random() * max);
const getDieRoll = () => getRandomInt(6)+1;

const app = express();
app.use(express.json());

app.get('/roll', async (req, res) => {
  try{
    res.json({message: `You rolled ${[getDieRoll(), getDieRoll()]}`});
  } catch (err) {
    res.status(400).json({message: 'Unexpected exception', err});
  }        
});

app.use((req, res, next) => {
  //console.error('no match found for request', req);
  return res.status(404).json({ error: `No matching API found: ${req.url}` });
});

module.exports.handler = serverlessHttp(app);
module.exports.app = app; //This is needed to run the app locally on VSCode using debugger