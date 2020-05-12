const config = {
    host: 'localhost',
    port: 5432,
    database: 'musicdb',
    user: 'postgres',
    password: 'postgres',
};

const pgp = require('pg-promise')();
const db = pgp(config);
const prompt = require('prompt-promise')

    //Use below scripts to insert or update rows in exisitng tables
    //db.result(`INSERT into song (id, song_name, duration, release_year) VALUES (DEFAULT, 'Jumpoff', 345, 2004) Returning id`)
    //db.result(`UPDATE song SET song_name= 'Jigga', duration='0355' WHERE id=7`)
    //db.result(`UPDATE artist SET artist_name='Whitney Houston' WHERE id=13`)

    //Include the following .then if adding a new row into table. Do not use if Updating row. 
    .then((result) => {
        console.log(`Created song with ID ${result.rows[0].id}`);
    })

    //Use .catch when updating rows on table. 
    .catch((e) => {
        console.error(e);
    });