require("dotenv").config();
const { S3Client} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: "eu-north-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.ACCESS_SECRET_KEY
    }
});
const S3_BUCKET = "demoapnabucket";

module.exports = { s3, S3_BUCKET };