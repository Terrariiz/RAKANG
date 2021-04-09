const User = require("../model/User");
const fs = require('fs');
const Doctrine = require("../../doctrine/model/Doctrine");
const asyncs = require('async');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.registerNewUser = async (req, res) => {
    try {
    let isUser = await User.find({ email: req.body.email });
     console.log(isUser);
      if (isUser.length >= 1) {
        return res.status(409).json({
          message: "email already in use"
        });
      }
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        birthdate: req.body.birthdate,
        resetPasswordToken: null,
        resetPasswordExpires: null,
        image: "user.png",
        point: 0,
        seamsi:{
          Playable: true,
          Detail:  null
        },
        lantern:{
          Playable: true,
          Detail:  null
        },
        
      });
      let data = await user.save();
      const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
      res.status(201).json({ data, token });
    } catch (err) {
      res.status(400).json({ err: err });
      console.log(err)
    }
  };

  exports.loginUser = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      console.log(email);
      console.log(password);
      const user = await User.findByCredentials(email, password);
      if (!user) {
        return res.status(401).json({ error: "Login failed! Check authentication credentials" });
      }
      const token = await user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json({ err: err });
      console.log(err)
    }
  };

exports.getUserDetails = async (req, res) => {
  try{
    User.findById(req.params.id).populate("favdoctrinelist").exec(async function(err, userdetail){
      if(err){
        console.log(err);
      } else{
        // let myrank = await userdetail.getrank(req.params.id)
        // var somsak = {userdetail , myrank} 
        // console.log("somsak.found")
        // console.log(somsak)
        // console.log("somsak.found")

        // res.json(somsak);
        res.json(userdetail);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err);
  }
};

exports.editProfile = async (req,res) => {
  try{
    var dataEdit
    if(req.file){
      if(req.file.filename != req.body.oldimage){
        const image  = './public/image/profile/' + req.body.oldimage;
        if(req.body.oldimage != "user.png"){
          fs.unlink(image , function(err){
            if(err){
                console.log(err);
            } else {
              console.log("deleted")
            } 
          })
        }
        dataEdit = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            birthdate: req.body.birthdate,
            image: req.file.filename
          }
      } else {
        console.log("not delete")
      }
    }
    else{
      dataEdit = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          phone: req.body.phone,
          birthdate: req.body.birthdate,
          image: req.body.oldimage
        }
    }
    User.findByIdAndUpdate({_id:req.params.id}, dataEdit, function(err,update){
      if(err){
        console.log(err);
      } else{
        res.json(true);
      }
    });
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err);
  }
};

exports.changePassword = async (req,res) => {
  try{
    const id = req.params.id;
    const dataPassword = {
      old: req.body.oldPassword,
      new: req.body.newPassword,
      confirm: req.body.confirmNewPassword
    }
    if(dataPassword.old !== dataPassword.new && dataPassword.new == dataPassword.confirm){
      const check = await User.checkPassword(id, dataPassword.old, dataPassword.new);
      res.json(check);
    } else {
      res.json(false);
    }
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err);
  }
};

exports.getUserRank = async (req, res) => {
  try{
    console.log('first')
    User.find({},function(err, found){
      if(err){
        console.log(err);
      } else{
        found.sort(function(a, b){
          return b.point - a.point;
      });
        res.json(found);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err);
  }
};

exports.getMyRank = async (req, res) => {
  try{
    console.log('first')
    User.find({},function(err, found){
      if(err){
        console.log(err);
      } else{

        found.sort(function(a, b){
          return b.point - a.point;
      });

      // console.log(found)

      for(var i = 0 ; i <= (found.length - 1) ; i++){
        console.log('****'+i+'****')
        console.log(found.length)
        console.log(found[i])
        console.log('****'+i+'****')
        if(found[i]._id == req.params.id){
          break
        }
      }
        res.json(i+1);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err);
  }
};

exports.AddFavouriteDoctrine = async (req, res) => {
  try{
    User.findById(req.params.id, function(err,user){
      if(err){
        console.log(err);
      } else{
        Doctrine.findById(req.params.doctrine, function(err , doctrine){
          if(err){
            console.log(err)
          } else {
            user.favdoctrinelist.push(doctrine)
            doctrine.favby.push(user)
            
            user.save()
            doctrine.save()
          }
        })
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err);
  }
};

exports.RemoveFavouriteDoctrine = async (req, res) => {
  try{
    User.findById(req.params.id, function(err,user){
      if(err){
        console.log(err);
      } else{
        Doctrine.findById(req.params.doctrine, function(err , doctrine){
          if(err){
            console.log(err)
          } else {
            user.favdoctrinelist.remove(doctrine)
            doctrine.favby.remove(user)
            
            user.save()
            doctrine.save()
          }
        })
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err);
  }
};

exports.CheckFav = async(req, res) =>{
  try{
    var result = false
    await User.findById(req.params.id, function(err, user){
      var i = 0
      for( i ; i < user.favdoctrinelist.length  ; i++){
        if(user.favdoctrinelist[i].equals(req.params.doctrine)){
          result = true
          break
        }
      }
      res.send({"result": result}) 
    })
  } catch (err){
    res.status(400).json({ err: err });
    console.log(err);
  }
};

exports.sentEmail = async(req,res) =>{
  console.log(req.body)
  asyncs.waterfall([
    function(done){
        User.findOne({email: req.body.email}, function(err, user){
            if(!user){
                return res.status(422).send({errors: {title: 'Invalid email!', detail: 'User does not exist'}});
            } else{
              console.log(user);
              const token = jwt.sign({
                userId: user._id,
                resetPasswordToken: user.resetPasswordToken
              }, "secret" , { expiresIn: '1h' });

              user.resetPasswordToken = token;
              user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
              user.save(function(err){
                done(err, token, user);
              });
            }
        });
    },

    function(token, user, done){
        const smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'rakhangtham@gmail.com',
                pass: 'CSS322project'
            }
        });
        const url = 'http://' + 'localhost:8080' + '/resetPassword/' + token;
        const clickURL = '<a href="'+ url +'">link</a>';
        const mailOptions = {
            to: user.email,
            from: 'rakhangtham@gmail.com',
            subject: 'แจ้งเตือนการเปลี่ยนรหัสผ่าน',
            html: 'คลิกที่ลิงค์เพื่อตั้งค่ารหัสผ่านใหม่ '+ clickURL + '<br>' + 
                  'ถ้าคุณไม่ได้เรียกร้องทำรายการนี้โปรดติดต่อกลับมาที่ rakhangtham@gmail.com'+'<br>'+'ขอบคุณ,'+'<br>'+'Rakhangtham',
        };
        smtpTransport.sendMail(mailOptions, function(err){
          if(err){
            return res.json("error");
          } else{
            console.log('mail sent');
            done(err, 'done');
            return res.json("mail sent");
          }
          
        });
    }
], function(err){
    if(err) res.json("error sent email");
});
};
exports.checkToken = async (req,res) => {
  User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now() } }, function(err, user){
    if(!user) {
        return res.json({check: "error",errors: {title: 'Invalid token!', detail: 'User does not exist'}});
    }   
    res.json({check: "success",token: req.params.token});
  });
};

exports.resetPassword = async (req,res) => {
  asyncs.waterfall([
    function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user){
            if(!user){
                return res.status(422).send({errors: {title: 'error', detail: 'Password reset token is invalid or has expired'}});
            } else{
              if(req.body.new === req.body.confirm){
                user.password = req.body.new;
                user.resetPasswordToken = null;
                user.resetPasswordExpires = null;
                console.log(user)
                user.save(function(err){
                  done(err, user);
                });
              } else {
                return res.status(422).send({errors: {title: 'error', detail: 'Password do not match'}});
              }
            }
        });
    },
    function(user, done){
        var smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'rakhangtham@gmail.com',
                pass: 'CSS322project'
            }
        });

        var mailOptions = {
            to: user.email,
            from: 'rakhangtham@gmail.com',
            subject: 'รหัสผ่านของคุณถูกเปลี่ยนแล้ว',
            text: 'สวัสดี,\n\n' + 
                'อีเมลนี้เป็นการยืนยันว่ารหัสผ่านของ ' + user.email + ' ที่ใช้สำหรับเว็บ Rakhangtham ได้ถูกเปลี่ยนเป็นที่เรียบร้อยแล้ว'
        };
        smtpTransport.sendMail(mailOptions, function(err){
            done(err);
        });
    }
], function(err){
  if(err){
    res.json("error password");
  }else{
    res.json('reset true');
  }
});
};

exports.seamsi = async (req,res) => {  
  try{     
  const add = {
    seamsi:{
      Playable: false,
      Detail:  req.body.content
    }
  };
  console.log(add)
  User.findById({_id : req.params.id},add,function(err, sam){
    if(err){
      console.log(err)
    } else {
      console.log('success')
      console.log(sam)
      console.log(add)
      res.status(201).json({ sam });
    }
  })
 } catch (err) {
  res.status(400).json({ err: err });
  console.log(err)
}
}

exports.lantern = async (req,res) => {  
  try{     
  const add = {
    lantern:{
      Playable: false,
      Detail:  req.body.Detail
    }
  };
  console.log(add)
  User.findById({_id : req.params.id},add,function(err, lan){
    if(err){
      console.log(err)
    } else {
      console.log('success')
      console.log(lan)
      console.log(add)
      res.status(201).json({ lan });
    }
  })
 } catch (err) {
  res.status(400).json({ err: err });
  console.log(err)
}
}
