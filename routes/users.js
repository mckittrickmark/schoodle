"use strict";


const express = require('express');
const router  = express.Router();

module.exports = (dataHelpers) => {

  router.get("/", (req, res) => {
    res.status(201).send();
  });

  router.post('/new',(req,res)=>{
    res.status(201).send(); //send a response back, changes are done in app.js using ajax
});
  router.post('/new/event',(req,res)=>{
    res.status(201).send(); //send a response back, changes are done in app.js using ajax
});
 router.post('/new/date',(req,res)=>{
  console.log('in date page');
  res.status(201).send(); //send a response back, changes are done in app.js using ajax
});
 // /api/user/new/creator
router.post('/new/creator',(req,res)=>{

  let shorturl = generateRandomShortUrl();

  //use helper function to store into database
  let eventObj=req.body;

    dataHelpers.addEmail(eventObj, function (err, result) {
      if (err) {
        console.log(err)
      }
      dataHelpers.addEvent(eventObj, result, function (err, result2) {
        if (err) {
          console.log(err)
        }
        dataHelpers.addDates(eventObj, result2, function(err, result3) {
          console.log("It Got Here", result3)
        })
      })

    })



  //res.app.locals.shorturl = shorturl;

  // res.redirect(201,'/api/users/' + shorturl);
  //send shorturl with a response


  res.json(shorturl).status(201).send();

 })

// /api/users/:shorturl
router.get('/new/:shorturl', (req,res)=>{

  //pull data from database using shorturl

  res.render('shorturl');
})





function generateRandomShortUrl(){
  return Math.random().toString(36).replace('0.','').slice(0,8);
}

  return router;
}
