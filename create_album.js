const config = {
	host: 'localhost',
	port: 5432,
	database: 'musicdb',
	user: 'postgres',
	password: 'postgres',
};

const pgp = require('pg-promise')();
const db = pgp(config);
const prompt = require('prompt-promise');
var result = []; //Can also use $1, $2 etc to represent the value being pushed in this empty array in db.results

prompt('Album Name: ')
	.then(function nameResponse(val) {
		result.push(val);
		return prompt('Release year: ');
	})
	.then(function yearResponse(val) {
		result.push(val);
		return prompt('Artist ID: ');
	})
	.then(function artistIDResponse(val) {
		result.push(val);
		prompt.done();
		console.log(result);
		db.result(
			`INSERT INTO album (id, artist_id, release_year, album_name) VALUES (DEFAULT, ${result[2]},${result[1]}, '${result[0]}') RETURNING id`
			//The "release_year" column needs single quotes ('') because it is a string and the others are integers. It works for me like this as long as I have an existing "artist_id" -Jada
		)
			.then((result) => {
				console.log(`Created album with ID ${result.rows[0].id}`);
			})
			.catch((e) => {
				console.log(e);
			});
	})
	.catch(function rejected(err) {
		console.log('error:', err.stack);
		prompt.finish();
	});
