// const cookieParser = require('cookie-parser');
// const User=require('../models/user')
// const Post=require('../models/post');
// const Comment=require('../models/comment')

// module.exports.destroy_post=function(req,res){
//        Post.findById(req.params.id,function(err,post){
//               if(post){ 
//                   console.log(req.user._id, post.user)
                  
//                      if(String(post.user)==String(req.user._id)){
//                         console.log("enter 2")
//                            post.remove();
//                            Comment.deleteMany({post:req.params.id},function(err){
//                                   if(err){console.log("error in removing comments");}
//                                      console.log("This post id deleted!!!!!!!")
//                                   return res.redirect('/');
//                            })
//                      }
//                      else{
//                         return res.redirect('/');
//                      }

//               }
//               else{
//                     return res.redirect('/');
//               }
//        })
// }