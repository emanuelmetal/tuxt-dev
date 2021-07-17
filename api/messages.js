var sha512_224 = require('js-sha512').sha512_224;
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:emanuelpereyra@localhost:5432/template1',
    ssl: process.env.DATABASE_URL ? {rejectUnauthorized: false} : false
});

async function messages(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM messages');
        const results = { 'results': (result) ? result.rows : null};
        res.render('pages/db', results );
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
}

async function hashMessage(req, res) {
    const text = 'INSERT INTO messages(hash, message) VALUES($1, $2)'

    console.log(req.body)
    const hashed = sha512_224.hex(req.body.message);

    const values = [hashed, req.body.message]
    try {
        const client = await pool.connect();
        const res = await client.query(text, values)
        // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
        console.log(err.stack)
    }
    res.redirect(`/messages/${hashed}`)
}

async function getMessage(req, res) {
    const messageHash = req.param("hash");
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM messages WHERE hash = $1', [messageHash]);
        const results = { 'results': (result) ? result.rows : null};
        results.results.length > 0 ? res.render('pages/message', results ) : res.render('pages/404', results )

        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
}



module.exports = {
    messages,
    hashMessage,
    getMessage
}