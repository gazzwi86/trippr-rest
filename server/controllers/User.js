const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/User');

const error = (resp, err) => resp.status(500).send(err);
const getUserFromToken = (authorization) => jwt.decode(authorization.split(' ')[1]);

exports.get = (req, resp) => {
  const user = getUserFromToken(req.headers.authorization);

  UserSchema.findById(user.userId, (err, user) => {
    if (err)
      return error(resp, err);
    
    return resp.json(user);
  });
};

exports.put = (req, resp) => {
  const user = getUserFromToken(req.headers.authorization);

  UserSchema.findById(user.userId, (err, user) => {
    if (err)
      return error(resp, err);

    user.email = req.body.email;
    user.password = req.body.password;
    user.country = req.body.country;

    user.save((err) => {
      if (err)
        return error(resp, err);

      return resp.json({ success: true });
    });
  });
};

exports.delete = (req, resp) => {
  const user = getUserFromToken(req.headers.authorization);

  UserSchema.remove({
    _id: user.userId
  }, (err) => {
    if (err)
      return error(resp, err);

    return resp.json({ success: true });
  });
};

exports.signup = (req, resp) => {
  UserSchema.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return error(resp, err);

    if (user) {
      return resp.status(409).json({ 'error': 'Email exists' });
    } else {
      const user = new UserSchema();
      user['_id'] = new mongoose.Types.ObjectId();
      user.email = req.body.email;
      user.password = req.body.password;
      user.country = req.body.country;

      user.save((err) => {
        if (err)
          return error(resp, err);
  
        return resp.json({ success: true });
      });
    }
  });
};

exports.signin = (req, resp) => {
  UserSchema.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return error(resp, err);

    if (user) {
      user.comparePassword(req.body.password, (err, isMatch) => {
          if (err)
            return error(resp, err);

          if (isMatch) {
            const token = jwt.sign(
              {
                userId: user._id,
                email: user.email,
                country: user.country,
              },
              process.env.JWT_KEY,
              {
                expiresIn: '1h',
              }
            );
            resp.json({ token });
          } else {
            return resp.status(401).json({ 'error': 'Username or password incorrect' });
          }
      });
    } else {
      return resp.status(401).json({ 'error': 'Username or password incorrect' });
    }      
  });
};