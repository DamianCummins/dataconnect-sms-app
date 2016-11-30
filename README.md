# IBM Data Connect SMS Application Node.js example

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/DamianCummins/dataconnect-smsapp)

This example node.js application exposes a single API route /api/runActivity/<activityId>

The example IBM Data Connect SMS application (https://www.hackster.io/damian-cummins/run-an-ibm-data-connect-activity-via-sms-bc56c5) uses the IFTTT Maker service that does not support authenticated web requests. To make the example more secure, the Maker web request should call this application deployed in Bluemix and bound to the IBM Data Connect instance.

### Legal statement

The dataconnect-sms-app application is a sample application which demonstrates data load using the IBM DataWorks service. The program is made available under the Apache license, Version 2.0. The program interfaces with the IBM DataWorks service, which is made available under separate IBM license.