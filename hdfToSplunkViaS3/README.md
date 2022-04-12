# hdfToSplunkViaS3

## Input and Output Arguments
### Input Environment Variables
#### `COMMAND_STRING_INPUT` (Required)

Command string to be executed by SAF CLI. The action will run `saf <COMMAND_STRING_INPUT> -i <latest_file_from_bucket>`.
NOTE: The `COMMAND_STRING_INPUT` should not specify the input file flag because it will be appended to the command after getting the file from the s3 bucket.

Example:

* `convert hdf2splunk -H 127.0.0.1 -u admin -p Valid_password! -I hdf`
* More examples can be found at [SAF CLI Usage](https://github.com/mitre/saf#usage)
* NOTE: This action does not support `view heimdall`.

### Output

As determined by input command.

## Secrets

This action does not use any secrets at this time.

## Example

See the `serverless.yml` file for details. 


## Contributing, Issues and Support

### Contributing

Please feel free to look through our issues, make a fork and submit PRs and improvements. We love hearing from our end-users and the community and will be happy to engage with you on suggestions, updates, fixes or new capabilities.

### Issues and Support

Please feel free to contact us by **opening an issue** on the issue board, or, at [saf@mitre.org](mailto:saf@mitre.org) should you have any suggestions, questions or issues.

### NOTICE

© 2022 The MITRE Corporation.

Approved for Public Release; Distribution Unlimited. Case Number 18-3678.

### NOTICE

MITRE hereby grants express written permission to use, reproduce, distribute, modify, and otherwise leverage this software to the extent permitted by the licensed terms provided in the LICENSE.md file included with this project.

### NOTICE

This software was produced for the U. S. Government under Contract Number HHSM-500-2012-00008I, and is subject to Federal Acquisition Regulation Clause 52.227-14, Rights in Data-General.

No other use other than that granted to the U. S. Government, or to those acting on behalf of the U. S. Government under that Clause is authorized without the express written permission of The MITRE Corporation.

For further information, please contact The MITRE Corporation, Contracts Management Office, 7515 Colshire Drive, McLean, VA 22102-7539, (703) 983-6000.
