const express = require("express");
const router = express.Router() ;

const {createRepository , getAllRepositories , fetchRepositoryById , fetchRepositoryByName , fetchRepositoriesByCurrentUser ,updateRepository , deleteRepository , toggleVisibilityById} = require("../controllers/repoController")

router.post("/createRepository",createRepository) ;
router.get("/getAllRepositories",getAllRepositories) ;
router.get("/fetchRepositoryById",fetchRepositoryById) ;
router.get("/fetchRepositoryByName",fetchRepositoryByName) ;
router.get("/fetchRepositoriesByCurrentUser",fetchRepositoriesByCurrentUser) ;
router.put("/updateRepository",updateRepository) ;
router.delete("/deleteRepository",deleteRepository) ;
router.patch("/toggleVisibilityById",toggleVisibilityById)

module.exports = router ;