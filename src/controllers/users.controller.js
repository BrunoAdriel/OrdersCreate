const { User } = require('../dao')
const { SaveUserResponse } = require('../dto/responses/saveUserResponse')
const { UserService } = require('../services/user.services')

const userDAO = new User()
const service = new UserService(userDAO)

module.exports = {

    getUsers: async (_,res) => {
        const users = await userDAO.getUsers()
        if(!users){
            return res.sendError('Somethin went wrong!')
        }
        res.sendSuccess(users)
    },

    getUsersById: async (req,res) => {
        const id = req.params.id
        const user = await userDAO.getUsersById(id)
        if(!user){
            return user === false
            ? res.sendError ({ message:'Not Found!'}, 404)
            : res.sendError ({ message:'Something went wrong!'})
        }
        res.sendSuccess(user)
    },

    saveUsers: async (req,res) => {
        const userData = req.body
        const user = await service.createUser(userData)
        if(!user){
            return res.sendError('Somethin went wrong!')
        }
        res.sendSuccess(new SaveUserResponse(user))
    }

}