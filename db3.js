const mongoose = require('mongoose');
const uri = process.env.DBURL;



      mongoose.connect(uri).then(()=>{
        // const dbName = mongoose.connection.db.databaseName;
        // console.log("Connected to database:", dbName);c
        console.log("mongodb connected");
    
    });

module.exports={mongoose};