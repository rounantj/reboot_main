var express = require('express')
var app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const fs = require('fs');
const { COPYFILE_EXCL } = fs.constants;
var sqlite = require('sqlite-sync');


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'));
app.engine('handlebars', handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

const cors = require('cors');
app.use(express.json())
require('dotenv').config()
const mysql      = require('mysql');
const conn = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     :'root',
  password : '',
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
    execSQL(req.body.querySQL, res) 
})
 
app.listen(80); 

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


