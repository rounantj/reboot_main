var express = require('express')
var app = express();
 
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const fs = require('fs');
const { COPYFILE_EXCL } = fs.constants;
 


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'));
 
 
const cors = require('cors');
app.use(express.json())
require('dotenv').config()
const mysql      = require('mysql');
const conn = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     :'ronanr',
  password : 'mdt1234@',
  database : 'seminarios'
}); 

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
}); 
app.post('/query', (req, res) => {
    console.log(req.body) 
    execSQL("create table if not exists pessoas (id integer not null auto_increment, nome text, cargo text, time text, molas text, aluminio text, ferro text, primary key (id))",res)
})

app.post('/query2', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})



app.listen(9090); 

async function execSQL(query, res) {
    console.log(query);
    conn.query(query, async function (error, results, fields) {
      if (!error) {
        res.send(results);
      } else {
        res.send(error);
      }
    });
  }


