const mongoose = require('mongoose');

mongoose.set('strictQuery', true)

module.exports=()=>{
    const connectionParms = {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
    try{
        mongoose.connect(`mongodb://${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`,connectionParms);
        // mongoose.connect(process.env.MONG_URI,connectionParms)
        
        console.log('Connected to database successfully');
        
    }catch(error){

        console.log(error)
        console.log('could not connect to database!');
    }
}