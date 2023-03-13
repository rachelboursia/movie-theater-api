const express = require('express');
const router = express.Router();
const { User, Show } = require("../models/index");

router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.get('/:id', async (req, res) => {
  try {
    const userId = await User.findByPk(req.params.id);
    res.json(userId);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id/shows', async (req, res) => {
  try {
    const userId = await User.findAll({
      where: {
        id: req.params.id
      },
      include: { model: Show }
    });
    res.json(userId);
  } catch (err) {
    console.log(err);
  }
});

router.put('/:id/shows/:showId', async (req, res) => {
  try {
    const userId = req.params.id;
    const showId = req.params.showId;
    const user = await User.findByPk(userId);
    const show = await Show.findByPk(showId);
    await user.addShow(show);
    const completeUser = await User.findByPk(userId, {
      include: { model: Show }
    });
    res.json(completeUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
