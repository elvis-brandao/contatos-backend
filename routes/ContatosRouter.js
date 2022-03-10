const express = require('express');
const router = express.Router();
const ContatosController = require('../controllers/ContatosController');

router.get('/', ContatosController.index);
router.get('/search', ContatosController.search);
router.get('/:id', ContatosController.show);
router.post('/', ContatosController.create);
router.delete('/:id', ContatosController.destroy);
router.put('/:id', ContatosController.update);

module.exports = router;