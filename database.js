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
        return rows
    } catch (e) {

        return {
            "error": e
        }

    //     setTimeout(function () {
    //         // Listen for the 'exit' event. 
    //         // This is emitted when our app exits.
    //         process.on("exit", function () {
    // ​
    //           //  Resolve the `child_process` module, and `spawn` 
    //           //  a new process.
    //           //  The `child_process` module lets us
    //           //  access OS functionalities by running any bash command.`.
    //           require("child_process")
    //             .spawn(
    //               process.argv.shift(),
    //               process.argv,
    //               {
    //                 cwd: process.cwd(),
    //                 detached: true,
    //                 stdio: "inherit"
    //               }
    //             );
              
    //         });
    //         process.exit();
    //     }, 1000);
   
    }
}
 
app.listen(9090); 

 

