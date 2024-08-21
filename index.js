const express = require("express");
const app = express() ;
const cors = require("cors") ;
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const http = require("http")
require("dotenv").config();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { describe } = require("yargs");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

yargs(hideBin(process.argv))
.command("start","start a new server", {} , startServer)
  .command("init", "Initialise a git repo", {}, initRepo)
  .command(
    "add <file>",
    "Add file to the staging area",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv)=>{
      addRepo(argv.file)
    }
  )
  .command(
    "commit <message>",
    "commit changes",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit your changes",
        type: "string",
      });
    },
    (argv)=>{
      commitRepo(argv.message)
    }
  )
  .command("push", "Push commits to S3", {}, pushRepo)
  .command("pull", "Pull commits from S3", {}, pullRepo)
  .command(
    "revert commitId",
    "revert changes",
    (yargs) => {
      yargs.positional("commitId", {
        describe: "commitId to revert to",
        type: "string",
      });
    },
    (args)=>{
      revertRepo(args.commitId)
    }
  )
  .demandCommand(1, "You need atleast one command")
  .help().argv;


  async function startServer(){
    const PORT = process.env.PORT || 4000 ;
    app.use(bodyParser.json());
    app.use(express.json());
    const Mongo_Url = process.env.MONGO_URL;

    await mongoose.connect(Mongo_Url).then(()=>console.log("DB Connected Successfully")).catch(()=>console.log("Error While Connecting With Mongo DB")) ;

    app.use(cors({origin : "*"})) ;
    
    app.get("/",(req,res)=>{
      return res.send("Welcome")
    })
    app.listen(PORT,()=>{
      console.log(`App is listening to PORT : ${PORT}`)
    })
  }