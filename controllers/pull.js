const { ListObjectsV2Command , GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require("fs").promises
const path = require("path") ;
const {s3 , S3_BUCKET} = require("../config/aws-config") ;

exports.pullRepo = async()=>{
    const pathRepo = path.resolve(process.cwd(),".gitClone");
    const commitRepo = path.join(pathRepo,"commits");
    try{
        const data = await s3.send(new ListObjectsV2Command({
            Bucket:S3_BUCKET,
            Prefix:"commits/"
        }))
        const objects = data.Contents ;
        for(let object of objects){
            const key = object.Key ;
            const commitDir = path.join(
                commitRepo ,
                path.dirname(key).split("/").pop(),
            ) ;
            await fs.mkdir(commitDir,{recursive:true}) ;
            const getObjectCommand = new GetObjectCommand({Bucket : S3_BUCKET ,Key : key });
            const fileContent = await s3.send(getObjectCommand);
            await fs.writeFile(path.join(pathRepo,key),fileContent.Body)
        }
        console.log("Commit Pulled from S3 Bucket")
    }catch(error){

    }
}