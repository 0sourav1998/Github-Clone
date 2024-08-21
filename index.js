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
