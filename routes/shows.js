const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { Show } = require("../models/index");


router.get('/', async (req, res) => {
    try {
        const allShows = await Show.findAll();
        res.json(allShows);
    } catch (err) {
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const showId = await Show.findByPk(req.params.id);
        res.json(showId);
    } catch (err) {
        console.log(err);
    }
});

router.get('/genres/:genre', async (req, res) => {
    try {
        const genreType = await Show.findAll({
            where: {
                genre: req.params.genre
            }
        });
        res.json(genreType);
    } catch (err) {
        console.log(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newShow = await Show.create({
            title: req.body.title,
            genre: req.body.genre,
            year: req.body.year,
            watched: req.body.watched
        });
        res.json(newShow);
    } catch (err) {
        console.log(err);
    }
});

router.put('/:id/watched', [check("rating").not().isEmpty().trim()], async (req, res) => {
    try {
        const showId = await Show.findByPk(req.params.id);
        res.json(showId);
        return showId.update({
            watched: req.body.watched
        });
    } catch (err) {
        console.log(err);
    };
});

router.delete('/:id/updates', async (req, res) => {
    try {
        const showId = await Show.findByPk(req.params.id);
        await showId.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: "Show deleted" });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
