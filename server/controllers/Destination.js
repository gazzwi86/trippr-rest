const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/User');

const error = (resp, err) => resp.status(500).send(err);
const getUserFromToken = (authorization) => jwt.decode(authorization.split(' ')[1]);

// exports.getAll = (req, resp) => {
//   const user = getUserFromToken(req.headers.authorization);

//   UserSchema.findById(user.userId, (err, result) => {
//     if (result) {
//       const destinations = [].concat.apply([], result.lists.map(list => list.destinations));
//       console.log(result.lists.map(list => list.destinations));
//       return resp.json(destinations);
//     } else {
//       return resp.status(404).json({ message: 'No lists found' });
//     }
//   });
// };

// exports.get = (req, resp) => {
//   const user = getUserFromToken(req.headers.authorization);

//   UserSchema.findById(user.userId, (err, result) => {
//     if (result) {
//       return resp.json(result.lists);
//     } else {
//       return resp.status(404).json({ message: 'No lists found' });
//     }
//   });
// };

exports.getById = (req, resp) => {
  const user = getUserFromToken(req.headers.authorization);

  UserSchema.findOne({
    _id: user.userId,
    'lists.destinations._id': req.params.id
  },
  (err, result) => {
    if (result) {
      return resp.json(result);
    } else {
      return resp.status(404).json({ message: 'Destination not found' });
    }
  });
};

exports.post = (req, resp) => {
  const user = getUserFromToken(req.headers.authorization);

  UserSchema.findById(user.userId, (err, result) => {
    result.lists.map((list) => {
      if (String(list._id) === String(req.params.list)) {
        list.destinations.push({
          _id: new mongoose.Types.ObjectId(),
          destination: req.body.destination,
          duration: req.body.duration,
        });
      }
    })

    result.save((err) => {
      if (err)
        return error(resp, err);

      return resp.json({ success: true });
    });
  });
};

// exports.put = (req, resp) => {
//   const user = getUserFromToken(req.headers.authorization);

//   UserSchema.findOne({
//     _id: user.userId,
//     lists: {
//       $elemMatch: { _id: req.params.id }
//     }
//   },
//   (err, result) => {
//     if (result) {
//       result.lists = result.lists.map((list) => {
//         if (String(req.params.id) === String(list._id)) {
//           list.name = req.body.name;
//         }
//         return list;
//       })

//       result.save((err) => {
//         if (err)
//           return error(resp, err);
      
//         return resp.json({ success: true });
//       });
//     } else {
//       return resp.status(404).json({ message: 'List not found' });
//     }
//   });
// };

// exports.delete = (req, resp) => {
//   const user = getUserFromToken(req.headers.authorization);

//   UserSchema.findOne({
//     _id: user.userId,
//     lists: {
//       $elemMatch: { _id: req.params.id }
//     }
//   },
//   (err, result) => {
//     if (result) {
//       result.lists = result.lists.map((list) => {
//         if (String(req.params.id) !== String(list._id)) {
//           return list;
//         }
//       })

//       result.save((err) => {
//         if (err)
//           return error(resp, err);
      
//         return resp.json({ success: true });
//       });
//     } else {
//       return resp.status(404).json({ message: 'List not found' });
//     }
//   });
// };

// exports.clear = (req, resp) => {
//   const user = getUserFromToken(req.headers.authorization);

//   UserSchema.findOne({
//     _id: user.userId,
//     lists: {
//       $elemMatch: { _id: req.params.list }
//     }
//   },
//   (err, result) => {
//     if (result) {
//       result.lists = result.lists.map((list) => {
//         if (String(req.params.list) !== String(list._id)) {
//           list.desinations = [];
//         }

//         return list;
//       })

//       result.save((err) => {
//         if (err)
//           return error(resp, err);
      
//         return resp.json({ success: true });
//       });
//     } else {
//       return resp.status(404).json({ message: 'List not found' });
//     }
//   });
// };
