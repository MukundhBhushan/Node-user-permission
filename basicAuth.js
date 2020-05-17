const { canViewProject } = require("./permissions/project")
const {ROLE} = require('./data.js')

function authUser(req,res,next){
    if(req.user==null){
        res.status(403)
        return res.send("U need to Sign in!!!")
    }
    next()
}

function authRole(role){
    return (req,res,next)=>{
        if(req.user.role != role){
            res.status(401)
            return res.send("Not Allowed")
        }
        next()
     }
}

function authGetProject(req,res,next){
    console.log(req.user,req.project)
    if(!canViewProject(req.user,req.project)){
      res.status(401)
      return res.send("Not allowed")
    }
    next();
}

function projectList(user,projects){
    if(user.role === ROLE.ADMIN) return projects
    return projects.filter(project => project.id == user.id)
}

module.exports = {
    authUser,
    authRole,
    authGetProject,
    projectList
}