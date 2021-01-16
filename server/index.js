const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
const path = require("path");


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
// app.use("/user", userRoutes);
app.use("/doctrine", doctrineRoutes);


const newsRoutes = require('./api/news/route/news'); //bring in our user routes
app.use("/user", userRoutes);
app.use("/news", newsRoutes);
app.use("/admin", adminRoutes);
app.use("/campaign", campaignRoutes);


app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});