const { S3Client, CreateBucketCommand } = require("@aws-sdk/client-s3");

// const bucketPolicy = require("./bucket_policy.json");

process.env["AWS_ACCESS_KEY_ID"] = "accessKey1";
process.env["AWS_SECRET_ACCESS_KEY"] = "verySecretKey1";

const bucketName = "node-sdk-sample";

const client = new S3Client({
  apiVersion: "2006-03-01",
  endpoint: "http://localhost:8000/",
  signatureVersion: "v4",
  region: "us-east-1",
});

const createCommand = new CreateBucketCommand({
  Bucket: bucketName,
});

// const putPolicyCommand = new PutBucketPolicyCommand({
//   Bucket: bucketName,
//   Policy:
//     '{"Version": "2006-03-01", "Statement": [{ "Sid": "AddPerm","Effect": "Allow","Principal": "*", "Action": [ "s3:PutObject","s3:GetObject"], "Resource": ["arn:aws:s3:::BUCKET/*" ] } ]}',
// });

const createBucket = async () => {
  try {
    await client.send(createCommand);
    // await client.send(putPolicyCommand);
    console.log(`Successfull create bucket${bucketName}`);
  } catch (err) {
    console.error(err, err.stack);
  }
};

createBucket();
