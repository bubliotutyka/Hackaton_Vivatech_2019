// ************************************************************************** //
//                                                                            //
//   Name :serve.js                              :::     ::::::::      :::    //
//                                             :+:      :+:   :+:    :+:      //
//   By: karma                               +:+ +:+   +:+   +:+   +:+ +:+    //
//                                         +#+  +:+   +#+   +#+  +#+  +:+     //
//   Create:2019/05/17 15:30:26          +#+#+#+#+#+ +#+   +#+ +#+#+#+#+#+    //
//                                            #+#   #+#   #+#       #+#       //
//         by karma                         ###   #########       ###.error   //
//                                                                            //
// ************************************************************************** //

const port = "4242";
const User = require('./Controller/User');
const Login = require('./Controller/SignLogin');
const Question = require('./Controller/Question');
const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');

const app = express();
let io = socket.listen('2424', function ()
{
	console.log("socket started on 2424");
});

app.use(bodyParser.json());

app.post('/login', function(req, res)
{
	console.log('oui')
	Login.login(req, res, io);
});

app.post('/signin', function (req, res)
{
	Login.signin(req, res);
});

app.post('/MakeProfile', function (req, res)
{
	User.UpdateProfile(req, res);
});

app.post('addBranch', function (req, res)
{
	Login.AddJobs(req, res);
});

app.post('/getJobs', function (req, res)
{
	Question.getJobs(req.body.user_id, res);
});

app.get('/getQuestion', function (req, res)
{
	console.log("okok");
	Question.GetQuestion(res);
});

app.listen(port, function () {
	console.log("Server started on port " + port);
});

io.on("connection", function (req, res)
{
	console.log("connected");
});