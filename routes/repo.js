const express = require("express");
const router = express.Router() ;

const {createRepository , getAllRepositories , fetchRepositoryById , fetchRepositoryByName , fetchRepositoriesByCurrentUser ,updateRepository , deleteRepository , toggleVisibilityById} = require("../controllers/repoController")

router.post("/createRepository",createRepository) ;
router.get("/getAllRepositories",getAllRepositories) ;
router.get("/owner/:id",fetchRepositoryById) ;
router.get("/name/:name",fetchRepositoryByName) ;
router.get("/fetchRepositoriesByCurrentUser",fetchRepositoriesByCurrentUser) ;
router.put("/updateRepository/:id",updateRepository) ;
router.delete("/deleteRepository/:id",deleteRepository) ;
router.patch("/toggleVisibilityById/:id",toggleVisibilityById)

module.exports = router ;