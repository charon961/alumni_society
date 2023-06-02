const cookieParser = require('cookie-parser');
const User=require('../models/user')
const Post=require('../models/post');
const Comment=require('../models/comment')
module.exports.profile=function(req,res){
       // for creating a sesssion cookie method is used to send res(singuler)

                  //for checking cookies is used (plural)
      // if(req.cookies.user_id){
      //       User.findById(req.cookies.user_id,function(err,user){
      //                if(err){console.log(err); return;}
      //                else{
      //                   res.render('user_profile',{
      //                         user:user
      //                   });

      //                }
      //       });

      // }
      // else{
      //         res.redirect('/user/login');
      // }

      res.render('user_profile');
        
}
module.exports.signup=function(req,res){
      if(req.isAuthenticated()){
            return res.redirect('/users/profile');
      }
      else{
            res.render('signup',{
                  title:'SignUp'
            });
      }
      
}
module.exports.login=function(req,res){
      if(req.isAuthenticated()){
            return res.redirect('/users/profile');
      }
      res.render('login',{
            title:'Login'
      });
}
module.exports.destroySession=function(req,res){

      //inbuilt function in passport to desotrysession
      req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
          });
}


module.exports.create=function(req,res){

      if(req.body.password!=req.body.confirmpassword){
            return res.redirect('back');
          }
        User.findOne({email:req.body.email},function(err,user){
            if(err){console.log(err); return}
            if(!user){
                User.create(req.body,function(err,user){
                    if(err){console.log(err); return}
                    return res.redirect('/users/login');
              
                })
            }else{
                  return res.redirect('back');
            }
        })
}



module.exports.createblog=function(req,res){
      
     Post.create({
      content:req.body.content,
      user:req.user._id
     },function(err,post){
        if(err){console.log(err); return;}
        return res.redirect('back');
     })
}

module.exports.viewpost=function(req,res){
      //  Post.findById(req.params.id,function(err,post){
      //       return res.render('viewpost',{
      //            post:post 
      //       })
      //  })
      Post.findById(req.params.id).populate('user')
      .exec(function(err,post){
            console.log(post)
             return res.render('viewpost',{
                    post:post,
             })
           //  return res.redirect('/');
      })
       
}
module.exports.create_session=function(req,res){

      //find the user
      //handle user found
      //handle user not found
      //if found hand mismatch of password
      //create session if everthing is correct
      //

      
//      User.findOne({email:req.body.email},function(err,user){
//         if(user){
//                if(user.password!=req.body.password){
//                      return res.redirect('back');
//                }
//                else{

//                   //here we have named a user_id with value user.id 
//                   //we can name anything user_id its a key like in map

//                   // for creating a sesssion cookie method is used to send res(singuler)

//                   //for checking cookies is used (plural)
//                     res.cookie('user_id',user.id);
//                     return res.redirect('/users/profile');
//                }

//         }
//         else{
//              return res.redirect('back');
//         }
//      })


     // passport Authentication

     return res.redirect('/users/profile');
}
module.exports.writeblog=function(req,res){
      return res.render('blog');
  }
 
module.exports.create_comment=function(req,res){
      console.log(req)
    Post.findById(req.body.post,function(err,post){
        if(post){
           Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
           },function(err,comment){
              if(err){"error in adding comment"}
              else{
                   post.comments.push(comment);
                   //after update we have to save
                   post.save();
                   res.redirect('back');
              }
           })
        }
    })
}