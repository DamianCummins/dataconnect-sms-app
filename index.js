'use strict';

var https = require('https');
var express = require('express');
var app = express();

// get VCAP services
var bluemixHelperConfig = require("bluemix-helper-config");
var global = bluemixHelperConfig.global;
var vcapServices = bluemixHelperConfig.vcapServices;

var dwService = vcapServices.getService("dataworks");	
var url = require('url').parse( dwService.credentials.url );
var userId = dwService.credentials.userid;
var password = dwService.credentials.password;

console.log(url);

//var port = process.env.PORT || 3030;
var port = 3030;

// API ROUTES
// =========================================================================
var router = express.Router();

// middeware to use for all requests
router.use(function(req, res, next) {
	// log request
	console.log(new Date().toUTCString() + ' LOG Router request ' + req.method + " " + req.url);
	next(); // move on to the next route
});

// Get http://localhost:3030/api/
router.get('/', function (req, res) {
  res.json({ message: 'smsApp is running!'});
});

router.route('/runActivity/:activityId')
	// POST a runActivity  (POST http://localhost:3030/api/runActivity/<activityId>)
	.post(function(req, res){
		var id = req.params.activityId;
		var runActivityAPI = "/activities/v1/" + id + "/activityRuns";

		var agent = new https.Agent({
			host: url.hostname,
			port: 443,
			path: url.pathname + runActivityAPI,
			rejectUnauthorized: false
		});

		var postOptions = {
		  hostname: url.hostname,
		  port: 443,
		  path: url.pathname + runActivityAPI,
		  method: 'POST',
		  agent: agent,
		  headers: {
		  	'Authorization': 'Basic ' + new Buffer(userId + ":" + password).toString('base64'),
		  	'Content-Length': '0'
		  }
		};

		https.request(postOptions, function(response) {
		  response.setEncoding("utf-8");
		  var responseString = '';
		  response.on("data", function (data) {
			responseString += data;
		  });

		  response.on("end", function() {	
			try {
		        var json = JSON.parse(responseString);
				res.json(json);
		    } catch(e) {
		        console.err(e);
		    }
		  });
		}).end();
	});

// REGISTER ROUTES -----------------------
// all routes prefixed with /api/
app.use('/api', router);

app.listen(port, function () {
  console.log('Data Connect Sms app listening on port '+port+'!');
});