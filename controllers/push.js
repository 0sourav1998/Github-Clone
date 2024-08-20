const fs = require("fs").promises;
const path = require("path") ;
const {s3 , S3_BUCKET} = require("../config/aws-config")
const { PutObjectCommand } = require("@aws-sdk/client-s3");

exports.pushRepo=async()=>{
    const pathRepo = path.resolve(process.cwd(),".gitClone") ;
    const commitRepo = path.join(pathRepo,"commits");
    try{
        const commitDirs = await fs.readdir(commitRepo);
        for(let commitDir of commitDirs){
            const commitPath = path.join(commitRepo,commitDir);
            const files = await fs.readdir(commitPath)
            for(let file of files){
                const filePath = path.join(commitPath,file) ;
                const fileContent = await fs.readFile(filePath) ;
                const params = {
                    Bucket : S3_BUCKET ,
                    Key : `commits/${commitDir}/${file}`,
                    Body : fileContent
                }
                const command = new PutObjectCommand(params);
                await s3.send(command);
            }
        }
        console.log("Commits push to the S3 Bucket")
    }catch(error){
        console.log(`Error while pushing`,error)
    }
}