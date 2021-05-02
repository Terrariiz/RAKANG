const News = require("../model/News");
const multer = require('multer');
const fs = require('fs');
const cloudinary = require("cloudinary").v2
const countapi = require('countapi-js');

cloudinary.config({
  cloud_name: "koladon52",
  api_key: "413217853994171",
  api_secret: "DOHByZlRxxocIbvEmAzgnvmnv-E",

})

exports.addnews = async (req, res) => {
  try {
    var newimage
    cloudinary.uploader.upload(req.file.path, async function (err, result) {
      newimage = result.url
      console.log(req.body)
      const today = new Date();
      const add = new News({
        title: req.body.title,
        content: req.body.content,
        image: result.url,
        cloudinary_id: result.public_id,
        date: today,
        categories: req.body.categories,
      });
      let data = await add.save()
      var option = {
        key: 'NewsView',
        namespace: "Rakang_News_" + data._id,
      }
      countapi.create(option).then((result) => {
        console.log(result)
        data.count_api_namespace = result.namespace
        data.count_api_key = result.key
        data.save()
        res.status(201).json({ data });
      });

    })

  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
};

exports.ShowListNews = function (req, res) {
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

exports.DetailNews = function (req, res) {

  try {
    News.findOne({ _id: req.params.id }, function (err, news) {
      if (err) {
        console.log(err)
      } else {
        res.send(news);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DeleteNews = function (req, res) {

  try {
    News.findOneAndDelete({ _id: req.params.id }, async function (err, news) {
      if (err) {
        console.log(err)
      } else {
        await cloudinary.uploader.destroy(news.cloudinary_id);
        // const image  = './public/image/new/' + news.image;
        // await fs.unlinkSync(image , function(err){
        //     if(err){
        //         console.log(err);
        //     } else {
        //       console.log("unlink image success")
        //     } 
        // })
        console.log('delete news completed')
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.EditNews = async (req, res) => {
  try {
    var dataEdit
    var changeimage
    // const today = new Date();
    if (req.file) {
      if (req.file.filename != req.body.oldimage) {

        let this_news = await News.findById(req.params.id);
        await cloudinary.uploader.destroy(this_news.cloudinary_id);
        this_news.save();

        cloudinary.uploader.upload(req.file.path, function (err, result) {
          changeimage = result.url

          dataEdit = {
            title: req.body.title,
            content: req.body.content,
            image: result.url,
            cloudinary_id: result.public_id,
            // date: today,
            categories: req.body.categories
          }

          News.findOneAndUpdate({ _id: req.params.id }, dataEdit, function (err, news) {
            if (err) {
              console.log(err)
            } else {
              console.log('success')
              res.status(201).json({ news });
            }
          })

        })


      } else {
        console.log("not delete")
      }
    } else {
      dataEdit = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.oldimage,
        date: today,
        categories: req.body.categories
      }
      News.findOneAndUpdate({ _id: req.params.id }, dataEdit, function (err, news) {
        if (err) {
          console.log(err)
        } else {
          console.log('success')
          res.status(201).json({ news });
        }
      })
    }

  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}
