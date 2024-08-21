const express = require("express");
const router = express.Router();

const {fetchAllUser , fetchUser , updateUser , deleteUser , signUp ,login} = require("../controllers/userController")

router.get("/fetchAllUser",fetchAllUser) ;
router.get("/fetchUser",fetchUser) ;
router.put("/updateUser",updateUser) ;
router.delete("/deleteUser",deleteUser) ;
router.post("/signUp",signUp) ;
router.post("/login",login)

module.exports = router ;