const { Router } = require('express')
const { getUsers, getUsersById, saveUsers } = require('../controllers/users.controller')


module.exports = async () =>{
    const router = Router()

    router.get('/', getUsers)
    router.get('/:id', getUsersById)
    router.post('/', saveUsers)

    return router
}