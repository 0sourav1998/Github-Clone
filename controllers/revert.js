const fs = require("fs");
const path = require("path") ;
const { promisify } = require("util")

const readdir = promisify(fs.readdir) ;
const copyFile = promisify(fs.copyFile) ;
exports.revertRepo = async(commitId)=>{
    const repoPath = path.resolve(process.cwd(),".gitClone") ;
    const commitPath = path.join(repoPath,"commits");
    try{
        const commitDir = path.join(commitPath,commitId);
        const files = await readdir(commitDir);
        const parentDir = path.resolve(repoPath,"..");
        for(let file of files){
            await copyFile(path.join(commitDir,file),path.join(parentDir,file))
        }
        console.log(`Commit with ${commitId} reverted successfully`)
    }catch(error){

    }
}