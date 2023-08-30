

    //  importing of required packages.................
    const express = require('express');
    const app = express();
    const path = require('path');
    const port = 8889;
    const expressEjsLayouts = require('express-ejs-layouts');

    // connecting to mongoose..
    const db=require('./config/mongoose');

    app.use(express.urlencoded({extended:false}));



    // Configoration for all static file.........
    app.set('view engine','ejs');
    app.set('views' , path.join(__dirname,'views'));
    app.use(expressEjsLayouts);
    app.use(express.static('./assests'));




    app.use('/',require('./routs/home'));

    // Listening the Port on Server which are provided belove...................
    app.listen(port,function(error){
        if(error){
            console.log("Error accured : ",error);
            return;
        }
        console.log("Server runing on port: ",port);
    });


