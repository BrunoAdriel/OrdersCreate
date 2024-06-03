const { Router } = require('express')
const { createOrder, getOrders, getOrdersById, resolveOrder } = require('../controllers/orders.controller')

module.exports = async () =>{
    const router = Router()

    router.get('/', getOrders)
    router.get('/:id', getOrdersById)
    router.post('/', createOrder)
    router.put('/:id', resolveOrder)

    return router
}