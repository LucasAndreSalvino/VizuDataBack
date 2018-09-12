const express = require('express');
const mongoose = require('mongoose');
const app = express();
bodyParser = require('body-parser');


app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
const User = require('./models/User');
const userSession = require('./models/UserSession');
mongoose.connect('mongodb://localhost:27017/myapp');

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

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
	

			email=req.body.email.toLowerCase();
	  	const newUser = new User();

	  	newUser.email = email;
	  	newUser.password = req.body.password;
	  	newUser.save((err, user)=>{
	  		if(err){
	  			res.send({email:'erro', password:'erro'});
	  		}else{
	  			res.send({email:'sucesso', password:'sucesso'});
	  		}
	  	});
	});

	

  	

  	



const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
