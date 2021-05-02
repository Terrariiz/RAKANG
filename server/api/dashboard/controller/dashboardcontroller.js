const Campaign = require("../../campaign/model/Campaign");
const News = require("../../news/model/News");
const Doctrine = require("../../doctrine/model/Doctrine");
const User = require('../../user/model/User')
const DonateLog = require('../../log/model/DonateLog')
const ExchangeLog = require('../../log/model/ExchangeLog')
// const Exchange = require('../../exchange/model/Exchange')
const fs = require('fs');
const cloudinary = require("cloudinary").v2
const countapi = require('countapi-js');
const { count } = require("../../campaign/model/Campaign");


exports.DoctrineperType = async (req, res) => {
    try {
          let docs = await Doctrine.aggregate([
            { $group: {
              _id : '$categories',
              count     :  {$sum: 1}
            }
           }
          ]);
          console.log(docs)
          res.json(docs);

    } catch (err) {
      res.status(400).json({ err: err });
      console.log(err)
    }
  }

  exports.NewsPerType = async (req, res) => {
    try {
          let docs = await News.aggregate([
            { $group: {
              _id : '$categories',
              count     :  {$sum: 1}
            }
           }
          ]);
          console.log(docs)
          res.json(docs);
    } catch (err) {
      res.status(400).json({ err: err });
      console.log(err)
    }
  }

  exports.CampaignPerType = async (req, res) => {
    try {
          let docs = await Campaign.aggregate([
            { $group: {
              _id : '$categories',
              count     :  {$sum: 1}
            }
           }
          ]);
          console.log(docs)
          res.json(docs);
    } catch (err) {
      res.status(400).json({ err: err });
      console.log(err)
    }
}
exports.TotalDonatePerCampaign = async (req, res) => {
  try {

        let docs = await Campaign.aggregate([
          {  $group : {
            _id: "$name",
            total : {
                $sum : "$donate"
            }
        }}
        ]);
        console.log(docs)
        res.json(docs);
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.TotalDonatePerUser = async (req, res) => {
  try {
        let docs = await DonateLog.aggregate([
          {  
            $group : {
            _id: "$user",
            total : {
                $sum : "$amount"
            }
        }
      }
        ]);
        console.log(docs)
        res.json(docs);
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DonatePerDay = async (req, res) => {
  try {
        let docs = await DonateLog.aggregate([
          {  
            $group : {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              total : {
                $sum : "$amount"
            }
        }
      }
        ]);
        console.log(docs)
        res.json(docs);
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.ExchangePerDay = async (req, res) => {
  try {
        let docs = await ExchangeLog.aggregate([
          {  
            $group : {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              count     :  {$sum: 1}
        }
      }
        ]);
        console.log(docs)
        res.json(docs);
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.CountExchange_PerItem = async (req, res) => {
  try {
        let docs = await ExchangeLog.aggregate([
          {  
            $group : {
              _id : '$item',
              count     :  {$sum: 1}
        }
      }
        ]);
        console.log(docs)
        res.json(docs);
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.Getdata_Campaign = async (req, res) => {
    try {
      Campaign.find({}, function (err, campaign) {
        if (err) {
          console.log(err)
        } else {
            campaign.sort(function (a, b) {
            return new Date(b.startdate) - new Date(a.startdate);
          });
          console.log('else')
          res.json(campaign);
        }
      })
    } catch (err) {
      res.status(400).json({ err: err });
      console.log(err)
    }
}

exports.Getdata_Doctrine = async (req, res) => {
  try {
    Doctrine.find({}, function (err, doctrine) {
      if (err) {
        doctrine.log(err)
      } else {
        // doctrine = func.CountFavDoctrine(doctrine)
        doctrine.sort(function (a, b) {
          return new Date(b.edittime) - new Date(a.edittime);
        });
        console.log('else')
        res.json(doctrine);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.Getdata_News = async (req, res) => {
  try {
    News.find({}, function (err, news) {
      if (err) {
        console.log(err)
      } else {
        news.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        console.log('else')
        res.json(news);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}
