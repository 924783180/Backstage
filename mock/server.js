let express = require('express');
let mongoose=require('mongoose');
let app = express();
let path=require('path');
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
let Notice = require('./model').Notice;
let remove=(obj,cb)=>(Notice.remove(obj,cb));
let create=(obj,cb)=>(Notice.create(obj,cb));
let find=(obj,cb)=>(Notice.find(obj,cb));
let update=(conditions,obj,cb)=>(Notice.update(conditions,obj,cb));

app.listen(8080);
app.get('/',(err,res)=>{
    res.sendFile(path.resolve('../dist/index.html'))
});
app.get('/bundle.js', (req,res)=>{
    res.sendFile(path.resolve('../dist/bundle.js'));
});
app.get('/images/favicon.ico', (req,res)=>{
    res.sendFile(path.resolve('./images/favicon.ico'));
});
app.post('/api/root',(req,res)=>{
    create({notice:"adfs",id:0,},()=>{

    });
    update({id:0},req.body,(err,doc)=>{
        if(err){
            res.send(err);
        }else{
            res.send({msg:"ok"})
        }
    });
});
app.get('/api/js/:hash?', (req,res)=>{
    find({ id:{ $ne:0}},(err,doc)=>{
        if(err){
            res.send(err);
        }else{
            res.send(doc);
        }
    });
});
app.get('/api/notice', (req,res)=>{
    find({id:0},(err,doc)=>{
        if(err){
            res.send(err);
        }else{
            res.send(doc);
        }
    });
});
app.post('/api/rootAddJs',(req,res)=>{
    let body='',jsonStr;
    req.on('data',(chunk)=>{
        body+=chunk
    });
    req.on('end',()=>{
        jsonStr=JSON.parse(body);
        res.send(jsonStr);
        let id=jsonStr.id;
        find({id:id},(err,doc)=>{
            if(doc.length===0){
                create(jsonStr,(err,doc)=>{
                    if(err){
                        res.send(err)
                    }else{

                    }
                })
            }
        });
    })
});

app.post('/api/rootUpdateJs',(req,res)=>{
    let body='',jsonStr;
    req.on('data',(chunk)=>{
        body+=chunk
    });
    req.on('end',()=>{
        jsonStr=JSON.parse(body);
        res.send(jsonStr);
        let id=jsonStr.id;
        update({id:id},jsonStr,(err,doc)=>{
            if(err){
                res.send(err)
            }
        });
    })
});
app.post('/api/removeJs',(req,res)=>{
    remove(req.body,(err,doc)=>{
        if(err){
            res.send(err)
        }
    })
});
























