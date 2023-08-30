




{


    
    // IMPORTING MONGOOSE.........
        const mongoose=require('mongoose');
        const {Schema} = mongoose
    
    //  CREATION OF SCHEMA..........
        const newEmployeeShema= new mongoose.Schema({
            name:{
                type:String,
                require:true
            },
            origin:{
                type:String,
                require:true
            },
            destination:{
                type:String,
                require:true
            }
        },{
            timestamps:true
        });
    
    
    
       // CREATION OF MODEL..........
        const newEmployee=mongoose.model('newEmployee',newEmployeeShema);
        // EXPORTING OF MODEL...............
        module.exports=newEmployee;
    
    }