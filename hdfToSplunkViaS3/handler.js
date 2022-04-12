'use strict';

const aws = require('aws-sdk');
const my_state_machine_arn = process.env.STATE_MACHINE_ARN;


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

  const params = {
    stateMachineArn: my_state_machine_arn,
    input: JSON.stringify(fileParameters)
  };

  try {
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
    console.log(e)
  }
};