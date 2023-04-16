const {
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const sendToBucket = async (content) => {
  const bucketName = "node-sdk-sample";

  const keyName = "test.json";

  const client = new S3Client({
    apiVersion: "2006-03-01",
    endpoint: "http://localhost:8000/",
    signatureVersion: "v4",
    region: "us-east-1",

  });

  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: keyName,
    Body: content,
  });

  try {
    await client.send(putCommand);
    console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  } catch (err) {
    console.error(err, err.stack);
  }
};

module.exports = sendToBucket;
