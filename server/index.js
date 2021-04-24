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
const DonateLog = require("./api/log/model/DonateLog")
const Campaign = require("./api/campaign/model/Campaign")




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
app.use(express.static('image'));
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
const ruletRoutes = require('./api/rulet/route/rulet');
const ExchangeRoute = require("./api/exchange/route/exchange")
// const testroute = require('./api/test/test');

// app.use("/user", userRoutes);
app.use("/doctrine", doctrineRoutes);


const newsRoutes = require('./api/news/route/news'); //bring in our user routes
app.use("/user", userRoutes);
app.use("/news", newsRoutes);
app.use("/admin", adminRoutes);
app.use("/campaign", campaignRoutes);
app.use("/exchangeitem", ExchangeRoute);

app.use("/donatelog", donateRoutes);
app.use("/minigamelog", minigameRoutes);
app.use("/rulet", ruletRoutes);



app.post("/test", async function(req,res){

    var RankChange = null
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
    var fuckingid
    var fuckingcampaign
    

    console.log(form)
    if(req.body.status == "complete"){
    await axios.post("https://sandbox-appsrv2.chillpay.co/api/v2/PaymentStatus/",form)
    .then((res) => {
      console.log(res.data)
      var amount = res.data.Amount; 
      var user_id = res.data.CustomerId;

      var str = user_id;
      var fuckingArray = str.split("#");

      fuckingid = fuckingArray[0]
      fuckingcampaign = fuckingArray[1]

      console.log(fuckingid)
      console.log(fuckingcampaign)

        Campaign.findOne({_id : fuckingcampaign},function(err, campaign){
          if(err){
            console.log(err)
          } else {
              User.findOne({_id : fuckingid}, function(err, user){
                const now = new Date();
                //////แก้ไขแต้มบุญ user
                user.totalpoint = user.totalpoint+amount/10
                user.point = user.point+amount/10
                RankChange = user.ChangeRank()
                console.log(RankChange)
                const donatelog = new DonateLog({
                  campaign : null,
                  user : null ,
                  result : 'complete',
                  CampaignName : campaign.name,
                  ChangeRank: RankChange,
                  UserName : user.firstname,
                  amount : amount/100,
                  date : now
                });
                
                DonateLog.create(donatelog,function(err,log){
                  
                  console.log(log)
                  log.user = user
                  log.campaign = campaign
                  
                  //////save ข้อมูล log เข้า donate log ของ user 
                  user.donatelog.push(log)
                  

                  campaign.donatelist.push(log)
        
                  campaign.donate = campaign.donate+amount/100;
                  
                  /////save ข้อมูล
                  
                  

                  campaign.save();
                  log.save();
                  user.save();
                })
            })
          }
        })
     })
    } else if(req.body.status == 'incomplete'){
      
    await axios.post("https://sandbox-appsrv2.chillpay.co/api/v2/PaymentStatus/",form)
    .then((res) => {
      console.log(res.data)
      var amount = res.data.Amount; 
      var user_id = res.data.CustomerId;

      var str = user_id;
      var fuckingArray = str.split("#");

      fuckingid = fuckingArray[0]
      fuckingcampaign = fuckingArray[1]

      console.log(fuckingid)
      console.log(fuckingcampaign)

        Campaign.findOne({_id : fuckingcampaign},function(err, campaign){
          if(err){
            console.log(err)
          } else {
              User.findOne({_id : fuckingid}, function(err, user){
                const now = new Date();
                const donatelog = new DonateLog({
                  campaign : null,
                  user : null ,
                  result : 'incomplete',
                  CampaignName : campaign.name,
                  UserName : user.firstname,
                  amount : amount/100,
                  date : now
                });
                
                DonateLog.create(donatelog,function(err,log){
                  log.user = user
                  log.campaign = campaign
                  //////save ข้อมูล log เข้า donate log ของ user 
                  user.donatelog.push(log)
                  /////save ข้อมูล
                  log.save();
                  user.save();
                })
            })
          }
        })
     })
    } else if(req.body.status == 'cancel'){
      
    await axios.post("https://sandbox-appsrv2.chillpay.co/api/v2/PaymentStatus/",form)
    .then((res) => {
      console.log(res.data)
      var amount = res.data.Amount; 
      var user_id = res.data.CustomerId;

      var str = user_id;
      var fuckingArray = str.split("#");

      fuckingid = fuckingArray[0]
      fuckingcampaign = fuckingArray[1]

      console.log(fuckingid)
      console.log(fuckingcampaign)

        Campaign.findOne({_id : fuckingcampaign},function(err, campaign){
          if(err){
            console.log(err)
          } else {
              User.findOne({_id : fuckingid}, function(err, user){
                const now = new Date();
                const donatelog = new DonateLog({
                  campaign : null,
                  user : null ,
                  result : 'cancel',
                  CampaignName : campaign.name,
                  UserName : user.firstname,
                  amount : amount/100,
                  date : now
                });
                
                DonateLog.create(donatelog,function(err,log){
                  log.user = user
                  log.campaign = campaign
                  //////save ข้อมูล log เข้า donate log ของ user 
                  user.donatelog.push(log)
                  /////save ข้อมูล
                  log.save();
                  user.save();
                })
            })
          }
        })
     })
    } else if(req.body.status == 'error'){
    await axios.post("https://sandbox-appsrv2.chillpay.co/api/v2/PaymentStatus/",form)
    .then((res) => {
      console.log(res.data)
      var amount = res.data.Amount; 
      var user_id = res.data.CustomerId;

      var str = user_id;
      var fuckingArray = str.split("#");

      fuckingid = fuckingArray[0]
      fuckingcampaign = fuckingArray[1]

      console.log(fuckingid)
      console.log(fuckingcampaign)

        Campaign.findOne({_id : fuckingcampaign},function(err, campaign){
          if(err){
            console.log(err)
          } else {
              User.findOne({_id : fuckingid}, function(err, user){
                const now = new Date();
                const donatelog = new DonateLog({
                  campaign : null,
                  user : null ,
                  result : null,
                  CampaignName : campaign.name,
                  UserName : user.firstname,
                  amount : amount/100,
                  date : now
                });
                // ตรวจสอบและเปลี่ยน rank ของ user 
                // user.checkRank()
                
                DonateLog.create(donatelog,function(err,log){
                  log.user = user
                  log.campaign = campaign
                  log.result = 'error'
                  //////save ข้อมูล log เข้า donate log ของ user 
                  user.donatelog.push(log)
                  /////save ข้อมูล
                  log.save();
                  user.save();
                })
            })
          }
        })
     })
    }
  res.redirect('http://localhost:8080/campaign/'+fuckingcampaign)
});



app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});