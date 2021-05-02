const Campaign = require("../../campaign/model/Campaign");
const News = require("../../news/model/News");
const Doctrine = require("../../doctrine/model/Doctrine");
const User = require('../../user/model/User')
const DonateLog = require('../../log/model/DonateLog')
const ExchangeLog = require('../../log/model/ExchangeLog')
const Exchange = require('../../exchange/model/Exchange')
const fs = require('fs');
const cloudinary = require("cloudinary").v2
const countapi = require('countapi-js');


exports.DoctrineGotFav = async (req, res) => {
    try {
      Doctrine.find({}, function (err, doctrine) {
        if (err) {
          console.log(err)
        } else {
          doctrine.sort(function (a, b) {
            return new Date(b.edittime) - new Date(a.edittime);
          });
          console.log('else')
          var data = {
              
          }
          res.json(doctrine);
        }
      })
    } catch (err) {
      res.status(400).json({ err: err });
      console.log(err)
    }
  }