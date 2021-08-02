const express = require('express');
const router = express.Router();
const pool = require("../database/connection-pool.js");

// --------------------------------------------------------------- CREATE
router.post('/create', async (req, res, next) => {
    console.log('\nLOG-POST:', req.originalUrl, req.body);
    try {
        const {
            name,
            description
        } = req.body;
        await pool.query('INSERT INTO genres(genre_name, genre_description) VALUES(? ,?)', [name, description])
            .then(([rows, fields]) => {
                res.status(200).json({
                    count: rows.length,
                    status: 'success',
                    message: 'POST',
                    content: rows
                });
            }).catch((err) => {
                console.log('LOG-ERROR: catch', err);
            });
    } catch (err) {
        console.log('LOG-ERROR-1: ', err);
        next();
    }
});

// --------------------------------------------------------------- READ
router.get('/read', async (req, res, next) => {
    console.log('\nLOG-GET:', req.originalUrl, req.body);
    try {
        await pool.query("SELECT * FROM genres;")
            .then(([rows, fields]) => {
                res.status(200).json({
                    count: rows.length,
                    status: 'success',
                    message: 'GET',
                    content: rows
                });
            }).catch((err) => {
                console.log('LOG-ERROR: catch', err);
            });
    } catch (err) {
        console.log('LOG-ERROR-1: ', err);
        next();
    }
});
// --------------------------------------------------------------- READ
router.get('/read/:id_genre', async (req, res, next) => {
    console.log('\nLOG-GET:', req.originalUrl, req.body);
    try {
        const id_genre = req.params.id_genre;
        await pool.query("SELECT * FROM genres WHERE genre_id =?", [id_genre])
            .then(([rows, fields]) => {
                res.status(200).json({
                    count: rows.length,
                    status: 'success',
                    message: 'GET',
                    content: rows
                });
            }).catch((err) => {
                console.log('LOG-ERROR: catch', err);
            });
    } catch (err) {
        console.log('LOG-ERROR-1: ', err);
        next();
    }
});
// --------------------------------------------------------------- UPDATE
router.put('/update/:id_genre', async (req, res, next) => {
    console.log('\nLOG-PUT:', req.originalUrl, req.body);
    try {
        const id_genre = req.params.id_genre;
        const name = req.body.name;
        const description = req.body.description;
        await pool.query('UPDATE genres SET genre_name=?, genre_description=? WHERE genre_id=?', [name, description, id_genre])
            .then(([rows, fields]) => {
                res.status(200).json({
                    count: rows.length,
                    status: 'success',
                    message: 'PUT',
                    content: rows
                });
            }).catch((err) => {
                console.log('LOG-ERROR: catch', err);
            });
    } catch (err) {
        console.log('LOG-ERROR-1: ', err);
        next();
    }
});

// --------------------------------------------------------------- DELETE 
router.delete('/delete/:id_genre', async (req, res, next) => {
    console.log('\nLOG-DELETE:', req.originalUrl, req.body);
    try {
        const id_genre = req.params.id_genre;
        await pool.query('DELETE FROM genres WHERE genre_id=? ', [id_genre])
            .then(([rows, fields]) => {
                res.status(200).json({
                    count: rows.length,
                    status: 'success',
                    message: 'DELETE',
                    content: rows
                });
            }).catch((err) => {
                console.log('LOG-ERROR: catch', err);
            });
    } catch (err) {
        console.log('LOG-ERROR-1: ', err);
        next();
    }
});

// --------------------------------------------------------------- EXPORT 
module.exports = router;