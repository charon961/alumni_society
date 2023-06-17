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

     return   res.render('user_profile');
        
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
      // req.logout();
      // req.flash('success','You have logout')
      //       res.redirect('/');

      req.logout(function(err) {
            if (err) { return next(err); }
            req.flash('success','You have logout')
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
      if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            Post.findById(req.params.id)
            .populate('user')
             .populate({
                  path: 'comments',
                  populate: {
                      path: 'user'
                  }
              })
            .exec(function(err, posts){
               // console.log(posts,"this ")
                  if(err){console.log(err); return;}
                  else{
                   return res.render('viewpost',{
                          post:posts,
                   })
                 }
                //  return res.redirect('/');

            })
   
      }
       
}
module.exports.create_session=function(req,res){
      req.flash('success','Logged in Successfully')

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

     return res.redirect('/');
}
module.exports.writeblog=function(req,res){
      return res.render('blog');
  }
 
module.exports.create_comment=function(req,res){
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

module.exports.destroy=function(req,res){
      Post.findById(req.params.id,function(err,post){
            if(post){ 
            //     console.log(req.user._id, post.user)
                
                   if(String(post.user)==String(req.user._id)){
                         post.remove();
                         Comment.deleteMany({post:req.params.id},function(err){
                                if(err){console.log("error in removing comments");}
                              //      console.log("This post is deleted!!!!!!!")
                                return res.redirect('/');
                         })
                   }
                   else{
                      return res.redirect('/');
                   }

            }
            else{
                  return res.redirect('/');
            }
     })

}

module.exports.destroy_comment=function(req,res){

        Comment.findById(req.params.id,function(err,comment){
              if(err){console.log(err); return;}
                if(comment){

                  if (comment.id.match(/^[0-9a-fA-F]{24}$/)) {
                        Comment.findById(comment.id)
                        .populate('post')

                        .exec(function(err, comments){
                        //     console.log(comments.user)
                        //     console.log(req.user)
                            if(String(comments.post.user)==String(req.user._id)||String(comments.user._id)==String(req.user._id)){
                              const post_id=comment.post;
                              const comment_id=comment._id;
                              comment.remove();
                              Post.findByIdAndUpdate(post_id,{$pull:{comments:comment_id}},function(err,post){
                                  return res.redirect('back');
                              })
                         }
                         else{
                            return res.redirect('back');
                         }
            
                        })
               
                  }
                }
                else{
                    return res.redirect('back');
                }
        })
}