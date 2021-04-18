var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var tasks = require('./routes/tasks');

const cors = require('cors');

var port = 5000;

var app = express();

app.use(
  cors({
    origin:'http://localhost:3000',
    credentials:true
  })
)

app.set("views",path.join(__dirname, "views"))
app.set("view engins", "ejs")
app.engine("html",require('ejs').renderFile)

app.use(express.static(path.join(__dirname, "client")))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({exrended:false}))

app.use("/api",tasks)

app.listen(port, function(){
    console.log("Server start on port:" + port);
})
