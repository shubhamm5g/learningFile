const mongoose=require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/learingPage')
.then(()=>{
    console.log('mongo connected');
})
.catch(()=>{
    console.log("unable to connect")
})

const LogIn = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const collection=new mongoose.model('section1',LogIn)
module.exports=collection