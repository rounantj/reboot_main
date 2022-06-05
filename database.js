var express = require('express')
var app = express();
 
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const fs = require('fs');
const { COPYFILE_EXCL } = fs.constants;
 


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'));
var sqlite = require('sqlite-sync');
 
const cors = require('cors');
app.use(express.json())
require('dotenv').config()
var mongoose = require('mongoose')
//var strConn = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0'
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
 
app.listen(9090); 

 

