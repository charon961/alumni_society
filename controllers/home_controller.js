const Post=require('../models/post');
const User=require('../models/user')
const body=require('body-parser');

module.exports.home=function(req,res){
//   Post.find({}).populate('user').populate({
//     path:'user'
//   }).exec(function(err,post){
//     return res.render('home',{
//         title:"Home",
//         post:post
//   });
//   });

    //    Post.find({}).populate('user').exec(function(err,post){
    //     console.log(post)
    //     return res.render('home',{
    //         title:"Home",
    //          post:post
    //     });
        
    //   })
   



    // var arr=[];
    
    //  User.find({},function(err,user){
    //       Post.find({},function(err,post){
    //            if(user.id==post.user){
                   
    //                   arr.push(user.name:post.content);
    //            }
    //       })
    //  })

    //  Post.find({}).populate('user').populate({
     
    //         path:'user'
        
    // }).exec(function(err,post){
    //     console.log(post)
    //     return res.render('home',{
    //         post:post
            
    //   })
    // });


    //plural users

    Post.find({}).populate('user').exec(function(err,post){
        return res.render('home',{
                    post:post
                    
              })
    })
    // Post.find({},function(err,post){
    //       return res.render('home',{
    //          post:post
    //       }
    //       )
    // })
}

