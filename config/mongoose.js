const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost/alumni_dev');


const db=mongoose.connection;
db.on('error',console.error.bind(console,"error in connection to mongodb"));

db.once('open',function(){
    console.log('connected to database: MongoDB');
})

module.exports=db