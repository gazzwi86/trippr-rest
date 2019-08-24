const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/User');

const error = (resp, err) => resp.status(500).send(err);
const getUserFromToken = (authorization) => jwt.decode(authorization.split(' ')[1]);

exports.get = (req, resp) => {
  const user = getUserFromToken(req.headers.authorization);

  UserSchema.findById(user.userId, (err, result) => {
    if (result) {
      return resp.json(result.lists);
    } else {
      return resp.status(404).json({ message: 'No lists found' });
    }
  });
};

exports.getById = (req, resp) => {
  const user = getUserFromToken(req.headers.authorization);

  UserSchema.findOne({
    _id: user.userId,
    lists: {
      $elemMatch: { _id: req.params.id }
    }
  },
  (err, result) => {
    if (result) {
      return resp.json(result.lists.filter(list => String(req.params.id) === String(list._id))[0]);
    } else {
      return resp.status(404).json({ message: 'List not found' });
    }
  });
};

exports.post = (req, resp) => {
  const user = getUserFromToken(req.headers.authorization);

  UserSchema.findById(user.userId, (err, result) => {
    result.lists.push({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name 
    });

    result.save((err) => {
      if (err)
        return error(resp, err);

      return resp.json({ success: true });
    });
  });
};

exports.put = (req, resp) => {
  const user = getUserFromToken(req.headers.authorization);

  UserSchema.findOne({
    _id: user.userId,
    lists: {
      $elemMatch: { _id: req.params.id }
    }
  },
  (err, result) => {
    if (result) {
      result.lists = result.lists.map((list) => {
        if (String(req.params.id) === String(list._id)) {
          list.name = req.body.name;
        }
        return list;
      })

      result.save((err) => {
        if (err)
          return error(resp, err);
      
        return resp.json({ success: true });
      });
    } else {
      return resp.status(404).json({ message: 'List not found' });
    }
  });
};

exports.delete = (req, resp) => {
  const user = getUserFromToken(req.headers.authorization);

  UserSchema.findOne({
    _id: user.userId,
    lists: {
      $elemMatch: { _id: req.params.id }
    }
  },
  (err, result) => {
    if (result) {
      result.lists = result.lists.map((list) => {
        if (String(req.params.id) !== String(list._id)) {
          return list;
        }
      })

      result.save((err) => {
        if (err)
          return error(resp, err);
      
        return resp.json({ success: true });
      });
    } else {
      return resp.status(404).json({ message: 'List not found' });
    }
  });
};
