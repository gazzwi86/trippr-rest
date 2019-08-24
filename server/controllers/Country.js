const CountrySchema = require('../models/Country');

exports.get = (req, resp) => {
  CountrySchema.find((err, result) => {
    if (err)
      return resp.send(err);
    
    return resp.json(result);
  });
};
