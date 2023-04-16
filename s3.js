const { S3 } = require("@aws-sdk/client-s3");

// Create unique bucket name
var bucketName = "node-sdk-sample-5";
// Create name for uploaded object key
var keyName = "hello_world.txt";

// Create a promise on S3 service object
var bucketPromise = new S3({
  apiVersion: "2006-03-01",
  region: "us-west-1",
  endpoint: "http://localhost:8000/",
  signatureVersion: "v4",
}).createBucket({ Bucket: bucketName });

// Handle promise fulfilled/rejected states
bucketPromise
  .then(function (data) {
    // Create params for putObject call
    var objectParams = {
      Bucket: bucketName,
      Key: keyName,
      Body: "Hello World!",
    };
    // Create object upload promise
    var uploadPromise = new S3({
      endpoint: "http://localhost:8000/",
      apiVersion: "2006-03-01",
      signatureVersion: "v4",
    }).putObject(objectParams);

    uploadPromise.then(function (data) {
      console.log(
        "Successfully uploaded data to " + bucketName + "/" + keyName
      );
    });
  })
  .catch(function (err) {
    console.error(err, err.stack);
  });
