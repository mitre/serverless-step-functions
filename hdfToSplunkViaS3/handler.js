'use strict';

const aws = require('aws-sdk')
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
const fs = require('fs');
const path = require("path");
const my_state_machine_arn = process.env.STATE_MACHINE_ARN

// StepFunctions example code
// module.exports.start = (event, context, callback) => {
//   const stateMachineArn = process.env.statemachine_arn;
//   const params = {
//     stateMachineArn
//   }

//   return stepfunctions.startExecution(params).promise().then(() => {
//     callback(null, `Your statemachine ${stateMachineArn} executed successfully`);
//   }).catch(error => {
//     callback(error.message);
//   });
// };

// Example 2
// var stepfunction = require('./stepfunction');
// var aws = require('aws-sdk');
// var parser = require('./parser');

// exports.handler = (event, context, callback) => { 

//   var statemachineArn = process.env.statemachine_arn;
//   var stepfunctions = new aws.StepFunctions();
  
//   stepfunction.startExecutionFromS3Event(stepfunctions, parser, statemachineArn , event);

//   callback(null, event);
    
// };

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
  console.log(event)
  const stepfunctions = new aws.StepFunctions();
  
  // try {
    // Get the object from the event
    const bucket = event.Records[0].s3.bucket.name;
    console.log("Bucket " + bucket);
    
    const key = decodeURIComponent(
      event.Records[0].s3.object.key.replace(/\+/g, " ")
      );
    console.log("key " + key);
      
    // READ PARAMS
    // const fileParameters = {
    //   Bucket: bucket,
    //   Key: key
    // };
    
    // To retrieve you need to use `await getObject()` or `getObject().then()`
    const myObject = await getObject(bucket, key);
    console.log("MY OBJECT");
    console.log(myObject);

      // let { ContentType, Body } = await s3.getObject(fileParameters).promise();
      // let HDF_FILE = path.resolve('/tmp/', params.Key.toString());
  // } catch(e) {
  //   console.log(e);
  // }

    const params = { // Takes my env arn
      stateMachineArn: my_state_machine_arn,
      input: "hello"
    };

  try {
    // event['Records'].forEach(record => {
      stepfunctions.startExecution(params, (err, data) => {
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
      })
    // });
  } catch (e) {
    console.log(e)
  }
}

// Test event
// {
//   "Records": ["Hello", "World"]
// }

module.exports.saf = (event, context, callback) => {
  console.log("Event" + JSON.stringify(event));
  console.log("Context" + JSON.stringify(context));
  // const saf = require('@mitre/saf');
  // const file = 
  // const command_string = "view -i summary -i "
  // saf.run()

  callback(null, 'Completed saf function call.');
};