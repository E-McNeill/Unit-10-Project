'use strict';

const express = require('express');
const User = require("../models").User;
var validator = require('validator');
var bcryptjs = require('bcryptjs');
const auth = require('basic-auth');


// Authenticates the user info

const authenticateUser = (req, res, next ) => {
    let message = null;
    const credentials = auth(req);
    if (credentials) {
     User.findOne({where: {emailAddress : credentials.name}}).then( user => {

      if (user){
      const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
      // const authenticated = (credentials.pass, user.password);

      if (authenticated || credentials.pass === user.password ) {
        console.log(`Authentication successful for username: ${user.emailAddress}`);
        req.currentUser = user;
        next();
      } else {
        console.log(`Authentication failure for username: ${user.emailAddress}`);
        const err = new Error(`Authentication failure for username: ${user.emailAddress}`);
        err.status = 401;
        next(err);
  
  
      }
      } else {
        // console.log(`User not found for username: ${JSON.stringify(credentials)}`);
        console.log(`User not found for username: ${credentials.pass}`);

        const err = new Error(`User not found for username: ${credentials.name}`);
        err.status = 401;
        next(err);
      }
    })
      } 
      else {
        console.log('Auth header not found');
        const err = new Error(`Access Denied`);
        err.status = 401;
        next(err);
      }
    }
  
    module.exports = authenticateUser