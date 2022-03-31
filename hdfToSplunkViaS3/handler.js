'use strict';

module.exports.hello = function main(event, context) {
  
  if (event.Records === null) {
    //context.fail('Error: Event has no records.')
    console.log(JSON.stringify(event))
    return
  }
  console.log(JSON.stringify(event))
  return
}