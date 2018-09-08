const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');
const userSession = require('./models/UserSession');
app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.post('/api/signin', (req, res) => {
  User.find({
  	email:email
  },(err,users)=>{
  	if(err){
  		res.send({erro:'erro na tentativa de login',
  					login:'false'});
  	}

  	const user = users[0];
  	if(!user.validPassword(password)){
  		res.send('password incorreto!')
  	}

  	const userSession = new UserSession();
  	userSession.userId = user._id;
  	userSession.save((err, doc)=>{
  		if(err){
  			res.send('erro no servidor');
  		}

  		res.send('Login Realizado com sucesso');
  	});
  });
});

app.post('/api/signup', (req, res, next) => {
	const{ body } = req;
	const{
		email,
		password
	} = body;

	email=email.toLowerCase();
  User.find({
  	email:email
  },(err, prevUser)=>{
  	if(err){
  		res.end('erro no servidor')
  	}else if(prevUser>0){
  		res.end('Conta ja existente')
  	}

  	const newUser = new User();

  	newUser.email = email;
  	newUser.password = newUser.generateHash(password);
  	newUser.save((err, user)=>{
  		if(err){
  			res.end('erro no servidor');
  		}else{
  			res.end('cadastro realizado com sucesso');
  		}
  	});
  });
});
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
