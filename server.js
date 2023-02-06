const express = require("express");
const { response } = require("express");
const bodyParser = require("body-parser");
const app = express();
const database = require("mysql");
const port = 5059;
const moment = require("moment");
let json = require('./data.json')
let keysArray = Object.keys(json[0]);
// add emitter
const EventEmitter = require('events');
const { request } = require("http");
const emitter = new EventEmitter();
emitter.setMaxListeners(20);
// connect to database
let connection = database.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "InvoiceApp",
});
//check db connection
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("database connected");
  }
});
// set view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//  const getdata = ()=>{
//   connection.query(`select * from invoiceDataTable`, (err, result, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       let json = result;
//       res.render('index',{json});
      
//     }
//   });
//  }
 
//  getdata();
 app.get("/index", (req, res) => {
  connection.query(`select * from invoiceDataTable`, (err, result, fields) => {
    if (err) {
      console.log(err);
    } else {
      let json = result;
      res.render('index',{json});
     }
  });
  
  });
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.post("/responseIndex", urlencodedParser, (request, response) => {
    let formData = {...request.body};
    response.redirect('/index');
   updateOrSendDatabase(formData,"");
  
});
const sendDatabase = (
  id,
  createdAt,
  paymentDue,
  description,
  paymentTerms,
  clientName,
  clientEmail,
  status,
  senderAddress,
  clientAddress,
  item,
  total
) => {
  let sql = `insert into invoiceDataTable (${keysArray[0]},${keysArray[1]},${keysArray[2]},${keysArray[3]},${keysArray[4]},${keysArray[5]},${keysArray[6]},${keysArray[7]},senderAddrerss,${keysArray[9]},${keysArray[10]},${keysArray[11]}) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
  let keyvalues = [
    id,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    item,
    total,
  ];
  connection.query(sql, keyvalues, (err, result, field, response) => {
    if (err) {
      console.log(err);
      response.redirect("/index");
    } else {
      console.log(result);
      
    }
  });
};
const shuffleArray = (arr) => {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
const updateOrSendDatabase = (formData,id1)=>{
    let senderAddress = {};
    let clientAddress = {};
    let items = [];
    let json3 = {};
    Object.keys(formData).forEach(function(key, index) {
       
      if(index <= 3 ){
        senderAddress[key] = formData[key];
      }
      else if(index > 5 && index <=9){
        if(key.includes('To')){
            let index = key.indexOf("To");
            let key1 = key.substring(0,index);
            clientAddress[key1] = formData[key];
        }
    }
      else if(index > 12 && index <= 16){
        if(!Array.isArray(formData[key])){
        json3[key] = formData[key]
        }
        }
    });
    let total = 0;
    if(json3.hasOwnProperty('name')){
      console.log(true);
    items.push(json3);
    total = items[0].total;
    }
    if(Array.isArray(formData.name)){
        let index = 0;
    let name = formData.name;
    let quantity = formData.quantity;
    let price = formData.price;
    let totalPerItem = formData.total;
    console.log(totalPerItem)
    let key = ["name","quantity","price","total"];
    for(let i of name){
        let obj = {};
        obj[key[0]] = name[index];
        obj[key[1]] = quantity[index];
        obj[key[2]] = price[index];
        obj[key[3]] = totalPerItem[index];
        items.push(obj);
        total += Number(totalPerItem[index])
        index++;
    }
    }
    console.log(items);
      let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
      let letters = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      let id ;
     
      if(id1 == "" || id1==undefined ){
      let shuffleNumber = shuffleArray(numbers);
      let shuffleLetters = shuffleArray(letters);
     id =
        shuffleLetters[0] +
        shuffleLetters[1] +
        shuffleNumber[0] +
        shuffleNumber[1] +
        shuffleNumber[2] +
        shuffleNumber[3];
      }
      else{
        id = id1;
      }
      let date1 = moment(formData.createdAt);
      let date2 = moment(formData.paymentDue);
      let paymentTerms = date2.diff(date1, "days");
       formData.Pending
        ? sendDatabase(
            id,
            formData.createdAt,
            formData.paymentDue,
            formData.description,
            paymentTerms,
            formData.clientName,
            formData.clientEmail,
            formData.Pending,
            JSON.stringify(senderAddress),
            JSON.stringify(clientAddress),
            JSON.stringify(items),
            total
          )
        : sendDatabase(
            id,
            formData.createdAt,
            formData.paymentDue,
            formData.description,
            paymentTerms,
            formData.clientName,
            formData.clientEmail,
            formData.draft,
            JSON.stringify(senderAddress),
            JSON.stringify(clientAddress),
            JSON.stringify(items),
            total
          );
         
          // getdata()
          
}
app.post("/goback", urlencodedParser, (request, response) => {
if(request.body.status){
let sql = `UPDATE invoiceDataTable SET status = 'paid' WHERE id = '${request.body.status}'`;
connection.query(sql,(err,result,fields)=>{
    if(err){
        console.log(err)
        response.redirect('/index')
    }
    else{
    console.log('function called')
        console.log(result);
        response.redirect('/index')
    }
})
}
else{
  response.redirect('/index')
}
});
app.post("/delete", urlencodedParser, (request, response) => {
   
    let sql = `DELETE FROM invoiceDataTable WHERE id ='${request.body.id}'`;
    connection.query(sql,(err,result,fields)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    })
    response.redirect('/index');
    console.log('redirect after')
   
  });
  app.get("/status",(req, res) => {
    let themeVar = req.query.themeVar;
    console.log(themeVar)
    let sql = `select * from invoiceDataTable where id='${req.query.id}'`;
    connection.query(sql,(err,result,fields)=>{
        if(err){
            res.redirect('/index');
        }
    
        result = result[0];
        res.render('status',{result,themeVar});
    })
   
  });
  app.post('/update',urlencodedParser,(request,response)=>{
   response.redirect('/index');
    let formData = {...request.body};
    console.log(formData);
    connection.query(`SELECT * FROM invoiceDataTable WHERE clientName = '${formData.clientName}'`,(err,result,fields)=>{
if(err){
  console.log('err');
  response.redirect('/index');
}
else{
  let id = result[0].id;
  connection.query(`DELETE FROM invoiceDataTable WHERE id ='${result[0].id}'`,(err,result,fields)=>{
    if(err){
      console.log(err);
      response.redirect('/index');
    }
    else{
      console.log(id,'start')
       console.log('deleted successfully');
      updateOrSendDatabase(formData,id);
     }
  })
}

    })

  })
// listen port
app.listen(port, () => {
  console.log(`server up on ${port}`);
});
