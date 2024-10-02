const express = require('express');
const router = express.Router();

const responses = require('../../network/responses');
const controller = require('./index');

router.get('/login', login)

async function login(req, res, next) {
  try {
    const token = await controller.login(req.body.usuario, req.body.password)
    responses.success(req, res, 200, token)
  } catch (e) {
    next(e)
  }
}

module.exports = router;