// ************************************************************************** //
//                                                                            //
//   Name :Database.js                           :::     ::::::::      :::    //
//                                             :+:      :+:   :+:    :+:      //
//   By: karma                               +:+ +:+   +:+   +:+   +:+ +:+    //
//                                         +#+  +:+   +#+   +#+  +#+  +:+     //
//   Create:2019/05/17 18:05:11          +#+#+#+#+#+ +#+   +#+ +#+#+#+#+#+    //
//                                            #+#   #+#   #+#       #+#       //
//         by karma                         ###   #########       ###.error   //
//                                                                            //
// ************************************************************************** //

const mysql = require('mysql');
const bcrypt = require('bcrypt')

var dbConnex = mysql.createConnection({
	host: "localhost",
	user: "example",
	password: "example",
	database: "example"
});

dbConnex.connect(function (error)
{
	if (error)
		console.log(error);
	else
		console.log("Database is connected");
});

class Database
{
	static	NewUser(data)
	{
		return (new Promise(async function (resolve, reject)
		{
			let date = data.age.split("T")[0];
			dbConnex.query("INSERT INTO Users (user_name, user_passwd, age,"+
				"first_name, last_name, mail) VALUES (?, ?, ?, ?, ?, ?)",
				[data.user_name, await bcrypt.hash(data.user_passwd, 10),
					date, data.first_name, data.last_name, data.mail],
				function (error, result)
				{
					if (error)
						resolve(false);
					else
						resolve(result);
				});
		}));
	}

	static	GetJobs(scoring)
	{
		return (new Promise(function (resolve, reject)
		{
			dbConnex.query("select job_name from jobsScoring where timide <= ? AND energy <= ? AND tolerence <= ?",
			[scoring.first, scoring.second, scoring.third],
			function (error, result)
			{
				if (error)
					resolve(false);
				else
					resolve(result);
			});
		}));
	}

	static	SetScoring(id_user, score)
	{
		dbConnex.query("insert into Scoring (user_id, score) VALUES (?, ?)",
		[id_user, JSON.stringify(score)])
	}

	static	getScoring(user_id)
	{
		return (new Promise(function (resolve, reject)
		{
			dbConnex.query("select score from Scoring where user_id = ?", [user_id],
			function(err, result)
			{
				if (err)
					resolve(false);
				else
					resolve(result[0])
			})
		}));
	}

	static	UpdateProfile(data)
	{
		return (new Promise(async function (resolve, reject)
		{
			dateStart = data.date_debut.split("T")[0];
			if (data.date_fin)
				dataEnd = data.date_fin.split("T")[0];
			dbConnex.query(`INSERT INTO Event (type, titre, date_debut,
				date_fin,nom) VALUES (?, ?, ?, ?, ?, ?)`,
				[data.type, data.titre, data.date_debut, data.date_fin, data.nom],
				function (error, result)
				{
					if (error)
						resolve(false);
					else
						resolve(result);
				});
		}));
	}

	static	getQuestion()
	{
		return (new Promise(function (resolve, reject)
		{
			dbConnex.query("select text_question, id_question from Question",
			function (error, result)
			{
				if (error)
					resolve(false);
				else
					resolve(result)
			});
		}));
	}
	static	getConnection(pseudo)
	{
		return (new Promise(function (resolve, reject)
		{
			dbConnex.query("select id_users, user_passwd from Users where user_name = ?"+
			"OR mail = ?",[pseudo, pseudo], function (error, result)
			{
				if (error)
					resolve(false);
				else
					resolve(result);
			});
		}));
	}
	static	GetUserName(pseudo)
	{
		return (new Promise(function (resolve, reject)
		{
			dbConnex.query("Select * from Users where user_name = ?", [pseudo],
			function (err, result)
			{
				if (err)
					resolve(false);
				else
				{
					console.log(result);
					resolve(result);
				}
			});
		}));
	}

	static	GetMail(mail)
	{
		return (new Promise(function (resolve, reject)
		{

		}));
	}
}
module.exports = Database;