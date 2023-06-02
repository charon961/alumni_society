const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user')

//authentication by passport
passport.use(new LocalStrategy({
             usernameField:'email'
             },
             function(email,password,done){
                   //find a user establish the identiy
                   User.findOne({email:email},function(err,user){
                       if(err){console.log(err); return done(err);}
                       if(!user||user.password!=password){
                           console.log('Invalid Username/Password');
                           return done(null,false);
                       }
                       return done(null,user);

                   })
             }


));


//seriealisng user to decide which key is to kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserialisg the user from the key in the cookies

passport.deserializeUser(function(id,done){
      User.findById(id,function(err,user){
          if(err){console.log(err); return done(err);}
          else{
            
            return done(null,user);
          }
      })
})


passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
         return next();
    }
    else{
        console.log("Not Authenticated");
        return res.redirect('/users/signup');
    }
   
}

passport.setAuthenticated=function(req,res,next){
    if(req.isAuthenticated()){

        //now the req.user contain the current signed in user from the session cookie and we are just sending this to locals for the views
        res.locals.user = req.session.user;
        res.locals.user = req.user;
   }
  next()
}
module.exports=passport;