const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))
app.use(cors());







const newSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    trending: {
        type: Boolean
    },
    like: {
        type: Boolean      
    }

})

const Article = new mongoose.model("Article",newSchema)





const userSignup = async (req,res) => {
    try {
     
    
        const user= req.body;
        const newUser= new User(user);
        await newUser.save();
    
        res.status(200).json('succesfully registered')
    } catch (error) {
        console.log('Error :' ,error.message)
    }
    }







const userSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min:2,
        max:20
    },
    lastName: {
        type: String,
        required: true,
        min:2,
        max:20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true  
    }

})

const User = new mongoose.model('User',userSchema)











app.post('/Signup', userSignup) ;





app.post('/article',(req,res) =>{
    const newData = new Article({ 
        title : req.body.title,
        description : req.body.description
    });
    
    newData.save()
    .then(data =>{
        res.json(data);
    })
    .catch(err =>{
        res.json({message : err})
    })
    })
    
    app.put('/article/:id',function(req,res){
        Article.findOneAndUpdate({_id: req.params.id},req.body).then(function(Article){
                res.send(Article);
        });
    });
    
    
    
    app.delete('/article/:id',function(req,res){
        Article.findOneAndDelete({_id: req.params.id}).then(function(Article){
            res.send(Article);
        });
    });
    
    
    app.put('/article/:id/like',function(req,res){
        Article.findOneAndUpdate({_id: req.params.id},req.body).then(function(Article){
                res.send(Article);
        });
    });
    





    app.get('/article/all',function(req,res,next){
        Article.find({}).then(function(Article){
            res.send(Article);
        }).catch(next);
    });
    
    app.get('/article/trending',function(req,res,next){
        Article.find({trending: true}).then(function(Article){
            res.send(Article);
        }).catch(next);
    });
    
    
    app.get('/article/:id',function(req,res,next){
        Article.findById({_id: req.params.id},req.body).then(function(Article){
                res.send(Article);
        }).catch(next);
    });
    








  
mongoose.connect('mongodb://127.0.0.1:27017/summer', {useNewUrlParser : true , useUnifiedTopology: true })
.then(() => {console.log("connected")})
.catch(err  => {console.log(" refused to connected" , err)})



app.listen(8000)