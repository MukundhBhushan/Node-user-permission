const { ROLE } = require('../data.js')


function canViewProject(user,project){
    return (
        user.role == ROLE.ADMIN ||
        user.id == project.id
    ) 
}


module.exports = {
    canViewProject
}