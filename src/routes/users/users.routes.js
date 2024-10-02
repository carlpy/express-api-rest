const express = require('express');
const router = express.Router();

const security = require('./security')
const responses = require('../../network/responses');
const controller = require('./index');

router.get('/', getClients);
router.get('/:id', getClient);

router.post('/add',  addClient);
router.delete('/del/:id', security(), deleteClient);

async function getClients(req, res, next) {
  try {
    const clients = await controller.all();
    responses.success(req, res, 200, clients);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function getClient(req, res, next) {
  try {
    const client = await controller.one(req.params.id);
    responses.success(req, res, 200, client);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function addClient(req, res, next) {
  try {
    const item = await controller.add(req.body);
    if (!req.body.id) {
      msg = 'Item succesfully added';
    } else {
      msg = 'Item succesfully updated';
    }
    responses.success(req, res, 201, msg);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function deleteClient(req, res, next) {
  try {
    const client = await controller.deleteIt(req.params.id);
    responses.success(req, res, 201, 'Item deleted succesfully');
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = router;
