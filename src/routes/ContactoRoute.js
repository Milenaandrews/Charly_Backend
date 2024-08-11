const express = require('express')
const contactoController = require('../controllers/contactoController')

const contactoRouter = express.Router();

contactoRouter.route('/contacto')
.post(contactoController.guardarContacto)

module.exports = contactoRouter