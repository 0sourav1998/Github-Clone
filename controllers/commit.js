const fs = require("fs").promises ;
const path = require("path") ;
const { v4 : uuidv4 } = require("uuid") ;

exports.commitRepo=async(message)=>{
    console.log("hello")
    const repoPath = path.resolve(process.cwd(),".gitClone");
    const stagedPath = path.join(repoPath,"staging");
    const commitPath = path.join(repoPath,"commits");
    try{
        const commitId = uuidv4();
        const commitDir = path.join(commitPath,commitId);
        await fs.mkdir(commitDir,{recursive:true});
        const files = await fs.readdir(stagedPath);
        for(let file of files){
            await fs.copyFile(
                path.join(stagedPath,file),
                path.join(commitDir,file)
            )
        }
        await fs.writeFile(path.join(commitDir,"commit.json"),JSON.stringify({message : message , date :new Date().toISOString()}));
        console.log(`Commit Made with a Commit Id : ${commitId} and Message :${message}`)
    }catch(error){
        console.log(`Error while Commiting`)
    }
}