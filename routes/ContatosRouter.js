const express = require('express');
const router = express.Router();
const ContatosController = require('../controllers/ContatosController');

router.get('/', ContatosController.index);
router.get('/:id', ContatosController.show);
router.get('/search', ContatosController.search);
router.post('/', ContatosController.create);
router.delete('/:id', ContatosController.destroy);
router.update('/:id', ContatosController.update);

module.exports = router;