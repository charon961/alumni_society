const port=3000;
const cookieParser=require('cookie-parser');
const express=require('express');
const app=express();
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose')
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const path=require('path');

const MongoStore=require('connect-mongo')(session);



//body-parser
app.use(express.urlencoded());

  //a change
app.use(cookieParser());
//setting up stating files

app.use("/assets", express.static(__dirname + '/assets'));

//
//setting view engine
app.use(expressLayouts);
//extract styles and scripts from sub pages and place it into the head of layout
app.set('layout extractStyles',true);
app.set('view engine','ejs');
app.set('views','./views');



//mongo store is used to store the session cookie in the db
app.use(session({
      name:'alumni_society',
      secret:'random',
      saveUninitialized:false,
      resave:false,
      cookie:{
            //in millisec
            maxAge:(1000*60*100)
      },
      store:  new MongoStore(
            {
            
                  mongooseConnection:db,
                  autoRemove:'disabled'
            
             },
             function(err){
                  console.log(err||'connect-mongodb setup ok');
             }
      )
}))

app.use(passport.initialize());
app.use(passport.session());


//setup the current user usage gloabally
app.use(passport.setAuthenticated);

//always keep at the end of layouts


app.use('/',require('./routes'));

app.listen(3000,function(err){
      if(err){console.log(err);}
      else{
            console.log("server is running")
      }
})
