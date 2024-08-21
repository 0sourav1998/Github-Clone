exports.createRepository = async(req,res)=>{
    return res.send("Repository Created")
}

exports.getAllRepositories = async(req,res)=>{
    return res.send("All Repository Fetched")
}

exports.fetchRepositoryById = async(req,res)=>{
    return res.send("Repository Fetched using Id")
}

exports.fetchRepositoryByName = async(req,res)=>{
    return res.send("Repository Fetched using Name")
}

exports.fetchRepositoriesByCurrentUser = async(req,res)=>{
    return res.send("Repository fetched for login user")
}

exports.updateRepository = async(req,res)=>{
    return res.send("Repository Updated")
}

exports.deleteRepository = async(req,res)=>{
    return res.send("Repository Deleted")
}

exports.toggleVisibilityById = async(req,res)=>{
    return res.send("Visibility")
}