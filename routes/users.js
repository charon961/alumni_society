const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller')
const passport=require('passport');

router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/signup',usersController.signup);
router.get('/login',usersController.login);
router.get('/signout',usersController.destroySession);
router.post('/create',usersController.create);
router.get('/writeblog',passport.checkAuthentication,usersController.writeblog);
router.post('/createblog',passport.checkAuthentication,usersController.createblog);
router.get('/:id',usersController.viewpost)
router.post('/create_session',passport.authenticate(
       'local',
       {failureRedirect:'/users/signup'},
),usersController.create_session);


module.exports=router;