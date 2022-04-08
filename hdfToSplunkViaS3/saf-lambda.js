'use strict';

const aws = require('aws-sdk')
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
const fs = require('fs');
const path = require("path");
const my_state_machine_arn = process.env.STATE_MACHINE_ARN

async function getObject (bucket, objectKey) {
  try {
    const params = {
      Bucket: bucket,
      Key: objectKey 
    }

    const data = await s3.getObject(params).promise();

    return data.Body.toString('utf-8');
  } catch (e) {
    throw new Error(`Could not retrieve file from S3: ${e.message}`)
  }
}

module.exports.saf = async (event, context, callback) => {
  console.log("Event" + JSON.stringify(event));
  console.log("Context" + JSON.stringify(context));
  
  const bucket = event.Bucket;
  const key = event.Key;
  
  const s3BucketObjectContents = await getObject(bucket, key);
  console.log("s3BucketObjectContents");
  console.log(s3BucketObjectContents);
  
  // let HDF_FILE = path.resolve('/tmp/', params.Key.toString());
  
  const saf = require('@mitre/saf');
  // const file = 
  // const command_string = "view -i summary -i "
  // saf.run()

  callback(null, 'Completed saf function call.');
};