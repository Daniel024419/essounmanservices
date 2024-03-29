//importing mysql instances from the package
var mysql = require('mysql');
require('dotenv').config();
try{
//creating connection variables
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
connection.connect( async (error)=> {
    
    try{
    // throwing error /exception
   // if (error) throw error;
    if(error){
        console.log("Xampp not connected");
    }
}
catch(ex){
 console.log("database error,xampp is not running");
}

});

// exporting connection to be used globally
module.exports = connection;
}
catch(ex){
 console.log("database error,xampp is not running");
}
