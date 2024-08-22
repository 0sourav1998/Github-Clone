const User = require("../models/user");
const Repositories = require("../models/repo");
const Issues = require("../models/issues");

exports.createRepository = async (req, res) => {
  const { owner, name, description, content, visibility, issues } = req.body;
  try {
    if (!owner || !name) {
      return res.status(400).json({
        success: false,
        message: "These Fileds are required",
      });
    }
    const repositories = new Repositories({
      owner,
      name,
      description,
      content,
      visibility,
      issues,
    });

    await repositories.save();

    return res.status(201).json({
      success: true,
      message: "Repo Created Successfully",
      repositories,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went wrong while Creating the Repo",
    });
  }
};

exports.getAllRepositories = async (req, res) => {
  try {
    const allRepos = await Repositories.find({})
      .populate("owner")
      .populate("issues");
    return res.status(200).json({
      success: true,
      message: "All Repos Fetched Successfully",
      allRepos,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went wrong while Fetching Repos",
    });
  }
};

exports.fetchRepositoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const Repo = await Repositories.findById({ _id: id })
      .populate("owner")
      .populate("issues");
    if (!Repo) {
      return res.status(404).json({
        success: false,
        message: "Repository Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Repo Fetched Successfully",
      Repo
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went wrong while Fetching Repo",
    });
  }
};

exports.fetchRepositoryByName = async (req, res) => {
    try {
        const { name } = req.params;
        const Repo = await Repositories.findOne({ name: name })
          .populate("owner")
          .populate("issues");
        if (!Repo) {
          return res.status(404).json({
            success: false,
            message: "Repository Not Found",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Repo Fetched Successfully",
          Repo
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Something Went wrong while Fetching Repo",
        });
      }
};

exports.fetchRepositoriesByCurrentUser = async (req, res) => {
  try{
    const userId = req.user.id ;
    if(!userId){
        return res.status(400).json({
            success : false ,
            message : "User is not logged in"
        })
    }
    const repository = await Repositories.find({owner : userId});
    if(!repository){
        return res.status(404).json({
            success : false ,
            message : "Repository Not Found"
        })
    }
    return res.status(200).json({
        success : true ,
        message : "Repository Fetched",
        repository
    })
  }catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went wrong while Fetching Repo",
    });
  }
};

exports.updateRepository = async (req, res) => {
  try{
    const {id} = req.params ;
    const {description , content} = req.body ;
    const repository = await Repositories.findById(id);
    if(!repository){
        return res.status(404).json({
            success : false ,
            message : "Repository Not Found"
        })
    }
    const updatedRepo =  await Repositories.findByIdAndUpdate(id,{
        description : description ,
        $push : {content : content}
    }) ;
    return res.status(200).json({
        success : true ,
        message : "Repo Updated",
        updatedRepo
    })
  }catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went wrong while updating Repo",
    });
  }
};

exports.deleteRepository = async (req, res) => {
  try{
    const {id} = req.params ;
    await Repositories.findByIdAndDelete(id)
    return res.status(true).json({
        success : true ,
        message : "Repo Deleted Successfully"
    })
  }catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went wrong while deleting Repo",
    });
  }
};

exports.toggleVisibilityById = async (req, res) => {
  try{
    const {id} = req.params ;
    const repository = await Repositories.findById(id);
    if(repository){
        return res.status(404).json({
            success : false ,
            message : "Repo Not Found"
        })
    }
    repository.visibility = !repository.visibility;
    const updatedRepo = await repository.save();
    return res.status(200).json({
        success : true ,
        message : "Repo Visibility Toggled Successfully",
        updatedRepo
    })
  }catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went wrong while toggling Repo",
    });
  }
};
