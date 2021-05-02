const Doctrine = require("../model/Doctrine");
const User = require('../../user/model/User')
const multer = require('multer');
const fs = require('fs');
const cloudinary = require("cloudinary").v2
const countapi = require('countapi-js');

cloudinary.config({
  cloud_name: "koladon52",
  api_key: "413217853994171",
  api_secret: "DOHByZlRxxocIbvEmAzgnvmnv-E",

})


exports.addnewdoctrine = async (req, res) => {
  try {
    console.log(req.body)
    const today = new Date();

    cloudinary.uploader.upload(req.file.path, async function (err, result) {
      const doctrine = new Doctrine({
        title: req.body.title,
        content: req.body.content,
        image: result.url,
        cloudinary_id: result.public_id,
        edittime: today,
        categories: req.body.categories,
      });
      let data = await doctrine.save()
      var option = {
        key: 'DoctrineView',
        namespace: "Rakang_Doctrine_" + data._id,
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
}


exports.ShowListDoctrine = async (req, res) => {
  try {
    Doctrine.find({}, function (err, doctrine) {
      if (err) {
        console.log(err)
      } else {
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

exports.EditDoctrine = async (req, res) => {
  try {
    var changeimage
    // const today = new Date();
    if (req.file) {
      if (req.file.filename != req.body.oldimage) {

        let this_doctrine = await Doctrine.findById(req.params.id);
        await cloudinary.uploader.destroy(this_doctrine.cloudinary_id);
        this_doctrine.save();

        cloudinary.uploader.upload(req.file.path, function (err, result) {
          changeimage = result.url

          dataEdit = {
            title: req.body.title,
            content: req.body.content[0],
            image: result.url,
            cloudinary_id: result.public_id,
            // edittime: today,
            categories: req.body.content[1]
          }

          Doctrine.findOneAndUpdate({ _id: req.params.id }, dataEdit, function (err, doctrine) {
            if (err) {
              console.log(err)
            } else {
              console.log('success')
              res.status(201).json({ doctrine });
            }
          })

        })


      } else {
        console.log("not delete")
      }
    } else {
      dataEdit = {
        title: req.body.title,
        content: req.body.content[0],
        image: req.body.oldimage,
        edittime: today,
        categories: req.body.content[1]
      }
      Doctrine.findOneAndUpdate({ _id: req.params.id }, dataEdit, function (err, doctrine) {
        if (err) {
          console.log(err)
        } else {
          console.log('success')
          res.status(201).json({ doctrine });
        }
      })
    }

  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DetailDoctrine = function (req, res) {
  try {
    Doctrine.findOne({ _id: req.params.id }, function (err, doctrine) {
      if (err) {
        console.log(err)
      } else {
        res.send(doctrine);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DeleteDoctrine = function (req, res) {
  try {
    Doctrine.findOneAndDelete({ _id: req.params.id }, async function (err, doctrine) {
      if (err) {
        console.log(err)
      } else {
        await cloudinary.uploader.destroy(doctrine.cloudinary_id);

        User.find({ favdoctrinelist: doctrine._id }, function (err, user) {
          if (err) {
            console.log(err)
          } else {
            console.log(user)
            for (let j = 0; j < user.length; j++) {
              for (let k = 0; k < user[j].favdoctrinelist.length; k++) {
                if (user[j].favdoctrinelist[k].equals(doctrine._id)) {
                  user[j].favdoctrinelist.pull(doctrine._id);
                  user[j].save();
                  console.log('removed from user favourite list');
                }
              }
            }
          }
        })
        console.log('delete doctrine completed')
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.ShowFavDoctrine = async (req, res) => {
  try {
    User.findById(req.params.id).populate("favdoctrinelist").exec(function (err, userdetail) {
      if (err) {
        console.log(err)
      } else {
        console.log('getuserfavlog')
        console.log(userdetail)
        res.json(userdetail)
      }
    })

  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}








