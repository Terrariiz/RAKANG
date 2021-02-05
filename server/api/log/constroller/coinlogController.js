const CoinLog = require("../model/CoinLog");

exports.coinlog = async(req,res) => {
    try{     
      console.log(req.body)
      const add = new Campaign({
        name: req.body.name,
        content: req.body.content,
        image: req.file.filename,
        date: req.body.date,
        amount: req.body.amount,
        donate: 0
      });
      console.log(add)
      let data = await add.save()
      res.status(201).json({ data });
    } catch (err) {
      res.status(400).json({ err: err });
      console.log(err)
    }
  };