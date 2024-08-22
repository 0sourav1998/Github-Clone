const express = require("express");
const router = express.Router();

const {fetchAllUser , fetchUser , updateUser , deleteUser , signUp ,login} = require("../controllers/userController")

router.get("/fetchAllUser",fetchAllUser) ;
router.get("/fetchUser/:id",fetchUser) ;
router.put("/updateUser/:id",updateUser) ;
router.delete("/deleteUser/:id",deleteUser) ;
router.post("/signUp",signUp) ;
router.post("/login",login)

module.exports = router ;