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
var result = [];

prompt('Album ID: ')
    .then(function albumResponse(val) {
        result.push(val);
        return prompt('Song ID: ');
    })
    .then(function songIDResponse(val) {
        result.push(val);
        prompt.done();
        console.log(result)
        db.result(`INSERT INTO track (id, album_id, song_id) VALUES (DEFAULT, ${result[1]}, '${result[0]}') RETURNING id`)
            //The "release_year" column needs single quotes ('') because it is a string and the others are integers. It works for me like this as long as I have an existing "artist_id" -Jada

            .then((result) => {
                console.log(`Created track with ID ${result.rows[0].id}`);
            })
            .catch((e) => {
                console.log(e);
            });
    })
    .catch(function rejected(err) {
        console.log('error:', err.stack);
        prompt.finish();
    });