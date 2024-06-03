const UserModel = require('./models/user.model')


class UserDAO{

    async getUsers(){
        try{
            const users = await UserModel.find()
            return users.map(a => a.toObject())
        }catch(err){
            console.error(err)
            return null
        }
    }

    async getUsersById(id){
        try{
            const user = await UserModel.findById(id)
            return user?.toObject() ?? false
        }catch(err){
            console.error(err)
            return null
        }
    }

    async saveUsers(user){
        try{user
            const savedUser = await UserModel.create(user)
            return savedUser.toObject()
        }catch(err){
            console.error(err)
            return null
        }
    }

    async updateUser(id, userData){
        try{
            const result = await UserModel.updateOne({_id: id}, {$set: userData})
            return result
        }catch(err){
            console.error(err)
            return null
        }
    }

}

module.exports = { UserDAO }