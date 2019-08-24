const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserController = require('../controllers/User');

router
  .route('/')
    .get(auth, UserController.get)
    .put(auth, UserController.put)
    .delete(auth, UserController.delete);

router
  .route('/signin')
  .post(UserController.signin);

router
  .route('/signup')
  .post(UserController.signup);

module.exports = router;