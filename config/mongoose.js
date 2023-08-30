



{
    // CONNECTION MONGO DB THIS PROJECT.....
    const mongoose= require('mongoose');

    mongoose.connect('mongodb://127.0.0.1:27017/TimeSeries');

    const db=mongoose.connection;

    db.on('error',console.error.bind(console,"error accured to connecting to db..."));

    db.once('open',function(){
        console.log("successfully connected to DataBase.....");
    });

}