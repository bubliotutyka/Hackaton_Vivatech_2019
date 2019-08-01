
'use strict'
const db = require('../Model/Database')

module.exports =
{
	async GetQuestion(res)
	{
		let result = await db.getQuestion();
		if (result !== false)
		{
			res.status(200).send({result});
		}
	},

	async getJobs(user_id, res)
	{
		let scoring = await db.getScoring(user_id);
		if (scoring === false)
			res.status(400).send({error: "bad information"});
		else
		{
			scoring = JSON.parse(scoring.score);
			let result = await db.GetJobs(scoring);
			if (result === false)
				res.status(400).send({error: "bad information"});
			else
				res.status(200).send(result);
		}
	}
}