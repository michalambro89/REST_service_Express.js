const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const countriesService = require('../service/countriesService');
const teamsService = require('../service/teamsService');
const driversService = require('../service/driversService');

router.get('/', async function(req, res, next) {
  try {
    res.json(await userService.getAll());
  } catch (error) {
    console.error(`Error while fetching users.`, error.message);
    next(error);
  }
});

router.post('/countries', async function(req, res, next) {
  try {
    res.json(await countriesService.save(req.body));
  } catch (err) {
    console.error(`Countries saving error.`, err.message);
    next(err);
  }
});

router.post('/teams', async function(req, res, next) {
  try {
    res.json(await teamsService.save(req.body));
  } catch (err) {
    console.error(`Teams saving error.`, err.message);
    next(err);
  }
});

router.post('/drivers', async function(req, res, next) {
  try {
    res.json(await driversService.save(req.body));
  } catch (err) {
    console.error(`Drivers saving error.`, err.message);
    next(err);
  }
});

router.put('/teams/:id', async function(req, res, next) {
  try {
    res.json(await teamsService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating teams.`, err.message);
    next(err);
  }
});

router.put('/drivers/:id', async function(req, res, next) {
  try {
    res.json(await driversService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating drivers.`, err.message);
    next(err);
  }
});

router.put('/countries/:id', async function(req, res, next) {
  try {
    res.json(await countriesService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating countries.`, err.message);
    next(err);
  }
});

router.delete('/teams/:id', async function(req, res, next) {
  try {
    res.json(await teamsService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting team.`, err.message);
    next(err);
  }
});

router.delete('/countries/:id', async function(req, res, next) {
  try {
    res.json(await countriesService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting country.`, err.message);
    next(err);
  }
});

router.delete('/drivers/:id', async function(req, res, next) {
  try {
    res.json(await driversService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting driver.`, err.message);
    next(err);
  }
});

module.exports = router;