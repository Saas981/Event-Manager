/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const crypto = require('crypto');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*")
  // res.header("Access-Control-Allow-Headers", "*")
  //   res.header('Access-Control-Allow-Methods',"OPTIONS, POST, GET")

  next()
});



function customEncrypt(data) {
  // Your custom encryption logic here
  const encryptedData = data.split('').reverse().join(''); // Example encryption (reverse the string)
  return encryptedData.slice(0, 8); // Take the first 8 characters for uniqueness
}

// Custom decryption function
function customDecrypt(encryptedData) {
  // Your custom decryption logic here
  const decryptedData = encryptedData.split('').reverse().join(''); // Example decryption (reverse the string)
  return decryptedData;
}

app.post('/item', function(req, res) {
  try {
    const { data } = req.body;
    const encryptedData = customEncrypt(data);
    res.json({ success: true, encryptedData });
  } catch (error) {
    console.error('Error encrypting data:', error);
    res.status(500).json({ success: false, error: 'Error encrypting data' });
  }
});

app.post('/ditem', function(req, res) {
  try {
    const { encryptedData } = req.body;
    const decryptedData = customDecrypt(encryptedData);
    res.json({ success: true, decryptedData });
  } catch (error) {
    console.error('Error decrypting data:', error);
    res.status(500).json({ success: false, error: 'Error decrypting data' });
  }
});

app.post('/decrypt', function(req, res) {
   try {
    const { encryptedData } = req.body;
    const decryptedData = customDecrypt(encryptedData);
    res.json({ success: true, decryptedData });
  } catch (error) {
    console.error('Error decrypting data:', error);
    res.status(500).json({ success: false, error: 'Error decrypting data' });
  }
});



/**********************
 * Example get method *
 **********************/

app.get('/items', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/encrypt', function(req, res) {
   try {
    const { data } = req.body;
    const encryptedData = customEncrypt(data);
    res.json({ success: true, encryptedData });
  } catch (error) {
    console.error('Error encrypting data:', error);
    res.status(500).json({ success: false, error: 'Error encrypting data' });
  }
});



/****************************
* Example put method *
****************************/

app.put('/items', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/items', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
