exports.fetchAllUser = async(req,res)=>{
    return res.send("All user fetched Successfully")
}

exports.fetchUser = async(req,res)=>{
    return res.send("Fetch a User")
}

exports.updateUser =async(req,res)=>{
    return res.send("User Updated")
}

exports.deleteUser = async(req,res)=>{
    return res.send("User Deleted")
}

exports.signUp = async(req,res)=>{
    return res.send("Signed Up")
}

exports.login = async(req,res)=>{
   return res.send("Login In")
}
