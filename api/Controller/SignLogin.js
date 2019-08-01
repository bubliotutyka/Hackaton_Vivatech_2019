// ************************************************************************** //
//                                                                            //
//   Name :SignLogin.js                          :::     ::::::::      :::    //
//                                             :+:      :+:   :+:    :+:      //
//   By: karma                               +:+ +:+   +:+   +:+   +:+ +:+    //
//                                         +#+  +:+   +#+   +#+  +#+  +:+     //
//   Create:2019/05/17 16:36:27          +#+#+#+#+#+ +#+   +#+ +#+#+#+#+#+    //
//                                            #+#   #+#   #+#       #+#       //
//         by karma                         ###   #########       ###.error   //
//                                                                            //
// ************************************************************************** //
'use strict'
const db = require('../Model/Database')
const bcrypt = require('bcrypt');
const tableSign = [ 'login', 'password', 'last_name', 'first_name', 'age', 'mail' ]
module.exports =
	{
		async signin(req, res)
		{
			let data = await checkSignin(req.body);
			if (data === false)
				res.status(401).send({ error: 'Bad information' })
			else
			{
				let t = await db.NewUser(data);
				if (t === false)
					res.status(401).send({ error: 'Bad information' })
				else
					res.status(200).send({ data: "OK"});
			}
		},

		async addJobs(req, res)
		{
			let data = req.body;
			if (data === false)
				res.status(401).send({ error: 'Bad information' })
			else
			{
				let t = await db.UpdateProfile(data);
				if (t === false)
					res.status(401).send({ error: 'Bad information' })
				else
					res.status(200).send({ data: "OK"});
			}
		},

		async login(req, res, io)
		{

			let data = await checkLogin(req.body);
			console.log("user id: "+ data);
			if (data === false)
				res.status("402").send({ error: "Bad information" });
			else
			{
				res.status('200').send({ data: "Connected" });
				io.emit("message", data);
			}
		}
	}

function	checkLogin(data)
{
	// console.log(data);
	return (new Promise(async function (resolve, reject)
	{
		if (data.login && data.password)
		{
			let result = await db.getConnection(data.login)
			if (result === false || result.length === 0)
				resolve(false);
			else
			{
				console.log(result[0])
				console.log(data.password);
				let res = await bcrypt.compare(data.password,
					result[0].user_passwd).then(function (res)
					{
						if (res === true)
							resolve(result[0].id_users);
						else
							resolve(false);
						
					}
				)
			}
		}
		else
			resolve (false);
	}));
}

function	checkSignin(data)
{
	return (new Promise(async function (resolve, reject)
	{
		let c = -1;
		let lent = tableSign.length
		while (++c < lent)
		{
			if (!data[ tableSign[ c ] ])
				resolve(false);
		}
		let checkLogin = await db.GetUserName(data.login);
		// let checkMail = await db.GetMail(data.mail);
		// if (checkMail === false || checkMail.length > 0)
			// resolve(false);
		if (checkLogin === false || checkLogin.length > 0)
			resolve(false);
		let table = {
			user_name: data.login.trim(),
			user_passwd: data.password.trim(),
			last_name: data.last_name.trim(),
			first_name: data.first_name.trim(),
			age: data.age.trim(),
			mail: data.mail.trim()
		}
		resolve(table)
	}));
}