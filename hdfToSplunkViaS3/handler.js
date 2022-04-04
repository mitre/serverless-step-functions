'use strict';

const aws = require('aws-sdk')
const my_state_machine_arn = process.env.STATE_MACHINE_ARN

// module.exports.hello = function main(event, context, callback) {
//   const stepFunctions = new aws.StepFunctions()
//   stepfunctions.startExecution(params, (err, data) => {
//     if (err) {
//     console.log(err);
//     };
//     }


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

module.exports.hello = (event, context, callback) => {
  console.log(event)
  
  const params = { // Takes my env arn
    stateMachineArn: my_state_machine_arn,
    input: JSON.stringify({})
  };

  const stepfunctions = new aws.StepFunctions()
  
  try {
    event['Records'].forEach(record => {
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
    });
  } catch (e) {
    console.log(e)
  }
}

// Test event
// {
//   "Records": ["Hello", "World"]
// }