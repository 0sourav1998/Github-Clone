
const fs = require("fs").promises;
const path = require("path") ;

exports.addRepo=async(filePath)=>{
    const repoPath = path.resolve(process.cwd(),".gitClone") ;
    const stagingPath = path.join(repoPath,"staging");
    try{
        await fs.mkdir(repoPath, {recursive : true}) ;
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath,path.join(stagingPath,fileName)) ;
        console.log("added to the staging area")
    }catch(error){
        console.log(`Error While adding the file`)
    }
}