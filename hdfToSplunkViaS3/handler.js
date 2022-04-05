'use strict';

const aws = require('aws-sdk')

module.exports.saf = (event, context, callback) => {
  console.log("Here is the event: " + JSON.stringify(event));
  console.log("Here is the event: " + JSON.stringify(context));
  const saf = require('@mitre/saf');
  // saf.run()
  const S3= new aws.S3();
  try {
    console.log(`Hi from Node.js ${process.version} on Lambda!`);
    // Converted it to async/await syntax just to simplify.
    const data = await S3.getObject({Bucket: 'sls-uploads-bucket', Key: '******'}).promise();
    const fileResponse = {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  }
  catch (err) {
    const fileResponse = {
      statusCode: err.statusCode || 400,
      body: err.message || JSON.stringify(err.message)
    }
  }
  const command_string = "view -i summary -i "
  callback(null, 'Completed saf function call.');
};