const db = require('../Model/Database')

'user strict'
module.exports =
{
	UpdateProfile(req, res)
	{
		let data = req.body.data;
		let scoring = {};
		let table = [ getScore(data[0]), getScoreInvert(data[1]), getScore(data[2]) ]
		scoring.first = parseInt(getMiddel(table));
		table = [ getScore(data[3]), getScoreInvert(data[4]), getScoreInvert(data[5]) ]
		scoring.second = parseInt(getMiddel(table));
		table = [ getScore(data[6]), getScoreInvert(data[7]), getScoreInvert(data[8]) ]
		scoring.third = parseInt(getMiddel(table));
		db.SetScoring(6, scoring);
	}
}
function	getMiddel(table)
{
	return ((table[0] + table[1] + table[2]) / 3);
}

function getScore(score)
{
	if (score === -3)
		return (0);
	else if (score === -2)
		return (10);
	else if (score === -1)
		return (30);
	else if (score === 0)
		return (50);
	else if (score === 1)
		return (60);
	else if (score === 2)
		return (80);
	else if (score === 3)
		return (100);
}

function getScoreInvert(score)
{
	if (score === 3)
		return (0);
	else if (score === 2)
		return (10);
	else if (score === 1)
		return (30);
	else if (score === 0)
		return (50);
	else if (score === -1)
		return (60);
	else if (score === -2)
		return (80);
	else if (score === -3)
		return (100);
}