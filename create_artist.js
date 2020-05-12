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

prompt('Artist name? ')
    .then(function nameResponse(val) {
        result.push(val);
        prompt.done();
        console.log(result);
        db.result(`INSERT INTO artist (id, artist_name) VALUES (DEFAULT, '${result[0]}') RETURNING id`)
            //The "${result[0]}" needs to be in single quotes because it is a string(the others are integers). The way it's written in here currently works for my database. -Jada
            //db.artist.create({ id: "default", artist_name: '${result[0]}' }.then(function (artist) {
            //console.log(artist);

            .then((result) => {
                console.log(`Created artist with ID ${result.rows[0].id}`);
            })
            .catch((e) => {
                console.log(e);
            });
    })
    .catch(function rejected(err) {
        console.log('error:', err.stack);
        prompt.finish();
    });
