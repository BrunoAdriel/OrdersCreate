const { Router } = require('express')
const { getBusinessById, getBusiness, createBusiness, addProduct } = require('../controllers/business.controller')


module.exports = async () =>{
    const router = Router()

    router.get('/', getBusiness)
    router.get('/:id', getBusinessById)
    router.post('/', createBusiness)
    router.post('/:id/products', addProduct)

    return router
}