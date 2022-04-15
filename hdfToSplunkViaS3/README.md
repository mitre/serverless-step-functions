# hdfToSplunkViaS3
This service deploys all the necessary AWS infrastructure components to send an HDF file to a Splunk instance. The Step Functions workflow is triggered by uploading an HDF file to an S3 bucket.

![hdfToSplunkViaS3](https://user-images.githubusercontent.com/11844975/163587603-a3d507c6-b02c-4720-9da9-a1d438db09d5.png)

## To Use
### Pre-requisites
- AWS CLI must be installed
- AWS credentials must be available
- [Base installation](https://github.com/mitre/serverless-step-functions/tree/main#readme) steps must be completed
### Follow the example-specific instructions below:
1. Configure your AWS credentials. [Recommended method](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) is to add a profile in the `~/.aws/credentials` file and then export that profile:
```bash
export AWS_PROFILE=<your_creds_profile_name>

# To ensure your access to AWS, run:
aws s3 ls
```
2. Set the S3 bucket name that you would like to upload your HDF file to
```bash
export BUCKET=<bucket-name>
```
3. Set your SAF CLI command that you would like to run. Reference: [SAF CLI Usage](https://github.com/mitre/saf#usage)
```bash
export COMMAND_STRING_INPUT="convert hdf2splunk -H 127.0.0.1 -u admin -p Valid_password! -I your_index_name"
```
Note: Do not include the input flag in the command string, ex: "-i hdf_file.json"

4. Optional step: If your AWS environment requires IAM roles to be created at a specific path with a permissions boundary, export the following variables and uncomment sections of the `serverless.yml` file. Do not uncomment the sections unless required by your AWS environment.
```bash
export IAM_ROLE_PATH=</role/path/>
export IAM_ROLE_BOUNDARY=<arn:aws:iam::${aws:accountId}:policy/permissions-boundary-policy>
```
5. Ensure that the environment variables are set properly
```bash
env
```
6. Deploy the service
```bash
sls deploy --verbose
```
7. When the service is deployed successfully, log into the AWS console and upload your HDF file into the `bucket-name` that your exported in step 2.


### Expected Output
The service will run `saf <COMMAND_STRING_INPUT> -i <latest_file_from_bucket>` and the output will be determined by that command.
For the `convert hdf2splunk` command, the service will convert the uploaded HDF file and send the data to your Splunk instance.

---

## Authors
* Emily Rodriguez - [em-c-rod](https://github.com/em-c-rod)
* Shivani Karikar - [karikarshivani](https://github.com/karikarshivani)

## Special Thanks
* Aaron Lippold - [aaronlippold](https://github.com/aaronlippold)
* Yarick Tsagoyko - [yarick](https://github.com/yarick)

---

### Contributing

Please feel free to look through our issues, make a fork and submit PRs and improvements. We love hearing from our end-users and the community and will be happy to engage with you on suggestions, updates, fixes or new capabilities.

### Issues and Support

Please feel free to contact us by **opening an issue** on the issue board, or, at [saf@mitre.org](mailto:saf@mitre.org) should you have any suggestions, questions or issues.

---

### NOTICE

© 2022 The MITRE Corporation.

Approved for Public Release; Distribution Unlimited. Case Number 18-3678.

### NOTICE

MITRE hereby grants express written permission to use, reproduce, distribute, modify, and otherwise leverage this software to the extent permitted by the licensed terms provided in the LICENSE.md file included with this project.

### NOTICE

This software was produced for the U. S. Government under Contract Number HHSM-500-2012-00008I, and is subject to Federal Acquisition Regulation Clause 52.227-14, Rights in Data-General.

No other use other than that granted to the U. S. Government, or to those acting on behalf of the U. S. Government under that Clause is authorized without the express written permission of The MITRE Corporation.

For further information, please contact The MITRE Corporation, Contracts Management Office, 7515 Colshire Drive, McLean, VA 22102-7539, (703) 983-6000.
