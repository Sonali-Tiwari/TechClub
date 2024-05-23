const express = require('express');
const path=require('path');
const port = 8000;

const app=express();
// const ejs = require('ejs');
const mysql=require('mysql')

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'techknightclub'
})

con.connect(function(err){
    if(err) throw err;
    console.log('connected');

})
 

app.use(express.static('assets'))
app.use(express.urlencoded());



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')


app.get('/',function(req,res){
    return res.render('index')
})
app.get("/joinform",(req,res)=>{
    //Fetching data from form
    // res.send(req.query)
    // const name=req.query.name
    const {name,email,phone,message}=req.query

    //Sanitization XSS...
    let qry="SELECT *FROM joinform WHERE  email=? OR phone=?"
    con.query(qry,[email,phone],(err,results)=>{
            if(err) throw err
            else{
               if(results.length >0){
                    // res.render('index',)
                    // res.send("Email or Phone are already joined in Tech Knight")
               }
               else {
                 //Insert Query

                 let qry2= "insert into joinform values(?,?,?,?)";
            con.query(qry2,[name,email,phone,message],(err,results)=>{
                    // res.send(results);
                    // if(results.affectedRows > 0){
                    //  res.render('index',{mesg:"sonali"})
                    // res.send("message sent")

                    // }
                 })
               }
            }
    })
})

app.listen(port,function(err){
    if(err)
    console.log("Error");
else
    console.log("Server started on port ",port);
})