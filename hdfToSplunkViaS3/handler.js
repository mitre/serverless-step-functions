'use strict';

const aws = require('aws-sdk')
const my_state_machine_arn = os.environ['MY_STATE_MACHINE_ARN']

// module.exports.hello = function main(event, context, callback) {
//   const stepFunctions = new aws.StepFunctions()
//   stepfunctions.startExecution(params, (err, data) => {
//     if (err) {
//     console.log(err);
//     };
//     }

module.exports.hello = (event, context, callback) => {
  console.log(event)

  const params = { // Takes my env arn
    stateMachineArn: my_state_machine_arn,
    input: JSON.stringify({})
  };

  const stepfunctions = new aws.StepFunctions()
  
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
}