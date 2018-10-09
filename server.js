const express = require('express');
const mongoose = require('mongoose');
const app = express();
bodyParser = require('body-parser');


app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
const User = require('./models/User');
const Visualization = require('./models/Visualization');
const userSession = require('./models/UserSession');
mongoose.connect('mongodb://localhost:27017/myapp');



app.post('/api/signin', (req, res) => {
  User.findOne({email:req.body.email}, (err, users)=>{
		if(err){
			res.send({email:'serverError', password:'servererror'});
		}else{
			res.send(users);
		}
	});
});



app.post('/api/signup', (req, res, next) => {
	
User.findOne({email:req.body.email}, (err, users)=>{
		if(err){
			res.send({email:'serverError', password:'servererror'});
		}if(users){
			return res.send({email:'error', password:'error'});
		}

			email=req.body.email;
	  	const newUser = new User();

	  	newUser.email = email;
	  	newUser.password = req.body.password;
	  	newUser.visualizations = [];
	  	newUser.save((err, user)=>{
	  		if(err){
	  			res.send({email:'erro', password:'erro'});
	  		}else{
	  			res.send({email:'sucesso', password:'sucesso'});
	  		}
	  	});
	});
		
	});

app.post('/api/newVis', (req, res) => {
	const newVis = new Visualization();
		newVis.name=req.body.name;
		newVis.width=req.body.width;
		newVis.height=req.body.height;
		newVis.x=req.body.x;
		newVis.y=req.body.y;
		newVis.save();
  User.update({ "email" : req.body.email },{ $push: { "visualizations": newVis._id } }, (err,user)=>{
  	if(err){
  		res.send({error:"errror"});
  	}else{
  		res.send(user);
  	}
  });
  
});


app.delete('/api/newVis/:idUser/:idVis', (req, res) => {
	
	User.update({ _id : req.params.idUser },{ $pull: { "visualizations": req.params.idVis} }, (err,user)=>{
  	if(err){
  		res.send({error:"errror"});
  	}else{
  		res.send(user);
  	}
  });
	Visualization.findByIdAndRemove({_id:req.params.idVis}).then(function(vis){

		res.send(vis);
	});
	
  
});
  	

app.put('/api/newVis/:idVis', (req, res) => {
	
	Visualization.findByIdAndUpdate({ _id : req.params.idVis },{name:req.body.name, width:req.body.width, 
		height:req.body.height, x:req.body.x, y:req.body.y}).then(function(vis){
			res.send(vis);
		});
  
});

app.get('/api/newVis/:idUser', (req, res) => {
	
	User.findById(req.params.idUser, (err, user)=>{
		if(err){
			res.send({email:'serverError', password:'servererror'});
		}if(user){
			return res.send({visualizations:user.visualizations});
		}

	
	});
  
});
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
