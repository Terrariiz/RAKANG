const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
const path = require("path");
var CryptoJS = require("crypto-js");
const axios = require("Axios")
// var FormData = require('form-data');
// const URLSearchParams = require('url-search-params-polyfill');
const { URLSearchParams } = require('url');
const User = require("./api/user/model/User");
const Donate = require("./api/log/model/DonateLog")




//configure database and mongoose
mongoose.set('useFindAndModify', false);
mongoose.set("useCreateIndex", true);
mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });
// db configuaration ends here
//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here
app.use(morgan("dev")); // configire morgan
app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));


// define first route
app.get("/", (req, res) => {
  console.log("Hello MEVN Soldier");
});

const userRoutes = require('./api/user/route/user'); //bring in our user routes
const doctrineRoutes = require("./api/doctrine/route/doctrine"); //bring in our user routes
const adminRoutes = require('./api/admin/route/admin');
const campaignRoutes = require('./api/campaign/route/campaign');

const donateRoutes = require('./api/log/route/donatelog');
const minigameRoutes = require('./api/log/route/minigamelog');
// const testroute = require('./api/test/test');

// app.use("/user", userRoutes);
app.use("/doctrine", doctrineRoutes);


const newsRoutes = require('./api/news/route/news'); //bring in our user routes
app.use("/user", userRoutes);
app.use("/news", newsRoutes);
app.use("/admin", adminRoutes);
app.use("/campaign", campaignRoutes);

app.use("/donatelog", donateRoutes);
app.use("/minigamelog", minigameRoutes);



app.post("/test", async function(req,res){

    const MerchantCode = 'M031001'
    const Apikey = 'Z5O4ARB0wikPpsSwpjXwmeuVCdD2zVV27Sdbti9gTvYWEOiBo7s7fB6S81LZAE3I'
    const TransactionId = req.body.transNo;
    const md5key = "9kQEjXW1R5jlrD3teFy0qzKYNTwJB0VLeRJjozgFLoUDPy4RrqSu0AQEZyCWRYeJZnCm9835Qe7KVISlCpkC5mHa482E9ApEL3M3z01W03RpbvUUkKbj89NaR1jJNUEnkMyXrATJydyKRh8pqZLu174kf2QxJzBxufAjC"
    var string = MerchantCode+TransactionId+Apikey+md5key

    console.log(req.body)

    console.log(string)

    const MD5Hash =  CryptoJS.MD5(string);

    console.log(MD5Hash.toString())

    var CheckSum = MD5Hash.toString()

    var form = new URLSearchParams();

    form.append("TransactionId",TransactionId);
    form.append("CheckSum",CheckSum);
    form.append("ApiKey",Apikey);
    form.append("MerchantCode",MerchantCode);

    console.log(form)
    if(req.body.status == "complete"){
    await axios.post("https://sandbox-appsrv2.chillpay.co/api/v2/PaymentStatus/",form)
    .then((res) => {
      console.log(res.data)
      var amount = res.data.Amount; 
      var user_id = res.data.CustomerId;

      var str = user_id;
      var fuckingArray = str.split("#");

      const fuckingid = fuckingArray[0]
      const fuckingcampaign = fuckingArray[1]

      console.log(fuckingid)
      console.log(fuckingcampaign)

      const now = new Date();
      // const coin = new Coin({
      //     amount : amount/100,
      //     date : now
      //   });
        ////////////ของใหม่/////////////////
        // const amount = parseInt(req.params.amount, 10);
        Campaign.findOne({_id : req.params.campaign},function(err, campaign){
          console.log(campaign)
          console.log('8h49dfghdfgh')
          if(err){
            console.log(err)
          } else {
              User.findOne({_id : req.params.id}, function(err, user){
                
                const now = new Date();
      
                const donatelog = new DonateLog({
                  amount : amount,
                  date : now
                });
                
                DonateLog.create(donatelog,function(err,log){
                  
                  console.log(log)
      
                  log.user.push(user)
                  log.campaign.push(campaign)
                  //////แก้ไขยอด coin user
                  user.point = user.point+amount/10
                  //////save ข้อมูล log เข้า donate log ของ user 
                  user.donatelog.push(log)
      
                  campaign.donatelist.push(log)
        
                  campaign.donate = campaign.donate+amount;
                  /////save ข้อมูล
                  campaign.save();
                  log.save();
                  user.save();
                  console.log(campaign)
      
                })
            })
            
            res.status(201).json({ campaign });
          }
        })
        res.status(201);
        /////////ของใหม่///////////
      
      //   ////สร้าง coinlog
      // Donate.create(coin, function(err,newcoinlog){
      //   User.findById(fuckingid,function(err,user){
      //     console.log(user._id);
      //     user.coin = user.coin+(amount/100);
      //     //แอด coinlog///////////////////////////////////////

      //     user.coinlog.push(newcoinlog)
      //     newcoinlog.user.push(user)

      //     newcoinlog.save();
      //     user.save();
      //   })

      //   })
      
     })
    } else if(req.body.status == 'incomplete'){

    } else if(req.body.status == 'cancle'){

    }
    

  res.redirect('http://localhost:8080/home',)
});



app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});