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

module.exports.stateMachineTrigger = async (event, context, callback) => {
  const stepfunctions = new aws.StepFunctions();
  
  const bucket = event.Records[0].s3.bucket.name;
  console.log("Bucket " + bucket);
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
    );
  console.log("key " + key);
    
  // READ PARAMS
  const fileParameters = {
    Bucket: bucket,
    Key: key
  };
  
  // const s3BucketObjectContents = await getObject(bucket, key);
  // console.log("s3BucketObjectContents");
  // console.log(s3BucketObjectContents);

  const params = {
    stateMachineArn: my_state_machine_arn,
    input: JSON.stringify(fileParameters)
  };

  try {
    console.log("TRY TO START STATE MACHINE EXECUTION");
    // event['Records'].forEach(record => {
      await stepfunctions.startExecution(params, async (err, data) => {
        console.log("STARTING STATE MACHINE WITH PARAM INPUT " + params.input);
        if (err) {
        console.log(err);
        const response = {
            statusCode: 500,
            body: JSON.stringify({
            message: 'There was an error'
            })
        };
        callback(null, response);
        } else {
        console.log(data);
        const response = {
            statusCode: 200,
            body: JSON.stringify({
            message: 'Step function worked'
            })
        };
        callback(null, response);
        }
    }).promise();
  } catch (e) {
    console.log("FAILED TO START STATE MACHINE");
    console.log(e)
  }
  console.log("ENDED EXECUTION");
};