const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ListController = require('../controllers/List');

router
  .route('/')
  .get(auth, ListController.get)
  .post(auth, ListController.post);

router
  .route('/:id')
  .get(auth, ListController.getById)
  .put(auth, ListController.put)
  .delete(auth, ListController.delete);

module.exports = router;