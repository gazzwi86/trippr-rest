const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const apikey = process.env.HOLIDAYS_APIKEY;
const cache = {}; 

router
  .route('/')
  .get((req, resp) => {
    const country = req.query.name;
    const year = req.query.name;

    if (cache[country][year] != null) {
      return resp.send(cache);
    } else {
      fetch(
        `https://calendarindex.com/api/v1/holidays?country=${country}&year=${year}&api_key=${apikey}`
      )
        .then(res => res.json())
        .then(json => {
          cache[country][year] = json;
          return resp.send(json);
        })
        .catch(err => {
          if (err)
            return resp.send(err);
        });
    }
  })

module.exports = router;