const mongoose=require('mongoose');

const commentschema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
}, { timestamps: true });


const Comment=mongoose.model('comment',commentschema);

module.exports=Comment;