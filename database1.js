var express = require('express')
var app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const fs = require('fs');
 
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
  host     : process.env.HOST_DB,
  port     : 3306,
  user     : process.env.USER_DB,
  password : process.env.KEY_DB,
  database : process.env.NAME_DB
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
}); 
app.post('/query', async (req, res) => {
    console.log(req.body) 
    let data = await sqlQueryJson(req.body.querySQL) 
    res.send(data) 
  
});
 

app.get('/farm-turquia', async (req, res) => {
   res.render("index")
  
});
 



async function sqlQueryJson(query) {
    sqlite.connect( 'database.db');
    console.log(query)
   
    try {
        var rows = await sqlite.run(query);
        console.log(rows)
        sqlite.close()
        return rows
    } catch (e) {

        return {
            "error": e
        }
 
    }

}
 
app.listen(9090)
 


 

