const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')

const tempeletePath=path.join(__dirname,'../views')
app.set('view engine','hbs')
app.set('views',tempeletePath)

app.use(express.static(__dirname+'/public'))


const collection=require('./mongodb')
const async = require('hbs/lib/async')
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render("login")
})
app.get('/login',(req,res)=>{
    res.render("login")
})
app.get('/signup',(req,res)=>{
    res.render("signup")
})
app.post('/signup',async(req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }
    await collection.insertMany([data])
    res.render('login')
})
app.post('/login',async(req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.name,password:req.body.password})
        if(check.name===req.body.name && check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("wrong password")
        }
    }
    catch{
        res.send("wrong detailes")
    }
})
app.listen(process.env.PORT || 3000)
