const express = require("express");
const router = express.Router() ;

const {createIssue , deleteIssue , updateIssue , fetchAllIssues , fetchIssueById} = require("../controllers/issueController")


router.post("/createIssue",createIssue);
router.delete("/deleteIssue",deleteIssue)
router.put("/updateIssue",updateIssue)
router.get("/fetchAllIssues",fetchAllIssues)
router.get("/fetchIssueById",fetchIssueById)

module.exports = router ;