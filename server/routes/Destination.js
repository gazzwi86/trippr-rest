const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const DestinationController = require('../controllers/Destination');

// router
//   .route('/')
//   .get(auth, DestinationController.getAll)

  router
    .route('/:list/:id')
    .get(auth, DestinationController.getById)
    // .put(auth, DestinationController.put)
    // .delete(auth, DestinationController.delete);

router
  .route('/:list/')
  // .get(auth, DestinationController.get)
  .post(auth, DestinationController.post);

// router
  // .route('/:list/clear')
  // .delete(auth, DestinationController.clear);

module.exports = router;