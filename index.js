const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const router = express.Router();
const path = require('path');
const { date, array } = require('joi');
var fs = require('fs');
 var mysql = require('mysql');
require('dotenv').config();
// session modiules
//importing mails support
const mailHelper = require('./mailhelper');
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(bodyparser.urlencoded({ extended: false }));
// static files
app.use('/public',express.static(path.join(__dirname,'public','css')));
app.use('/public/pictures',express.static(path.join(__dirname,'public','pictures')));
// dashboard
app.use('/dashboard/public/css',express.static(path.join(__dirname,'dashboard','public','css')));
 
 var transporter = mailHelper.transporter;
  var EMAIL_USERNAME = process.env.EMAIL_USERNAME;
// end

const EventEmitter = require('events'); // Import EventEmitter
// Increase the event listener limit for Express (change 15 to your desired limit)
EventEmitter.setMaxListeners(100);
//view engine setup
app.set('view engine', 'ejs');
//app.enaable('setting:view cache');
//email
//require('./views/email');
// end
require('./config/database_conn')
//fetch_data_modules
const connection = require('./config/database_conn');
const { URLSearchParams } = require('url');
const { exit } = require('process');

//date object
const dateObject=require('./views/partials/dateTime.js');
const { Store } = require('express-session');
// end

// tim to live for cookies
const oneDay=100*60*60*24;
//session variables
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie:{maxAge:oneDay},
}));

// Initialization
app.use(cookieParser());
app.use(express.json());

const userSession={
// user varaibles
user_id:user_id='',
dbUsername:dbUsername='',
dbtel_house:dbtel_house='',
dbtelephone:telephone='',
dbregion:region='',
dbaddress:address='',
dbhouse_no:dbhouse_no='',
dbEmail:dbEmail='',
dbPassword:dbPassword='',
userstatus:dbuserstatus='',

}

const adminSession={
  // user varaibles
  admin_id:admin_id='',
  adname:adname='',
  adtel_house:tel_house='',
  adtelephone:telephone='',
  adregion:region='',
  adaddress:address='',
  adhouse_no:house_no='',
  adEmail:adEmail='',
  adPassword:adPassword='',
  adstatus:adstatus='',
  
  }

const sessionKey={
  sessionId:'',
}


//globalizing sessions variables
app.use((req,res,next)=>{
res.locals.currentUser=req.session.currentUser;
res.locals.currentAdmin=req.session.currentAdmin;
next();
});


//globalizing analytic variables
app.use((req,res,next)=>{


  connection.connect( function (err) { 
    //for the footer
  connection.query( `SELECT * FROM services WHERE control=1`, 
  function (err, services_result, fields) {

    connection.query( `SELECT * FROM businessinfo`, 
    function (err, businessinfo_result, fields) {
      connection.query(`SELECT * FROM orders WHERE completed=0 AND user_id=${userSession.user_id}`, 
      function (err, fetch_orders, fields) {

        let order_length=0;
        let User_name='';
        if(fetch_orders!=undefined){
        order_length=fetch_orders.length;
        fetch_orders.forEach((data)=>{
          User_name=data.user_name;
        });
          }
  //globalisation
    const userOrders={
      User_name :User_name,
      order_length:order_length,
    }
    //for the footer
   res.locals.services=services_result;
   res.locals.businessinfo=businessinfo_result;
   res.locals.userOrders=userOrders;
  //  res.locals.message_admin=message_result_admin;
  //  res.locals.message_admin=message_result_admin;
 
  next();
  });});});  });
});
 //

//with middlewares
app.get('/', (req, res, next) => {
      res.render(__dirname + "/views/index.ejs",
        {userSession:userSession });

 });

// about
app.get('/about', (req, res) => { 
  //import the data from fetch order file
     res.render(__dirname + "/views/about.ejs",
     {userSession:userSession });
});

// contact
app.get('/contact', (req, res) => {
  
     res.render(__dirname + "/views/contact.ejs",
     {userSession:userSession });
 
});
 
// packages
app.get('/packages', (req, res) => {
 
  connection.connect( function (err) {
    connection.query( `SELECT * FROM packages ORDER BY max_price DESC`, 
    function (err,packageData, fields) {
     res.render(__dirname + "/views/packages.ejs",
      {userSession:userSession,packageData });

    });});
  
    
});
 // end

// 
// services
app.get('/services', (req, res) => {
 //let phone='';
 let serviceName =mysql.format(req.query.serviceName);

 connection.connect( function (err) {

 let query=``;
 if(!serviceName){
  query=`SELECT * FROM services WHERE control=1 ORDER BY hour_price DESC`;
 }else if(serviceName){
  query=`SELECT * FROM services WHERE name LIKE '%${serviceName}%' AND control=1`;
 }
 else if(serviceName==undefined){
  res.redirect('services')
 }
 connection.query(query,function (err,service_data, fields) {
const search={
  serviceName:serviceName,
}
  res.render(__dirname + "/views/services.ejs",
        {userSession:userSession,service_data,search:search});
  });

 
});
    // end
 });
 
   
// 
// gallery
app.get('/gallery', (req, res) => {
 res.render(__dirname + "/views/gallery.ejs",
{userSession:userSession });

});

// end
// package basic
app.get('/package-basic', (req, res) => {


  let types =mysql.format(req.query.types);

 
  let query=``;
  if(!types){
    query=`SELECT * FROM package_basic`;
  }else if(types){
    query=`SELECT * FROM package_basic WHERE types LIKE '%${types}%' ORDER BY price DESC`;
  }
  else if(types==undefined){
   res.redirect('back')
  }

  connection.connect( function (err) {
    connection.query( query, 
    function (err,basicData, fields) {
      const search={
        types:types,
      }
       res.render(__dirname + "/views/packages/basic.ejs",
        {basicData,userSession:userSession,search:search});
    });});
      // basic
});



  // end

// end

// package pro

app.get('/package-pro', (req, res) => {



  let types =mysql.format(req.query.types);

 
  let query=``;
  if(!types){
    query=`SELECT * FROM package_pro`;
  }else if(types){
    query=`SELECT * FROM package_pro WHERE types LIKE '%${types}%' ORDER BY price DESC`;
  }
  else if(types==undefined){
   res.redirect('back')
  }

  connection.connect( function (err) {
    connection.query(query, 
    function (err,proData, fields) {
      const search={
        types:types,
      }
       res.render(__dirname + "/views/packages/pro.ejs",
        {proData,userSession:userSession,search:search});
    });});
      // basic
});
// end

//package premium
app.get('/package-premium', (req, res) => {


  let types =mysql.format(req.query.types);

 
  let query=``;
  if(!types){
    query=`SELECT * FROM package_premium`;
  }else if(types){
    query=`SELECT * FROM package_premium WHERE types LIKE '%${types}%' ORDER BY price DESC`;
  }
  else if(types==undefined){
   res.redirect('back')
  }

  connection.connect( function (err) {
    connection.query(query, 
    function (err,premiumData, fields) {
      const search={
        types:types,
      }
       res.render(__dirname + "/views/packages/premium.ejs",
        {premiumData,userSession:userSession,search:search});
    });});
      // basic
});
// end




// delete orders
// app.post('/delete-order', (req, res) => {
  app.get('/delete-order/:id',  (req, res) => {
   let orderId = req.params.id;
   connection.connect( function (err) {
    connection.query(`DELETE FROM orders WHERE id=${orderId}`, function (err, result, fields) {
    });
  });
  if(userSession.user_id!=''){
    res.redirect('/orders');
  }else{
    res.redirect('/');
    //alert for order deletions....through email
  }
  

});

// quick users
   app.get('/quickuser/:id',  (req, res) => {
  let QuickUserId = req.params.id;
  
  // console.log(QuickUserId);
  let bookingId = '';
  let price = '';
  let serviceName = '';
  let id='';
  let book_date='';
  let package='';
  let user_id='';

  //quick user
  let user_name='';
  let Tel_house='';
  let Tel='';
  let region='';
  let address='';
  let house_no='';
  let email='';




  connection.query(`SELECT * FROM orders WHERE bookingId='${QuickUserId}'`, 
  function (err, quickOrder, fields) {
    // order
    if(err) throw err;
 
    try{
      // quick user
    quickOrder.forEach((serviceData)=>{
    user_id=serviceData.user_id;
    user_name=serviceData.user_name;
    Tel_house=serviceData.Tel_house;
    Tel=serviceData.Tel;
    region=serviceData.region;
    address=serviceData.address;
    house_no=serviceData.house_no;
    email=serviceData.email;
   // quick user info
    id=serviceData.id;
    serviceName=serviceData.type;
    price=serviceData.price;
    book_date=serviceData.book_date;      
    package=serviceData.package;
    bookingId=serviceData.bookingId;
    });
   

  }catch(ex){
  //console.log("");
  }


const booking = {
  price: price,
  serviceName:serviceName,
  book_date:book_date,
  package:package,
  id:id,
  bookingId:bookingId,
  user_id:user_id,
  //quick user info
  user_id:user_id,
  user_name:user_name,
  Tel_house:Tel_house,
  Tel:Tel,
  region:region,
  address:address,
  house_no:house_no,
  email:email,
}

 
      res.render(__dirname + "/views/quickOrders.ejs",
        {userSession:userSession,booking:booking});

    });
});
// end



   // orders
   app.get('/orders', (req, res) => {

    if(userSession.user_id!=''){
      
  let searchInput =mysql.format(req.query.searchInput);

 
  let query=``;
  if(!searchInput){
    query=`SELECT * FROM orders WHERE completed=0 AND user_id=${userSession.user_id} ORDER BY price DESC`;
  }else if(searchInput){
    query=`SELECT * FROM orders WHERE completed=0 AND
    user_id=${userSession.user_id} AND type LIKE '%${searchInput}%'  ORDER BY price DESC`;  }
  else if(searchInput==undefined){
   res.redirect('back')
  }

      //import the data from fetch order file
     connection.connect( function (err) {
      connection.query(query, 
      function (err, order_result, fields) {
    


        const search={
          searchInput:searchInput,
        }
      res.render(__dirname + "/views/orders.ejs",
      {order_result,userSession:userSession,search:search}
      );
      });
    }); 
    }
   else  if(userSession.user_id==''){
    res.redirect('/account');
   }
     
  });
// end



 // orders
 app.get('/recent-orders', (req, res) => {

  if(userSession.user_id!=''){
          
  let searchInput =mysql.format(req.query.searchInput);

 
  let query=``;
  if(!searchInput){
    query=`SELECT * FROM orders WHERE completed=1 AND user_id=${userSession.user_id} ORDER BY price DESC`;
  }else if(searchInput){
    query=`SELECT * FROM orders WHERE completed=1 AND
    user_id=${userSession.user_id} AND type LIKE '%${searchInput}%' `; 
   }
  else if(searchInput==undefined){
   res.redirect('recent-orders')
  }

    //import the data from fetch order file
   connection.connect( function (err) {
    connection.query(query, 
    function (err, order_result, fields) {
    const search={
        searchInput:searchInput,
      }
    res.render(__dirname + "/views/completed-orders.ejs",
    {order_result,userSession:userSession,search:search}
    );
    });
  }); 
  }else{
       
      message={
         msg:msg=`You must sign in first to see your orders`
        }
      res.render(__dirname + "/views/completed-orders.ejs",
      {message:message}
      );
     

   // res.redirect('/');

  }
   
});
// end



// booking form controll premium
app.get('/booking/basic/:id',  (req, res) => {
  // app.post('/booking?id', (req,res)=>{

  let typeId = req.params.id;
  let bookingId = '';
  let price = '';
  let type = '';
  let package='';
  let addons='';
  //  user info
 //  user info
 let tid='';
 let user_id = '';
 let username = '';
 let tel_house = '';
 let telephone = '';
 let region = '';
 let address = '';
 let house_no = '';
 let email = '';

 

  // fetching data
   connection.connect( function (err) {
    // package query
    connection.query(`SELECT * FROM users WHERE id=${userSession.user_id} LIMIT 1`,
    function (err, user, fields) {
   // fetch user

   try{
    user.forEach((userdata)=>{
      tid=userdata.id;
      id=userdata.user_id;
      username=userdata.username;
      tel_house=userdata.tel_house;
      telephone=userdata.telephone;
      region=userdata.region;
      address=userdata.address;
      house_no=userdata.house_no;
      email=userdata.email;
     });

 }catch(ex){
      //console.log("");
      }

    connection.query(`SELECT * FROM package_basic WHERE id=${typeId} LIMIT 1`,
      function (err, result, fields) {
        // user query
        
       try{
          // ftech package
        result.forEach((packagedata)=>{
        id=packagedata.id;
        price=packagedata.price;
        type=packagedata.types;
        package=packagedata.package_type;
        addons=packagedata.addons;
        });
       

      }catch(ex){
      //console.log("");
      }
 
        const booking = {
          typeId: typeId,
          price: price,
          type:type,
          package:package,
          addons:addons,
        }

        // user data
        const user = {
          tid:id,
          id:userSession.user_id,
          username:userSession.dbUsername,
          tel_house:tel_house,
          telephone:telephone,
          region:region,
          address:address,
          house_no:house_no,
          email:userSession.dbEmail,
        }
        
          //rendering multiple file
           connection.connect( function (err) {

            connection.query(`SELECT * FROM orders WHERE completed=0 AND user_id=${userSession.user_id}`, 
            function (err, order_result, fields) {
         
           res.render(__dirname + "/views/bookings.ejs",
            {  order_result, booking:booking,user:user,userSession:userSession}
          );
            });
          });
        // end
      
        //end

      });
      // end
     
    // end
  }); 
});
// end
});

// end basic

// booking form controll premium
app.get('/booking/pro/:id',  (req, res) => {
  // app.post('/booking?id', (req,res)=>{

  let typeId = req.params.id;
  let bookingId = '';
  let price = '';
  let type = '';
  let package='';
  let addons='';
  //  user info
  let tid='';
  let user_id = '';
  let username = '';
  let tel_house = '';
  let telephone = '';
  let region = '';
  let address = '';
  let house_no = '';
  let email = '';

 

  // fetching data
   connection.connect( function (err) {
    // package query
    connection.query(`SELECT * FROM users WHERE id=${userSession.user_id} LIMIT 1`,
    function (err, user, fields) {
   // fetch user

   try{
    user.forEach((userdata)=>{
      tid=userdata.id;
      id=userdata.user_id;
      username=userdata.username;
      tel_house=userdata.tel_house;
      telephone=userdata.telephone;
      region=userdata.region;
      address=userdata.address;
      house_no=userdata.house_no;
      email=userdata.email;
     });

 }catch(ex){
      //console.log("");
      }

    connection.query(`SELECT * FROM package_pro WHERE id=${typeId} LIMIT 1`,
      function (err, result, fields) {
        // user query
        
       try{
          // ftech package
        result.forEach((packagedata)=>{
        id=packagedata.id;
        price=packagedata.price;
        type=packagedata.types;
        package=packagedata.package_type;
        addons=packagedata.addons;
        });
       

      }catch(ex){
      //console.log("");
      }
 
        const booking = {
          typeId: typeId,
          price: price,
          type:type,
          package:package,
          addons:addons,
        }

       // user data
       const user = {
        tid:id,
        id:userSession.user_id,
        username:userSession.dbUsername,
        tel_house:tel_house,
        telephone:telephone,
        region:region,
        address:address,
        house_no:house_no,
        email:userSession.dbEmail,
      }
        
          //rendering multiple file
           connection.connect( function (err) {

            connection.query(`SELECT * FROM orders WHERE completed=0 AND user_id=${userSession.user_id}`, 
            function (err, order_result, fields) {
         
           res.render(__dirname + "/views/bookings.ejs",
            {  order_result, booking:booking,user:user,userSession:userSession}
          );
            });
          });
        // end
      
        //end

      });
      // end
     
    // end
  }); 
});
// end
});

// end pro






// booking form controll premium
app.get('/booking/premium/:id',  (req, res) => {
  // app.post('/booking?id', (req,res)=>{

  let typeId = req.params.id;
  let bookingId = '';
  let price = '';
  let type = '';
  let package='';
  let addons='';
  //  user info
  let tid='';
  let user_id = '';
  let username = '';
  let tel_house = '';
  let telephone = '';
  let region = '';
  let address = '';
  let house_no = '';
  let email = '';
   
 

  // fetching data
   connection.connect( function (err) {
    // package query
    connection.query(`SELECT * FROM users WHERE id=${userSession.user_id} LIMIT 1`,
    function (err, user, fields) {
   // fetch user

   try{
   user.forEach((userdata)=>{
    tid=userdata.id;
    id=userdata.user_id;
    username=userdata.username;
    tel_house=userdata.tel_house;
    telephone=userdata.telephone;
    region=userdata.region;
    address=userdata.address;
    house_no=userdata.house_no;
    email=userdata.email;
   });

 }catch(ex){
      //console.log("");
      }

    connection.query(`SELECT * FROM package_premium WHERE id=${typeId} LIMIT 1`,
      function (err, result, fields) {
        // user query
        
       try{
          // ftech package
        result.forEach((packagedata)=>{
        id=packagedata.id;
        price=packagedata.price;
        type=packagedata.types;
        package=packagedata.package_type;
        addons=packagedata.addons;
        });
       

      }catch(ex){
      //console.log("");
      }
 
        const booking = {
          typeId: typeId,
          price: price,
          type:type,
          package:package,
          addons:addons,
        }

        // user data
        const user = {
          tid:id,
          id:userSession.user_id,
          username:userSession.dbUsername,
          tel_house:tel_house,
          telephone:telephone,
          region:region,
          address:address,
          house_no:house_no,
          email:userSession.dbEmail,
        }
        
          //rendering multiple file
           connection.connect( function (err) {

            connection.query(`SELECT * FROM orders WHERE completed=0 AND user_id=${userSession.user_id}`, 
            function (err, order_result, fields) { 
           res.render(__dirname + "/views/bookings.ejs",
            {  order_result, booking:booking,user:user,userSession:userSession}
          );
              

          });
          });
        // end
      
        //end

      });
      // end
     
    // end
  }); 
});
// end
});

// end premium
// end
// booking processing
try {
  app.post('/book-process', (req, res, error) => {
    const dates = new Date();
    const minutes = dates.getMinutes();
    const secs = dates.getSeconds();
    const MilSecs = dates.getMilliseconds();
    let user_id =userSession.user_id;
    let bookingId="BKID"+minutes+""+MilSecs
    let username =mysql.format(req.body.username);
    let tel_House =mysql.format(req.body.Housetel);
    let Tel =mysql.format(req.body.Tel);
    let house_no=mysql.format(req.body.houseNo);
    let region=mysql.format(req.body.region);
    let address =mysql.format(req.body.address);
    let book_date =mysql.format(req.body.book_date);
    let bookingtime =dateObject.FulTime+" "+dateObject.FullYear;
    let email =mysql.format(req.body.email);
    let price =mysql.format(req.body.price);
    let type =mysql.format(req.body.type);
    let package =mysql.format(req.body.package);
    let completed=0;
    let response=mysql.format(req.body.response); 
    let quickuserId=secs+""+minutes;

    var transporter = mailHelper.transporter;
    var EMAIL_USERNAME = process.env.EMAIL_USERNAME;
    // quick users
        const quickusers = [quickuserId,bookingId,username,
        tel_House,Tel,region,address,house_no,email,bookingtime]; 
        // booking info
        const boookinginfo = [user_id,bookingId,username,
        tel_House,Tel,region,address,house_no,book_date,
        bookingtime,email,price,type,package,completed,response];
    if(userSession.user_id!=""){
      //inserting data into the dataasbe
      connection.query(`INSERT INTO orders(user_id,bookingId,
        user_name,Tel_house,Tel,region,address,house_no,book_date,
        bookingtime,email,price,type,package,completed,response) 
            VALUES(?,?, ?,?, ?,?, ?,?, ?,? ,?,? ,?,?,?,?)`,boookinginfo,
        function(error,response) {
        //displaying error code
        if (error) {
         console.error(error);
        }
           if(response){
            // serving sucess page

async function sendEmailWithRefreshedToken() {
                                try {

                        const mailConfigurations = {
                            // It should be a string of sender/server email
                            from: EMAIL_USERNAME,
                            to: email,
                            // Subject of Email
                            subject: 'Jobament Home Services',
                            // This would be the text of email body
                            //  + user +
                            html: `<h1>Hi! ${username} </h1>, <p>Your booking has Successfully been processed, 
                            BOOKING-ID ${bookingId} ,booking time ${bookingtime}</p>
    `
                        };

                    transporter.sendMail(mailConfigurations, function(error, info) {
                            //if (error) throw Error(error);
                            if (error) {
                                console.log('no internet to send mail, token has expired');
                            }
                            console.log('Email Sent Successfully');
                           
                        });

 } catch (error) {
                                    console.error('An error occurred:', error);
                                }
                            }
                            // Initialize by sending an email
                            sendEmailWithRefreshedToken();

            res.render(__dirname + "/views/partials/success/userbooking.ejs");
           }
      
      });

    }
    else{
      let bookingIdQuick="QKU"+minutes+""+MilSecs;

        const quickuserTranc={
          quickuserId:quickuserId,
          bookingId:bookingId,    
        }
        // checking for duplicates
        let Dbtype='';
        let Dbprice='';
        let Dbpackage='';
        connection.query(`SELECT * FROM orders WHERE id=${userSession.user_id}`, 
            function (err, order_result, fields) {
              try{
                // ftech package
                order_result.forEach((duplicates)=>{
                Dbprice=duplicates.price;
                Dbpackage=duplicates.package;
                Dbtype=duplicates.type;
            
              });
            }catch(ex){
            //console.log("");
            }

         
           
     if(Dbprice!=req.body.price && Dbpackage!=req.body.package && Dbtype!=req.body.type) {
      
      const boookinginfoQuickuser = [quickuserId,bookingIdQuick,username,
        tel_House,Tel,region,address,house_no,book_date,
        bookingtime,email,price,type,package,completed,response];

        //inserting data into the dataasbe
        connection.query(`INSERT INTO orders(user_id,bookingId,
          user_name,Tel_house,Tel,region,address,house_no,book_date,
          bookingtime,email,price,type,package,completed,response) 
              VALUES(?,?, ?,?, ?,?, ?,?, ?,? ,?,? ,?,?,?,?)`,boookinginfoQuickuser,
            function(error,response) {
          //displaying error code
          if (error) {
           console.error(error);
          }
         

         if (response) {


async function sendEmailWithRefreshedToken() {
                                try {

                        const mailConfigurations = {
                            // It should be a string of sender/server email
                            from: EMAIL_USERNAME,
                            to: email,
                            // Subject of Email
                            subject: 'Jobament Home Services',
                            // This would be the text of email body
                            //  + user +
                            html: `<h1>Hi! ${username} </h1>, <p>Your booking has Successfully been processed, 
                            BOOKING-ID ${bookingId} ,booking time ${bookingtime}</p>
    `
                        };

                    transporter.sendMail(mailConfigurations, function(error, info) {
                            //if (error) throw Error(error);
                            if (error) {
                                console.log('no internet to send mail, token has expired');
                            }
                            console.log('Email Sent Successfully');
                           
                        });
                     } catch (error) {
                                    console.error('An error occurred:', error);
                                }
                            }


                            // Initialize by sending an email
                            sendEmailWithRefreshedToken();

         }

            
        
        });

      //inserting data into the dataasbe
      connection.query(`INSERT INTO quickusers(userId,bookingId,
        user_name,Tel_house,Tel,region,address,house_no,email,date) 
            VALUES(?,?, ?,?, ?,?, ?,?, ?,?)`,quickusers,
          function(error,response) {
        //displaying error code
        if (error) {
         console.error(error);
        }
           if(response){
            // serving sucess page
            res.render(__dirname + "/views/partials/success/quickuserbooking.ejs",
            {quickuserTranc:quickuserTranc});
          }
      
      });


    }
    });
    }
  


  });
}
catch (ex) {
  res.redirect('./');
}

// end

// booking processing
try {
  app.post('/book-services', (req, res, error) => {
    const dates = new Date();
    const minutes = dates.getMinutes();
    const secs = dates.getSeconds();
    const MilSecs = dates.getMilliseconds();
    let user_id =userSession.user_id;
    let bookingId="SID"+minutes+""+MilSecs;
    let bookingIdQuick="SQID"+minutes+""+MilSecs;
    // let existing_bookingId=mysql.format(req.body.bookingId);
    let username =mysql.format(req.body.username);
    let tel_House =mysql.format(req.body.Housetel);
    let Tel =mysql.format(req.body.Tel);
    let house_no=mysql.format(req.body.houseNo);
    let region=mysql.format(req.body.region);
    let address =mysql.format(req.body.address);
    let book_date =mysql.format(req.body.book_date);
    let bookingtime =dateObject.FulTime+" "+dateObject.FullYear;
    let email =mysql.format(req.body.email);
    let price =mysql.format(req.body.price);
    let type =mysql.format(req.body.type);
    let typeId =mysql.format(req.body.typeId);
    let package =type;
    let completed=0;
    let response=mysql.format(req.body.response); 
    let quickuserId=secs+""+minutes;
    // quick users
        const quickusers = [quickuserId,bookingIdQuick,username,
        tel_House,Tel,region,address,house_no,email,bookingtime]; 
        
        // booking info
        const boookinginfo = [userSession.user_id,bookingId,userSession.dbUsername,
        userSession.dbtel_house,Tel,userSession.dbregion,userSession.dbaddress,userSession.dbhouse_no,book_date,
        bookingtime,userSession.dbEmail,price,type,package,completed,response];

     const boookinginfoQuickuser = [quickuserId,bookingIdQuick,username,
        tel_House,Tel,region,address,house_no,book_date,
        bookingtime,email,price,type,package,completed,response];
    if(userSession.user_id!=""){
      //inserting data into the dataasbe

      // end
         
          connection.query(`INSERT INTO orders(user_id,bookingId,
            user_name,Tel_house,Tel,region,address,house_no,book_date,
            bookingtime,email,price,type,package,completed,response) 
                VALUES(?,?, ?,?, ?,?, ?,?, ?,? ,?,? ,?,?,?,?)`,boookinginfo,
              function(error,response) {
            //displaying error code
            if (error) {
             console.error(error);
            }
               if(response){

     async function sendEmailWithRefreshedToken() {
                                try {

                        const mailConfigurations = {
                            // It should be a string of sender/server email
                            from: EMAIL_USERNAME,
                            to: email,
                            // Subject of Email
                            subject: 'Jobament Home Services',
                            // This would be the text of email body
                            //  + user +
                            html: `<h1>Hi! ${username} </h1>, <p>Your booking has Successfully been processed, 
                            BOOKING-ID ${bookingId} ,booking time ${bookingtime}</p>
    `
                        };

                    transporter.sendMail(mailConfigurations, function(error, info) {
                            //if (error) throw Error(error);
                            if (error) {
                                console.log('no internet to send mail, token has expired');
                            }
                            console.log('Email Sent Successfully');
                           
                        });

                     } catch (error) {
                                    console.error('An error occurred:', error);
                                }
                            }
                            // Initialize by sending an email
                            sendEmailWithRefreshedToken();


                // serving sucess page
                res.render(__dirname + "/views/partials/success/userbooking.ejs");
               }
          
          });
    
     
      // 
  
      // end

    }
    //not a user
    else{
    
        const quickuserTranc={
          quickuserId:quickuserId,
          bookingIdQuick:bookingIdQuick,
          
        }
        // checking for duplicates
        
       
        
 

        //inserting data into the dataasbe
        connection.query(`INSERT INTO orders(user_id,bookingId,
          user_name,Tel_house,Tel,region,address,house_no,book_date,
          bookingtime,email,price,type,package,completed,response) 
              VALUES(?,?, ?,?, ?,?, ?,?, ?,? ,?,? ,?,?,?,?)`,boookinginfoQuickuser,
            function(error,response) {
          //displaying error code

          if (error) throw error;    


          if (response) {
async function sendEmailWithRefreshedToken() {
                                try {
                       const mailConfigurations = {
                            // It should be a string of sender/server email
                            from: EMAIL_USERNAME,
                            to: email,
                            // Subject of Email
                            subject: 'Jobament Home Services',
                            // This would be the text of email body
                            //  + user +
                            html: `<h1>Hi! ${username} </h1>, <p>Your booking has Successfully been processed, 
                            BOOKING-ID ${bookingId} ,booking time ${bookingtime}
                            </p>
    `
                        };

                    transporter.sendMail(mailConfigurations, function(error, info) {
                           // if (error) throw Error(error);
                            if (error) {
                                console.log('no internet to send mail, token has expired');
                            }
                            console.log('Email Sent Successfully');
                           
                  });

                     } catch (error) {
                                    console.error('An error occurred:', error);
                                }
                            }
                            // Initialize by sending an email
                            sendEmailWithRefreshedToken();
          }
        
        });

      //inserting data into the dataasbe
      connection.query(`INSERT INTO quickusers(userId,bookingId,
        user_name,Tel_house,Tel,region,address,house_no,email) 
            VALUES(?, ?,?, ?,?, ?,?, ?,?)`,quickusers,
          function(error,response) {
        //displaying error code
        if (error) {
         console.error(error);
        }
           if(response){
            // serving sucess page
            res.render(__dirname + "/views/partials/success/quickuserbooking.ejs",
            {quickuserTranc:quickuserTranc});
          }
      
      });


   
  
    }
    //end if
});
  

}
catch (ex) {
  res.redirect('./');
}

// end



try {
  app.post('/signup', (req, res, error) => {
    const dates = new Date();
    let username =mysql.format(req.body.username);
    let tel_house =mysql.format(req.body.Housetel);
    let telephone =mysql.format(req.body.Tel);
    let region=mysql.format(req.body.region); 
    let address =mysql.format(req.body.address);
    let house_no=mysql.format(req.body.houseNo);
    let email =mysql.format(req.body.email);
    let password =mysql.format(req.body.password);
    let date_Created =dates;
    let userstatus=0;

    const neWuser = [username,tel_house,telephone,region,address
    ,house_no,email,password,userstatus,date_Created];
  
    // inserting
     connection.query(`INSERT INTO users(
           username,tel_house,telephone,region,address,house_no,email,
           password,userstatus,date_created) 
            VALUES(?,?,?,?,?,?,?,?,?,?)`,neWuser,
          function(error,response) {
        //displaying error code
        if (error) {
         console.error(error);
        }
           if(response){

         //res.redirect('./');
          res.render(__dirname + "/views/partials/success/newUser.ejs",{});
           }
      
      });

// end db
  });
}
catch (ex) {
  res.redirect('./');
}



//user update
try {
  app.post('/user/update', (req, res, error) => {
    const dates = new Date();
    let username =mysql.format(req.body.username);
    let tel_house =mysql.format(req.body.Housetel);
    let telephone =mysql.format(req.body.telephone);
    let region=mysql.format(req.body.region); 
    let address =mysql.format(req.body.address);
    let house_no=mysql.format(req.body.house_no);
    let email =mysql.format(req.body.email);
    let password =mysql.format(req.body.password);
    
    const updateUser = [username,tel_house,telephone,region,address
    ,house_no,email,password];
    const updateUserOrder = [username,tel_house,telephone,region,address
      ,house_no,email];
 
      if(userSession.user_id!=''){
    // inserting
     connection.connect( function (err) {
       
      connection.query(`UPDATE users Set username=?,Tel_house=?,telephone=?,
      region=?,address=?,house_no=?,email=?,password=? 
      WHERE id='${userSession.user_id}'`,updateUser,
      function (err, result, fields) {
        connection.query(`UPDATE orders Set user_name=?,tel_house=?,
        Tel=?,region=?,address=?,house_no=?,email=?
      WHERE user_id='${userSession.user_id}'`,updateUserOrder,
      function (err, result, fields) {
        
        if(err) throw err;
      if(result){
        res.redirect('/user-profile');
      } 
      
        });  });
       });

      }
      else{
        res.redirect('/');
      }
// end db
  });
}
catch (ex) {
  res.redirect('./');
}



// app.post('/user', (req, res) => {
//   if (req != '') {
//     res.redirect('./');
//   }
// });

app.get('/account', (req, res) => {
// account
if(adminSession.admin_id==''){
res.render(__dirname + "/views/account.ejs",{userSession:userSession,adminSession:adminSession}); 
}else if(userSession.user_id==''){
  res.render(__dirname + "/views/account.ejs",{userSession:userSession,adminSession:adminSession}); 
}else if(adminSession.admin_id!=''){
 res.redirect('/dashboard')
}else if(userSession.user_id!=''){
  res.redirect('/');
}


});
// login

app.post('/login', (req, res) => {
  let emailInput =mysql.escape(req.body.email);
  let passwordInput =mysql.escape(req.body.password);
  let usernameinput=mysql.escape(req.body.username);

   connection.connect( function (err) {
  
    connection.query('SELECT * FROM users WHERE password='+passwordInput+' AND email='+emailInput+'LIMIT 1', function (err, result, fields) {
    
      try{
        if(result.length>0){


          // foreach
        result.forEach((userId)=>{
// testing session keys aka status key
          sessionKey.sessionId=userId.userstatus;
          
        });
        // end
         if(sessionKey.sessionId==0){
           // foreach
           result.forEach((user)=>{
            userSession.user_id=user.id;
            userSession.dbUsername=user.username;
            userSession.dbtel_house=user.tel_house;
            userSession.dbtelephone=user.telephone;
            userSession.dbregion=user.region;
            userSession.dbaddress=user.address;
            userSession.dbregion=user.region;
            userSession.dbhouse_no=user.house_no;
            userSession.dbEmail=user.email;
            userSession.dbPassword=user.password;
            userSession.userstatus=user.userstatus;
            

          });
          req.session.currentUser=userSession;
          req.session.save();
          console.log(req.session.currentUser);
           res.redirect('./');
         }else if(sessionKey.sessionId==1){
           // foreach
           result.forEach((user)=>{
            adminSession.admin_id=user.id;
            adminSession.adname=user.username;
            adminSession.adtel_house=user.tel_house;
            adminSession.adtelephone=user.telephone;
            adminSession.adregion=user.region;
            adminSession.adaddress=user.address;
            adminSession.adhouse_no=user.house_no;
            adminSession.adEmail=user.email;
            adminSession.adPassword=user.password;
            adminSession.adstatus=user.userstatus;
                       
          });
          req.session.currentAdmin=adminSession;
          req.session.save();
          console.log(req.session.currentAdmin);
          res.redirect('/dashboard');
         }
        
        
        }      
       else if(result.length==0){
        res.render(__dirname + "/views/partials/errors/authLogin.ejs");
       } 
      }
      catch(ex){
//console.log("");
      }
      
     
      }); });

});
// login end



// booking form controll premium
app.get('/booking/service/:id',  (req, res) => {
  // app.post('/booking?id', (req,res)=>{
  let typeId = req.params.id;
  let bookingId = '';
  let price = '';
  let serviceName = '';
   
  //  user info
  let id='';
  let book_date='';
  let package='';
  let user_id='';

  //quick user
  let user_name='';
  let Tel_house='';
  let Tel='';
  let region='';
  let address='';
  let house_no='';
  let email='';
  // fetching data
   connection.connect( function (err) {
    // package query

    connection.query(`SELECT * FROM services WHERE id=${typeId} LIMIT 1`,
      function (err, result, fields) {
        // user query
        
        
        try{
          // quick user
        result.forEach((serviceData)=>{
        user_id=serviceData.user_id;
        user_name=serviceData.user_name;
        Tel_house=serviceData.Tel_house;
        Tel=serviceData.Tel;
        region=serviceData.region;
        address=serviceData.address;
        house_no=serviceData.house_no;
        email=serviceData.email;
       // quick user info
        id=serviceData.id;
        serviceName=serviceData.name;
        price=serviceData.hour_price;
        book_date=serviceData.book_date;      
        package=serviceData.package;
        bookingId=serviceData.bookingId;
        });
       

      }catch(ex){
      //console.log("");
      }
 
        const booking = {
          typeId: typeId,
          price: price,
          serviceName:serviceName,
          book_date:book_date,
          package:package,
          id:id,
          bookingId:bookingId,
          user_id:user_id,
          //quick user info
          user_id:user_id,
          user_name:user_name,
          Tel_house:Tel_house,
          Tel:Tel,
          region:region,
          address:address,
          house_no:house_no,
          email:email,
        }

        // user data
        const user = {
        
          id:userSession.user_id,
          username:userSession.dbUsername,
          tel_house:userSession.dbtel_house,
          telephone:userSession.dbtelephone,
          region:userSession.dbregion,
          address:userSession.dbaddress,
          house_no:userSession.dbhouse_no,
          email:userSession.dbEmail,
        }
        
          //rendering multiple file
           connection.connect( function (err) {

            connection.query(`SELECT * FROM orders WHERE completed=0 AND user_id=${userSession.user_id}`, 
            function (err, order_result, fields) {
         
           res.render(__dirname + "/views/bookings-service.ejs",
            {  order_result, booking:booking,user:user,userSession:userSession}
          );
            });
          });
        // end
      
        //end

      });
      // end
     
    // end
  }); 
});
// end

// booking edit services
try {
  app.post('/book-services-edit', (req, res, error) => {
    const dates = new Date();
    const minutes = dates.getMinutes();
    const secs = dates.getSeconds();
    const MilSecs = dates.getMilliseconds();
    let quickuserId =mysql.format(req.body.user_id);
    let bookingId=mysql.format(req.body.bookingId);
    let username =mysql.format(req.body.username);
    let tel_House =mysql.format(req.body.Housetel);
    let Tel =mysql.format(req.body.Tel);
    let house_no=mysql.format(req.body.houseNo);
    let region=mysql.format(req.body.region);
    let address =mysql.format(req.body.address);
    let book_date =mysql.format(req.body.book_date);
    // let bookingtime =dateObject.FulTime+" "+dateObject.FullYear;
    let email =mysql.format(req.body.email);
    let user_id =mysql.format(req.body.user_id);
    let bId =mysql.format(req.body.id);
 

    // quick users
        const quickusers = [username,
        tel_House,Tel,region,address,house_no,email]; 
       
    if(userSession.user_id!=""){
      //inserting data into the dataasbe

          connection.query(`UPDATE orders Set book_date=?
          WHERE id='${bId}'`,[book_date],function (err, response, fields) {
    
             if(err) throw err;
    
          if(response){
                // serving sucess page
                res.render(__dirname + "/views/partials/success/userbooking-update.ejs");
              }
          
            });
  
      // end

    }
    //not a user
    else{
      



        const quickuserTranc={
          quickuserId:quickuserId,
          bookingId:bookingId,  
          
        }


   
        //  const boookinginfoQuickuser = [username,
        // tel_House,Tel,region,address,house_no,book_date,email];
         
        connection.query(`UPDATE orders Set 
        user_name='${username}',Tel_house='${tel_House}',Tel='${Tel}',region='${region}'
        ,address='${address}',house_no='${house_no}',book_date='${book_date}'
        ,email='${email}' WHERE id='${bId}'`,function (err, response, fields) {
  
          if(err) throw err;
  
        
          });

    
          connection.query(`UPDATE quickusers Set 
          user_name='${username}',Tel_house='${tel_House}',Tel='${Tel}',region='${region}'
         ,address='${address}',house_no='${house_no}',email='${email}'
          WHERE userId='${user_id}'`,[quickusers],function (err, response, fields) {
    
             if(err) throw err;
    
          
           if(response){
            // serving sucess page
            // console.log(bookingId);
            res.render(__dirname + "/views/partials/success/quickuserbooking-edit.ejs",
            {quickuserTranc:quickuserTranc});
           }
            });

    }
    //end if
});
  

}
catch (ex) {
  res.redirect('./');
}

// end

// booking eidt
app.get('/booking/service/edit/:id',  (req, res) => {
  // app.post('/booking?id', (req,res)=>{
  let typeId = req.params.id;
  let bookingId = '';
  let price = '';
  let serviceName = '';
  let id='';
  let book_date='';
  let package='';
  let user_id='';

  //quick user
  let user_name='';
  let Tel_house='';
  let Tel='';
  let region='';
  let address='';
  let house_no='';
  let email='';
   
  //  user info
 
  // fetching data
   connection.connect( function (err) {
    // package query

    connection.query(`SELECT * FROM orders WHERE id=${typeId} LIMIT 1`,
      function (err, result, fields) {
        // user query
        
       try{
          // quick user
        result.forEach((serviceData)=>{
        user_id=serviceData.user_id;
        user_name=serviceData.user_name;
        Tel_house=serviceData.Tel_house;
        Tel=serviceData.Tel;
        region=serviceData.region;
        address=serviceData.address;
        house_no=serviceData.house_no;
        email=serviceData.email;
       // quick user info
        id=serviceData.id;
        serviceName=serviceData.type;
        price=serviceData.price;
        book_date=serviceData.book_date;      
        package=serviceData.package;
        bookingId=serviceData.bookingId;
        });
       

      }catch(ex){
      //console.log("");
      }
 
        const booking = {
          typeId: typeId,
          price: price,
          serviceName:serviceName,
          book_date:book_date,
          package:package,
          id:id,
          bookingId:bookingId,
          user_id:user_id,
          //quick user info
          user_id:user_id,
          user_name:user_name,
          Tel_house:Tel_house,
          Tel:Tel,
          region:region,
          address:address,
          house_no:house_no,
          email:email,
        }

        // user data
        const user = {
          tid:id,
          id:userSession.user_id,
          username:userSession.dbUsername,
          tel_house:userSession.dbtel_house,
          telephone:userSession.dbtelephone,
          region:userSession.dbregion,
          address:userSession.dbaddress,
          house_no:userSession.dbhouse_no,
          email:userSession.dbEmail,
        }
        
          //rendering multiple file
           connection.connect( function (err) {

            connection.query(`SELECT * FROM orders WHERE completed=0 AND user_id=${userSession.user_id}`, 
            function (err, order_result, fields) {
         
           res.render(__dirname + "/views/bookings-service-edit.ejs",
            {  order_result, booking:booking,user:user,userSession:userSession}
          );
            });
          });
        // end
      
        //end

      });
      // end
     
    // end
  }); 
});
// end



// logout user
app.get('/logout', (req, res) => {

  req.session.destroy((err)=>{
   
    userSession.user_id='';
    userSession.userstatus='';
    sessionKey.sessionId=''; 
    res.redirect('/');  
 });


 
 

});

// add subscribers
app.post('/subscribers/add', (req, res, error) => {
   
  let email =mysql.format(req.body.email);
  const control=0;
  const subscriber = [email];

  // inserting
   connection.query(`INSERT INTO subscribers(email) 
          VALUES(?)`,subscriber,
        function(error,response) {
      //displaying error code
      if (error) {
       console.error(error);
      }
         if(response){
          

  async function sendEmailWithRefreshedToken() {
  try {

                        const mailConfigurations = {
                            // It should be a string of sender/server email
                            from: EMAIL_USERNAME,
                            to: email,
                            // Subject of Email
                            subject: 'Jobament Subscription..',
                            // This would be the text of email body
                            //  + user +
                            html: `<h1>Hi! ${email} </h1>, <p>Your account has been added successfully..</p>
    `
                        };

                    transporter.sendMail(mailConfigurations, function(error, info) {
                           // if (error) throw Error(error);
                            if (error) {
                                console.log('no internet to send mail, token has expired');
                            }
                            console.log('Email Sent Successfully');
                           
                        });
                     } catch (error) {
                                    console.error('An error occurred:', error);
                                }
                            }
                            // Initialize by sending an email
         sendEmailWithRefreshedToken();

          res.render(__dirname + "/views/partials/success/newSubscriber.ejs");
            }
    
    });

// end db
});
// add feedback
app.post('/feedback/add', (req, res, error) => {
   
  let email =mysql.format(req.body.email);
  let message =mysql.format(req.body.message);
  const user_id=userSession.user_id;
  const feed = [user_id,email,message];

  // inserting
   connection.query(`INSERT INTO feedback(user_id,email,feedback) 
          VALUES(?,?,?)`,feed,
        function(error,response) {
      //displaying error code
      if (error) {
       console.error(error);
      }
         if(response){

        res.render(__dirname + "/views/partials/success/feedback.ejs");
            }
    
    });

// end db
});

// add feedback
app.post('/contact-us/add', (req, res, error) => {
  let name =mysql.format(req.body.name);
  let email =mysql.format(req.body.email);
  let message =mysql.format(req.body.message);

  const feed = [name,email,message];

  // inserting
   connection.query(`INSERT INTO message(name,email,message) 
          VALUES(?,?,?)`,feed,
        function(error,response) {
      //displaying error code
      if (error) {
       console.error(error);
      }
         if(response){

        res.render(__dirname + "/views/partials/success/contactUs.ejs");
            }
    
    });

// end db
});

//user account info
app.get('/user-profile', (req, res) => {
  
  let user_id='';
  let username='';
  let tel_house='';
  let telephone='';
  let region='';
  let address='';
  let house_no='';
  let email='';
  let password='';

 if(userSession.user_id==''){
  res.redirect('/');
 }else {

   connection.connect( function (err) {

    connection.query(`SELECT * FROM users WHERE id=${userSession.user_id} LIMIT 1`,
    function (err, user, fields) {
   // fetch user
  
   try{
    user.forEach((userdata)=>{
      user_id=userdata.user_id;
      username=userdata.username;
      tel_house=userdata.tel_house;
      telephone=userdata.telephone;
      region=userdata.region;
      address=userdata.address;
      house_no=userdata.house_no;
      email=userdata.email;
      password=userdata.password;
     });
  
  }catch(ex){
      //console.log("");
      }
    // currentadmin data
    const currentUserInfo = {
          
      id:user_id,
      username:username,
      tel_house:tel_house,
      telephone:telephone,
      region:region,
      address:address,
      house_no:house_no,
      email:email,
      password:password,
    }
    
     // services
         res.render(__dirname + "/views/profile.ejs",
     {userSession:userSession,currentUserInfo:currentUserInfo});

        });
    });
 
    
     }

});

// order tracking
app.get('/track-orders', (req, res) => {

  connection.query(`SELECT * FROM orders WHERE completed=0 AND user_id=${userSession.user_id}`, 
  function (err, order_result, fields) {
 // orders
     //  end services
    // end 
      res.render(__dirname + "/views/trackorders.ejs",
      {userSession:userSession,order_result });
    // end
 
 
});
   

});
// 
// order tracking
app.get('/search-order', (req, res) => {
  let emailSearch =mysql.format(req.query.email);
  let bookingId =mysql.format(req.query.bookingId);
  
  //  console.log(emailSearch+'  '+bookingId);

   connection.query(`SELECT * FROM orders WHERE email='${emailSearch}' AND bookingId='${bookingId}'`, 
   function (err, order_result, fields) {
 // orders
     //  end services
     if (err) throw err;

    res.render(__dirname + "/views/track-result.ejs",
      {userSession:userSession,order_result });

    
    // end
 
});
   

});

// admin TRUNCATE
 
// components

 
//globalizing analytic variables
 app.use((req,res,next)=>{


  connection.connect( function (err) { 
    
  connection.query( `SELECT * FROM feedback`, 
  function (err, feedback_result_admin, fields) {
// 
    connection.query( `SELECT * FROM message`, 
    function (err, message_result_admin, fields) {
      // 
      connection.query(`SELECT * FROM users WHERE id=${adminSession.admin_id} LIMIT 1`,
      function (err, session_result_admin, fields) {
        // 
        connection.query(`SELECT * FROM subscribers`,
      function (err, subscribers_result_admin, fields) {
        // 
        let admin_name='';
      try{
        session_result_admin.forEach((data)=>{
        admin_name=data.username;
        });
      }catch(ex){
console.log("");
      }
  //fetching content
    //globalisation
   res.locals.feedback=feedback_result_admin;
   res.locals.message_admin=message_result_admin;
   res.locals.subscribers=subscribers_result_admin;
   res.locals.currentAdminName=admin_name;
 
  next();
  });});});  }); });
});
 // 

//  dashboard
 //sales


app.get('/dashboard', (req, res) => {
    
 let total_earings=0;
 let pending_total_earings=0;
  let completed='';
  let pending='';
  let total_completed_count=0;
  let total_pending_count=0;
  let total_quickUser_count=0;
  let total_User_count=0;
  let total_orders_count=0;
  let total_service_count=0;
  //completed orders
 
    if(sessionKey.sessionId==1 && adminSession.adstatus==1){
      connection.connect( function (err) { 
      connection.query( `SELECT count(*) as total_completed FROM orders WHERE completed=1`, 
      function (err, total_completed, fields) {
        total_completed.forEach((data=>{
          total_completed_count= data.total_completed;
           
        }));

        connection.query( `SELECT count(*) as total_pending FROM orders WHERE completed=0`, 
        function (err, total_pending, fields) {
          total_pending.forEach((data=>{
            total_pending_count= data.total_pending;
             
          }));
        
     connection.query( `SELECT SUM(price) as total FROM orders WHERE completed=1`, 
      function (err, order_result_1, fields) {
    
    order_result_1.forEach((data=>{
      total_earings= data.total;
      completed=data.total;
    }));



//not completed

    connection.query( `SELECT SUM(price) as total FROM orders WHERE completed=0`, 
     function (err, order_result_0, fields) {
    
    order_result_0.forEach((data=>{
      pending_total_earings= data.total;
      pending=data.total;
    }));
 


    connection.query( `SELECT COUNT(*) as total_quickuser FROM quickusers`, 
    function (err, quickuser_result, fields) {
   
      quickuser_result.forEach((data=>{
      total_quickUser_count= data.total_quickuser;
   }));


   
   connection.query( `SELECT COUNT(*) as total_user FROM users`, 
   function (err, user_result, fields) {
  
     user_result.forEach((data=>{
     total_User_count= data.total_user;
  }));

  connection.query( `SELECT COUNT(*) as totalOrders FROM orders`, 
  function (err, order_result, fields) {
 
    order_result.forEach((data=>{
    total_orders_count= data.totalOrders;
 }));

 connection.query( `SELECT COUNT(*) as totalServices FROM services`, 
 function (err, services_result, fields) {

  services_result.forEach((data=>{
   total_service_count= data.totalServices;
   }));

//console.log(total_earings +"....p."+pending_total_earings+" complte "+total_completed_count+" pending "+total_pending_count);


//sales
   const total={
   pending:Intl.NumberFormat().format(pending),
   pendingPercentage:pending/100,
   completed:Intl.NumberFormat().format(completed),
   total_completed_count:total_completed_count,
   total_pending_count:total_pending_count,
   completedPercentage:completed/100,
  }
   
  //quick users

  quickUsers={
    total_quickUser_count:total_quickUser_count,
    total_quickUser_percentage:total_quickUser_count/100,
  }
  //users
  Users={
    total_User_count:total_User_count,
    total_User_percentage:total_User_count/100,
  }

   //orders
   Orders={
    total_orders_count:total_orders_count,
    total_order_percentage:total_orders_count/100,
  }
//orders
services={
  total_service_count:total_service_count,
  total_service_percentage:total_service_count/100,
}
  
    res.render(__dirname + "/dashboard/views/index.ejs",
    {adminSession:adminSession,total:total,quickUsers:quickUsers,services:services,
    Users:Users,Orders:Orders});
     

 }); }); }); });  }); }); }); }); });

    }
    else  if(sessionKey.sessionId!=1 && adminSession.adstatus!=1){

 res.redirect('/account');
  }  

// });

});

 

 
// orders
app.get('/dashboard/orders', (req, res) => {
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{


  let searchInput =mysql.format(req.query.searchInput);

 
  let query=``;
  if(!searchInput){
    query=`SELECT * FROM orders ORDER BY price DESC`;
  }else if(searchInput){
    query=`SELECT * FROM orders WHERE user_name LIKE '%${searchInput}%' 
    OR bookingId LIKE '%${searchInput}%' OR type LIKE '%${searchInput}%'
    OR price<='${searchInput}'OR Tel LIKE '%${searchInput}%' ORDER BY price DESC`;  }
  else if(searchInput==undefined){
   res.redirect('back')
  }

  connection.connect( function (err) { 
    
    connection.query(query, 
    function (err, orders_result_admin, fields) {
      const search={
        searchInput:searchInput,
      }
    res.render(__dirname + "/dashboard/views/orders.ejs",
      {orders_result_admin,search:search});
  });
});
 }
//});
});
// pending orders
app.get('/dashboard/pending-orders', (req, res) => {

  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{

  
  let searchInput =mysql.format(req.query.searchInput);

 
  let query=``;
  if(!searchInput){
    query=`SELECT * FROM orders WHERE completed=0 ORDER BY price DESC`;
  }else if(searchInput){
    query=`SELECT * FROM orders WHERE completed=0 AND user_name LIKE '%${searchInput}%' 
    OR bookingId LIKE '%${searchInput}%' OR type LIKE '%${searchInput}%'
    OR price<='${searchInput}'OR Tel LIKE '%${searchInput}%' ORDER BY price DESC`;  }
  else if(searchInput==undefined){
   res.redirect('back')
  }

  connection.connect( function (err) { 
    
    connection.query( `SELECT * FROM orders WHERE completed=0`, 
    function (err, orders_result_admin_pending, fields) {
      const search={
        searchInput:searchInput,
      }
    res.render(__dirname + "/dashboard/views/ordersPending.ejs",
      {orders_result_admin_pending,search:search});
  });
});
 }
//});
});
// pending orders
app.get('/dashboard/completed-orders', (req, res) => {
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  
  let searchInput =mysql.format(req.query.searchInput);

 
  let query=``;
  if(!searchInput){
    query=`SELECT * FROM orders WHERE completed=1 ORDER BY price DESC`;
  }else if(searchInput){
    query=`SELECT * FROM orders WHERE completed=1 AND user_name LIKE '%${searchInput}%' 
    OR bookingId LIKE '%${searchInput}%' OR type LIKE '%${searchInput}%'
    OR price<='${searchInput}'OR Tel LIKE '%${searchInput}%' ORDER BY price DESC`;  }
  else if(searchInput==undefined){
   res.redirect('back')
  }
  connection.connect( function (err) { 
    
    connection.query(query, 
    function (err, orders_result_admin_completed, fields) {
      const search={
        searchInput:searchInput,
      }
    res.render(__dirname + "/dashboard/views/ordersCompleted.ejs",
      {orders_result_admin_completed,search:search});
  });
});
 }
//});
});


// update pending orders
app.get('/update-order/:id',  (req, res) => {

  let updateId = req.params.id;
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  //console.log(updateId);
  connection.connect( function (err) {
   var num=1;
   connection.query('UPDATE orders SET completed=1 WHERE id='+updateId, function (err, result, fields) {
   });
 });
 }
 // res.redirect('/orders');
 res.redirect('/dashboard/pending-orders');
});
// 
// delete compelted orders
app.get('/order-delete/:id',  (req, res) => {
  let orderId = req.params.id;
  // console.log(updateId);
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{

  connection.connect( function (err) {
   
   connection.query('DELETE FROM orders WHERE id='+orderId, function (err, result, fields) {
   if (err) throw err;
  });
 });
  res.redirect('/dashboard/completed-orders');
  // console.log(orderId);
}
 // res.redirect('/orders');

});
// 

// registered users
app.get('/dashboard/registered-users', (req, res) => {

  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
   
  let searchInput =mysql.format(req.query.searchInput);

 
  let query=``;
  if(!searchInput){
    query=`SELECT * FROM users WHERE userstatus=0`;
  }else if(searchInput){
    query=`SELECT * FROM users WHERE userstatus=0 AND
     email LIKE '%${searchInput}%' OR username LIKE '%${searchInput}%'`; }
  else if(searchInput==undefined){
   res.redirect('back')
  }
  connection.connect( function (err) { 
    
    connection.query(query, 
    function (err,result_users_admin, fields) {
      const search={
        searchInput:searchInput,
      }
    res.render(__dirname + "/dashboard/views/resgisteredUsers.ejs",
      {result_users_admin,search:search});
  });
});
 }
//});
});
// quick users
app.get('/dashboard/quick-users', (req, res) => {

  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  let searchInput =mysql.format(req.query.searchInput);

 
  let query=``;
  if(!searchInput){
    query=`SELECT * FROM quickusers`;
  }else if(searchInput){
    query=`SELECT * FROM quickusers WHERE 
     email LIKE '%${searchInput}%' OR 
     user_name LIKE '%${searchInput}%'`; }
  else if(searchInput==undefined){
   res.redirect('back')
  }
  connection.connect( function (err) { 
    
    connection.query(query, 
    function (err,result_quickuers_admins, fields) {
      const search={
        searchInput:searchInput,
      }
    res.render(__dirname + "/dashboard/views/quickUsers.ejs",
      {result_quickuers_admins,search});
  });
});
 }
//});
});

// delete quick users
app.get('/delete-quick-users/:id',  (req, res) => {
  let uId = req.params.id;
  
  connection.connect( function (err) {
   
   connection.query('DELETE FROM quickusers WHERE id='+uId, 
   function (err, result, fields) {

   });
 });
  

 res.redirect('/dashboard/quick-users');

});
// 

// registered users
app.get('/dashboard/admin', (req, res) => {
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{

  
  let searchInput =mysql.format(req.query.searchInput);

 
  let query=``;
  if(!searchInput){
    query=`SELECT * FROM users WHERE userstatus=1`;
  }else if(searchInput){
    query=`SELECT * FROM users WHERE userstatus=1 AND
     email LIKE '%${searchInput}%' OR username LIKE '%${searchInput}%'`; }
  else if(searchInput==undefined){
   res.redirect('back')
  }
  connection.connect( function (err) { 
    
    connection.query(query, 
    function (err,result_admins, fields) {
      const search={
        searchInput:searchInput,
      }
    res.render(__dirname + "/dashboard/views/admin.ejs",
      {result_admins,search:search});
  });
});
 }
//});
});


//  services
app.get('/dashboard/services', (req, res) => {
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
 connection.connect( function (err) { 
    
    connection.query( `SELECT * FROM services`, 
    function (err,result_services_admins, fields) {
    res.render(__dirname + "/dashboard/views/services.ejs",
      {result_services_admins});
  });
});
 }
//});
});


// add services
  app.post('/service/add', (req, res, error) => {
   
    let service =mysql.format(req.body.service);
    let price =mysql.format(req.body.price);

    const control=0;
    const availability='Yes';
    if(sessionKey.sessionId!=1){
      res.redirect('/account');
   }else{
    const serviceName = [service,price,availability,control];

    // inserting
     connection.query(`INSERT INTO services(name,hour_price,availabilty,control) 
            VALUES(?,?,?,?)`,serviceName,
          function(error,response) {
        //displaying error code
        if (error) {
         console.error(error);
        }
           if(response){
 
 res.redirect('/dashboard/services');
              }
      
      });
    }
// end db
  });
  
  // show services
app.get('/edit-services/show/:id',  (req, res) => {
  let cId = req.params.id;
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  connection.connect( function (err) {
   
   connection.query('UPDATE services SET control=1 WHERE id='+cId, function (err, result, fields) {
  });
 });

  res.redirect('/dashboard/services');
 }
 });

   // hide services
app.get('/edit-services/hide/:id',  (req, res) => {
  let cId = req.params.id;
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  connection.connect( function (err) {
   
   connection.query('UPDATE services SET control=0 WHERE id='+cId, 
   function (err, result, fields) {

  });
 });
res.redirect('/dashboard/services');
}
 
});

 

// delete services
app.get('/delete-services/:id',  (req, res) => {
  let uId = req.params.id;
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  connection.connect( function (err) {
   
   connection.query('DELETE FROM services WHERE id='+uId, function (err, result, fields) {
   });
 });
}
 res.redirect('/dashboard/services');
});
// 

// edit services
app.get('/edit-services/:id',  (req, res) => {
  let SId = req.params.id;
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
    // end 
    const Sid={SId:SId};
    let name='';
    let price='';
    let availabilty='';
    let control='';

     connection.connect( function (err) {
   
      connection.query('SELECT * FROM services WHERE id='+SId, function (err, result, fields) {
        result.forEach((data)=>{
          name=data.name;
          price=data.hour_price;
          availabilty=data.availability;
          control=control;
        });
        
        const service={
          name:name,
          price:price,
          availabilty:availabilty,
          control:control,

        }
        res.render(__dirname + "/dashboard/views/services_edit.ejs",
    
      {Sid:Sid,service:service});
    
      });}
    );

   


}
 
});
// 



 // show services
 app.post('/service/update', (req, res, error) => {
  let service =mysql.format(req.body.service);
  let sId =mysql.format(req.body.id);
  let price =mysql.format(req.body.price);
  let control =mysql.format(req.body.control);

 if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  connection.connect( function (err) {
   
connection.query(`UPDATE services Set name='${service}' , hour_price='${price}' WHERE id='${sId}'`,function (err, result, fields) {
if(err) throw err;

if(result){
  res.redirect('/dashboard/services');
} 

  });
 });
}
});



//  packages
app.get('/dashboard/packages', (req, res) => {
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  connection.connect( function (err) {
  connection.query( `SELECT * FROM packages`, 
  function (err,result_packages_admin, fields) {
  res.render(__dirname + "/dashboard/views/packages.ejs",
    {result_packages_admin});
}); });
 }
//});
});

// end
// edit package
app.get('/edit-package/:id',  (req, res) => {
  let pkId = req.params.id;
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
    // end 
    const pId={
      pkId:pkId
    };
    let id='';
    let min_price='';
    let max_price='';
    let type='';
    let package_type='';
 

     connection.connect( function (err) {
   
      connection.query('SELECT * FROM packages WHERE id='+pkId, function (err, result, fields) {
        result.forEach((data)=>{
          id=data.id;
          max_price=data.max_price;
          min_price=data.min_price;
          type=data.type;
          package_type=data.package_type;
           
          
        });
        
        const packages={
          id:id,
          max_price:max_price,
          min_price:min_price,
          type:type,
          package_type:package_type,
         
        }
        
        res.render(__dirname + "/dashboard/views/package_edit.ejs",
    
      {pId:pId,packages:packages});
    
      });}
    );

   
 
}
});
// 
// end

// show services
app.post('/package/update', (req, res, error) => {
  let pId =req.body.id;
  let max_price =req.body.max_price;
  let min_price =req.body.min_price;
  let type =req.body.type;
  let package_type =req.body.package_type;
   
 
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
 
  connection.connect( function (err) {
   
connection.query(`UPDATE packages Set package_type='${package_type}'  
,type='${type}',max_price='${max_price}',min_price='${min_price}'
WHERE id='${pId}' `,function (err, result, fields) {
   if(err) throw err;
if(result){
  res.redirect('/dashboard/packages');
}

  });
 });
}
});

//  packages basic
app.get('/dashboard/packages/basic', (req, res) => {
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  connection.connect( function (err) {
    connection.query( `SELECT * FROM package_basic`, 
    function (err,result_package_basic_admin, fields) {
    res.render(__dirname + "/dashboard/views/packages-basic.ejs",
      {result_package_basic_admin});
  }); });
 }
//});
});

// add packages basic
app.post('/package/basic/add', (req, res, error) => {
   
  let price =mysql.format(req.body.price);
  let type =mysql.format(req.body.type);
  let package_type =mysql.format(req.body.package_type);
  let addons =mysql.format(req.body.addons);
    
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  const packagePro = [price,type,package_type,addons];

  // inserting
   connection.query(`INSERT INTO package_basic(price,types,package_type,addons) 
          VALUES(?,?,?,?)`,packagePro,
        function(error,response) {
      //displaying error code
      if (error) {
       console.error(error);
      }
         if(response){

res.redirect('/dashboard/packages/basic');
            }
    
    });
  }
// end db
});


// delete package basic
app.get('/delete-package/basic/:id',  (req, res) => {
  let uId = req.params.id;
  
  connection.connect( function (err) {
    
   connection.query('DELETE FROM package_basic WHERE id='+uId, function (err, result, fields) {
    if(result){
      res.redirect('/dashboard/packages/basic');
     }
  });
 });
 
});
// 

// edit package
app.get('/edit-package/basic/:id',  (req, res) => {
  let pkId = req.params.id;
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
    // end 
    const pId={
      pkId:pkId
    };
    let id='';
    let price='';
    let type='';
    let package_type='';
    let addons='';

     connection.connect( function (err) {
   
      connection.query('SELECT * FROM package_basic WHERE id='+pkId, function (err, result, fields) {
        result.forEach((data)=>{
          id=data.id;
          price=data.price;
          type=data.types;
          package_type=data.package_type;
          addons=data.addons;
          
        });
        
        const package_basic={
          id:id,
          price:price,
          type:type,
          package_type:package_type,
          addons:addons,
        }
        
        res.render(__dirname + "/dashboard/views/package_edit_basic.ejs",
    
      {pId:pId,package_basic:package_basic});
    
      });}
    );

   
 
}
});
// 
// end





// show services
app.post('/package/basic/update', (req, res, error) => {
  let pId =req.body.id;
  let price =req.body.price;
  let type =req.body.type;
  let package_type =req.body.package_type;
  let addons =req.body.addons;
 
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
 
  connection.connect( function (err) {
   
connection.query(`UPDATE package_basic Set 
price='${price}',types='${type}',
package_type='${package_type}',addons='${addons}' 
WHERE id='${pId}' `,function (err, result, fields) {
   if(err) throw err;
if(result){
  res.redirect('/dashboard/packages/basic');
}

  });
 });
}
});




// end
//  packages pro
app.get('/dashboard/packages/pro', (req, res) => {
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  connection.connect( function (err) {
    connection.query( `SELECT * FROM package_pro`, 
    function (err,result_package_pro_admin, fields) {
    res.render(__dirname + "/dashboard/views/packages-pro.ejs",
      {result_package_pro_admin});
  }); });
 }
//});
});

// add packages pro
app.post('/package/pro/add', (req, res, error) => {
   
  let price =mysql.format(req.body.price);
  let type =mysql.format(req.body.type);
  let package_type =mysql.format(req.body.package_type);
  let addons =mysql.format(req.body.addons);
    
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  const packagePro = [price,type,package_type,addons];

  // inserting
   connection.query(`INSERT INTO package_pro(price,types,package_type,addons) 
          VALUES(?,?,?,?)`,packagePro,
        function(error,response) {
      //displaying error code
      if (error) {
       console.error(error);
      }
         if(response){

res.redirect('/dashboard/packages/pro');
            }
    
    });
  }
// end db
});


// delete package basic
app.get('/delete-package/pro/:id',  (req, res) => {
  let uId = req.params.id;
  
  connection.connect( function (err) {
    
   connection.query('DELETE FROM package_pro WHERE id='+uId, function (err, result, fields) {
    if(result){
      res.redirect('/dashboard/packages/pro');
     }
  });
 });
 
});
// 

// edit package pro
app.get('/edit-package/pro/:id',  (req, res) => {
  let pkId = req.params.id;
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
    // end 
    const pId={
      pkId:pkId
    };
    let id='';
    let price='';
    let type='';
    let package_type='';
    let addons='';

     connection.connect( function (err) {
   
      connection.query('SELECT * FROM package_pro WHERE id='+pkId, function (err, result, fields) {
        result.forEach((data)=>{
          id=data.id;
          price=data.price;
          type=data.types;
          package_type=data.package_type;
          addons=data.addons;
          
        });
        
        const package_pro={
          id:id,
          price:price,
          type:type,
          package_type:package_type,
          addons:addons,
        }
        
        res.render(__dirname + "/dashboard/views/package_edit_pro.ejs",
    
      {pId:pId,package_pro:package_pro});
    
      });}
    );

   
 
}
});
// 
// end





// show services
app.post('/package/pro/update', (req, res, error) => {
  let pId =req.body.id;
  let price =req.body.price;
  let type =req.body.type;
  let package_type =req.body.package_type;
  let addons =req.body.addons;
 
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
 
  connection.connect( function (err) {
   
connection.query(`UPDATE package_pro Set 
price='${price}',types='${type}',
package_type='${package_type}',addons='${addons}' 
WHERE id='${pId}' `,function (err, result, fields) {
   if(err) throw err;
if(result){
  res.redirect('/dashboard/packages/pro');
}

  });
 });
}
});









// end
//  packages premium
app.get('/dashboard/packages/premium', (req, res) => {
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  connection.connect( function (err) {
    connection.query( `SELECT * FROM package_premium`, 
    function (err,result_package_premium_admin, fields) {
    res.render(__dirname + "/dashboard/views/packages-premium.ejs",
      {result_package_premium_admin});
  }); });
 }
//});
});


// add packages basic
app.post('/package/premium/add', (req, res, error) => {
   
  let price =mysql.format(req.body.price);
  let type =mysql.format(req.body.type);
  let package_type =mysql.format(req.body.package_type);
  let addons =mysql.format(req.body.addons);
    
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  const packagePro = [price,type,package_type,addons];

  // inserting
   connection.query(`INSERT INTO package_premium(price,types,package_type,addons) 
          VALUES(?,?,?,?)`,packagePro,
        function(error,response) {
      //displaying error code
      if (error) {
       console.error(error);
      }
         if(response){

res.redirect('/dashboard/packages/premium');
            }
    
    });
  }
// end db
});


// delete package basic
app.get('/delete-package/premium/:id',  (req, res) => {
  let uId = req.params.id;
  
  connection.connect( function (err) {
    
   connection.query('DELETE FROM package_premium WHERE id='+uId, function (err, result, fields) {
    if(result){
      res.redirect('/dashboard/packages/premium');
     }
  });
 });
 
});
// 

// edit package
app.get('/edit-package/premium/:id',  (req, res) => {
  let pkId = req.params.id;
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
    // end 
    const pId={
      pkId:pkId
    };
    let id='';
    let price='';
    let type='';
    let package_type='';
    let addons='';

     connection.connect( function (err) {
   
      connection.query('SELECT * FROM package_premium WHERE id='+pkId, function (err, result, fields) {
        result.forEach((data)=>{
          id=data.id;
          price=data.price;
          type=data.types;
          package_type=data.package_type;
          addons=data.addons;
          
        });
        
        const package_premium={
          id:id,
          price:price,
          type:type,
          package_type:package_type,
          addons:addons,
        }
        
        res.render(__dirname + "/dashboard/views/package_edit_premium.ejs",
    
      {pId:pId,package_premium:package_premium});
    
      });}
    );

   
 
}
});
// 
// end



// show packages
app.post('/package/premium/update', (req, res, error) => {
  let pId =req.body.id;
  let price =req.body.price;
  let type =req.body.type;
  let package_type =req.body.package_type;
  let addons =req.body.addons;
 
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
 
  connection.connect( function (err) {
   
connection.query(`UPDATE package_premium Set 
price='${price}',types='${type}',
package_type='${package_type}',addons='${addons}' 
WHERE id='${pId}' `,function (err, result, fields) {
   if(err) throw err;
if(result){
  res.redirect('/dashboard/packages/premium');
}

  });
 });
}
});










//end
// add packages
app.post('/package/add', (req, res, error) => {
   
  let package_type =mysql.format(req.body.package_type);
  let type =mysql.format(req.body.type);
  let max_price =mysql.format(req.body.max_price);
  let min_price =mysql.format(req.body.min_price);
   
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  const packageName = [package_type,type,max_price,min_price,''];

  // inserting
   connection.query(`INSERT INTO packages(package_type,type,max_price,min_price,package_links) 
          VALUES(?,?,?,?,?)`,packageName,
        function(error,response) {
      //displaying error code
      if (error) {
       console.error(error);
      }
         if(response){

res.redirect('/dashboard/packages');
            }
    
    });
  }
// end db
});

// delete package
app.get('/delete-package/:id',  (req, res) => {
  let uId = req.params.id;
  
  connection.connect( function (err) {
   
   connection.query('DELETE FROM packages WHERE id='+uId, function (err, result, fields) {
    if(result){
      res.redirect('/dashboard/packages');
    }
  });
 });
 
});
// 


// edit package
app.get('/edit-package/:id',  (req, res) => {
  let pkId = req.params.id;
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
    // end 
    const pId={
      pkId:pkId
    };
    let id='';
    let package_type='';
    let type='';
    let min_price='';
    let max_price='';

     connection.connect( function (err) {
   
      connection.query('SELECT * FROM packages WHERE id='+pkId, function (err, result, fields) {
        result.forEach((data)=>{
          id=data.id;
          package_type=data.package_type;
          type=data.type;
          min_price=data.min_price;
          max_price=data.max_price;
          
        });
        
        const package={
          id:id,
          package_type:package_type,
          type:type,
          min_price:min_price,
          max_price:max_price,
        }
        
        res.render(__dirname + "/dashboard/views/package_edit.ejs",
    
      {pId:pId,package:package});
    
      });}
    );

   

 
}
});
// 



// package update
app.post('/package/update', (req, res, error) => {
  let pId =req.body.id;
  let package_type =req.body.package_type;
  let type =req.body.type;
  let min_price =req.body.min_price;
  let max_price =req.body.max_price;
 
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
 
  connection.connect( function (err) {
   
connection.query(`UPDATE packages Set package_type='${package_type}',type='${type}',min_price='${min_price}',max_price='${max_price}' 
WHERE id='${pId}' `,function (err, result, fields) {
   if(err) throw err;
if(result){
  res.redirect('/dashboard/packages');
} 

  });
 });
}
});


// delete users
app.get('/delete-users/:id',  (req, res) => {
  let uId = req.params.id;
  
connection.connect( function (err) {
   
   connection.query('DELETE FROM users WHERE id='+uId, function (err, result, fields) {
   });
 });


 res.redirect('/dashboard/registered-users');
});
// 


//will try is 
// truncate users
app.get('/truncate',  (req, res) => {
  let uId = req.params.id;
  
  connection.connect( function (err) {
   
   connection.query('TRUNCATE users', function (err, result, fields) {
   });

 });
 

 res.redirect('/dashboard/registered-users');
});
// 

// delete admin
app.get('/delete-admin/:id',  (req, res) => {
  let uId = req.params.id;
  
  connection.connect( function (err) {
   
   connection.query('DELETE FROM users WHERE id='+uId, function (err, result, fields) {
   });
 });
 

 res.redirect('/dashboard/admin');
});
// 




//admin account info
app.get('/dashboard/account', (req, res) => {
  let user_id='';
  let username='';
  let tel_house='';
  let telephone='';
  let region='';
  let address='';
  let house_no='';
  let email='';
  let password='';
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  connection.query(`SELECT * FROM users WHERE id=${adminSession.admin_id} LIMIT 1`,
  function (err, user, fields) {
 // fetch user

 try{
  user.forEach((userdata)=>{
    user_id=userdata.user_id;
    username=userdata.username;
    tel_house=userdata.tel_house;
    telephone=userdata.telephone;
    region=userdata.region;
    address=userdata.address;
    house_no=userdata.house_no;
    email=userdata.email;
    password=userdata.password;
   });

}catch(ex){
    //console.log("");
    }
  // currentAdmin data
  const currentAdminInfo = {
        
    id:user_id,
    username:username,
    tel_house:tel_house,
    telephone:telephone,
    region:region,
    address:address,
    house_no:house_no,
    email:email,
    password:password,
  }

 res.render(__dirname + "/dashboard/views/account.ejs",
      {currentAdminInfo});
});
 }
});
//  end

// admin  update
try {
  app.post('/admin/update', (req, res, error) => {
    let username =mysql.format(req.body.username);
    let tel_house =mysql.format(req.body.tel_house);
    let telephone =mysql.format(req.body.telephone);
    let region=mysql.format(req.body.region); 
    let address =mysql.format(req.body.address);
    let house_no=mysql.format(req.body.house_no);
    let email =mysql.format(req.body.email);
    let password =mysql.format(req.body.password);
    
    const updateUser = [username,tel_house,telephone,region,address
    ,house_no,email,password];
  
 
      if(adminSession.admin_id!=''){
    // inserting
     connection.connect( function (err) {
       
      connection.query(`UPDATE users Set username=?,tel_house=?,telephone=?,region=?,address=?,house_no=?,email=?,password=? 
      WHERE id='${adminSession.admin_id}'`,updateUser,function (err, result, fields) {
         if(err) throw err;
     
        res.redirect('/dashboard/account');
      
      
        });
       });

      }
      else{
        res.redirect('/account');
      }
// end db
  });
}
catch (ex) {
  res.redirect('/account');
}



//business account info
app.get('/dashboard/business/profile', (req, res) => {
  let id='';
  let name='';
  let address='';
  let phone='';
  let email='';
  let about='';
  let heading='';
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  connection.query(`SELECT * FROM businessinfo LIMIT 1`,
  function (err, businessinfo, fields) {
 // fetch user

 try{
  businessinfo.forEach((data)=>{
    id=data.id;
    name=data.name;
    phone=data.phone;
    address=data.address;
    email=data.email;
    about=data.about;
    heading=data.heading;
   });

}catch(ex){
    //console.log("");
    }
 
    const businessProfile={
        id:id,
        name:name,
        address:address,
        phone:phone,
        email:email,
        about:about,
        heading:heading,
    }



 res.render(__dirname + "/dashboard/views/businessProfile.ejs",
      {businessProfile:businessProfile});
});
 }
});
//  end



// business profile  update
try {
  app.post('/business/profile/update', (req, res, error) => {
    let id=mysql.format(req.body.id);
    let name =mysql.format(req.body.name);
    let phone =mysql.format(req.body.phone);
    let address=mysql.format(req.body.address);
    let email =mysql.format(req.body.email);
    let about =mysql.format(req.body.about);
    let heading =mysql.format(req.body.heading);

    const updateBusinessProfile = [name,phone,address,email,about,heading];
  
 
      if(adminSession.admin_id!=''){
    // inserting
     connection.connect( function (err) {
       
      connection.query(`UPDATE businessinfo Set name=?,phone=?,
      address=?,email=?,about=?,heading=?
      WHERE id='${id}'`,updateBusinessProfile,function (err, result, fields) {
         if(err) throw err;
      if(result){
        res.redirect('/dashboard/business/profile');
      } 
      
        });
       });

      }
      else{
        res.redirect('/account');
      }
// end db
  });
}
catch (ex) {
  res.redirect('/dashboard');
}




//business account info
app.get('/dashboard/add/address', (req, res) => {
 
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  
 res.render(__dirname + "/dashboard/views/businessProfileadd.ejs",
      {});
 }
});
//  end

//business account info
app.get('/dashboard/add/address', (req, res) => {
 
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  
 res.render(__dirname + "/dashboard/views/businessProfileadd.ejs",
      {});
 }
});
//  end


//end
//admin account info
app.get('/dashboard/add/admin', (req, res) => {
 
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  
 res.render(__dirname + "/dashboard/views/AdmiAdd.ejs",
      {});
 }
});
//  end

// add admin profile post
app.post('/dashboard/admin/add', (req, res, error) => {
  const dates = new Date();
  let username =mysql.format(req.body.username);
  let tel_house =mysql.format(req.body.tel_house);
  let telephone =mysql.format(req.body.telephone);
  let region=mysql.format(req.body.region); 
  let address =mysql.format(req.body.address);
  let house_no=mysql.format(req.body.house_no);
  let email =mysql.format(req.body.email);
  let password =mysql.format(req.body.password);
  let date_Created =dates;
  let userstatus=1;

  const currenUsernInfo = {

    username:username,
    tel_house:tel_house,
    telephone:telephone,
    region:region,
    address:address,
    house_no:house_no,
    email:email,
    password:password,
  }
  // 
  const neWuser = [username,tel_house,telephone,region,address
  ,house_no,email,password,userstatus,date_Created];

  connection.query(`SELECT * FROM users WHERE username ='${username}' AND password='${password}'`,
  function (err, user, fields) {
if(user.length==0){


// inserting
   connection.query(`INSERT INTO users(
         username,tel_house,telephone,region,address,house_no,email,
         password,userstatus,date_created) 
          VALUES(?,?,?,?,?,?,?,?,?,?)`,neWuser,
        function(error,response) {
      //displaying error code
      if (error) {
       console.error(error);
      }
         if(response){
       res.redirect('/dashboard/admin');
          }
    
    });
}
else{
  res.redirect('/dashboard/add/admin');
}
  });

// end db
});

//end
// add business profile post
app.post('/dashboard/address/add', (req, res, error) => {
   
    let name ='';
    let phone =mysql.format(req.body.phone);
    let address=mysql.format(req.body.address);
    let email =mysql.format(req.body.email);
    let about='';   
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  const BusinessProfile = [name,phone,address,email,about];

  // inserting
   connection.query(`INSERT INTO businessinfo(name,phone,address,email,about) 
          VALUES(?,?,?,?,?)`,BusinessProfile,
        function(error,response) {
      //displaying error code
      if (error) {
       console.error(error);
      }
         if(response){

res.redirect('/dashboard/business/profile');
            }
    
    });
  }
// end db
});
// end


//business account info
app.get('/dashboard/add/address', (req, res) => {
 
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  
 res.render(__dirname + "/dashboard/views/businessProfileadd.ejs",
      {});
 }
});
//  end

//end
// add business profile post
app.post('/dashboard/address/add', (req, res, error) => {
   
    let name ='';
    let phone =mysql.format(req.body.phone);
    let address=mysql.format(req.body.address);
    let email =mysql.format(req.body.email);
    let about='';   
  if(sessionKey.sessionId!=1){
    res.redirect('/account');
 }else{
  const BusinessProfile = [name,phone,address,email,about];

  // inserting
   connection.query(`INSERT INTO businessinfo(name,phone,address,email,about) 
          VALUES(?,?,?,?,?)`,BusinessProfile,
        function(error,response) {
      //displaying error code
      if (error) {
       console.error(error);
      }
         if(response){

res.redirect('/dashboard/business/profile');
            }
    
    });
  }
// end db
});

// logout adimin
app.get('/admin/logout', (req, res) => {
   req.session.destroy((err)=>{
    
       
      adminSession.adstatus='';
      adminSession.admin_id='';
      sessionKey.sessionId='';
      res.redirect('/account'); 
   });
   //req.session=null;

   console.log("db refreshed");
   
 });

// error response 404

app.use("",(req,res,next)=>{
  res.status(404).render(__dirname + "/views/partials/errors/404.ejs");
  next();
  
});
 
// port
//app.set('port',process.env.PORT || 3030);
const PORT =process.env.PORT || 3030 ;

app.listen(PORT,
  (req, res) => console.log(`Application is running on port ${PORT}`)
);


