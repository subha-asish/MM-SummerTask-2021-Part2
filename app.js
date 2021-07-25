const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');







app.use(bodyParser.json())








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



app.listen(3000)