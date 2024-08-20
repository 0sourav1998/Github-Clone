const path = require("path");
const fs = require("fs").promises;

exports.initRepo = async () => {
  const repoPath = path.resolve(process.cwd(), ".gitClone");
  const commitPath = path.join(repoPath, "commits");
  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitPath, { recursive: true });
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: process.env.S3_BUCKET })
    );
    console.log("Repo Initialised");
  } catch (err) {
    console.log("", err);
  }
};
