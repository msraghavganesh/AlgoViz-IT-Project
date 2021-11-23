const express = require("express"),
  app = express(),
  path = require('path');
  session = require("express-session"),
  MongoStore = require("connect-mongo")(session),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  User = require("./models/User"),
  forumRoutes = require("./routes/Forum")
  authRoutes = require("./routes/Auth"),
   _ = require("lodash"),
 
  PORT = 5000,
  MONGO_URI = "mongodb+srv://admin:admin123@algoviz-0.b1ljo.mongodb.net/algoviz?retryWrites=true&w=majority";

  // Using EJS as templating engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views"));

app.locals._ = _;

// Mongo DB COnnection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true
  })
  .then(console.log(`MongoDB connected ${MONGO_URI}`))
  .catch(err => console.log(err));


// Bodyparser middleware, extended true does allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express Session
app.use(
  session({
    secret: "nitk",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use(authRoutes);
app.use(forumRoutes);

// http.createServer(app).listen(PORT, () => console.log(`AlgoViz is up and running @ port: ${PORT}!`));
app.listen(PORT, () => console.log(`AlgoViz is up and running @ port: ${PORT}!`));