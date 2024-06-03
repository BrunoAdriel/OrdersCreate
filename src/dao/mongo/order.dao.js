const OrderModel = require('./models/orders.model')


class OrderDAO{

    async getOrders(){
        try{
            const orders = await OrderModel.find()
            return orders.map(a => a.toObject())
        }catch(err){
            console.error(err)
            return null
        }
    }

    async getOrdersById(id){
        try{
            const order = await OrderModel.findById(id)
            return order?.toObject() ?? false
        }catch(err){
            console.error(err)
            return null
        }
    }

    async createOrder(order){
        try{
            const savedOrder = await OrderModel.create(order)
            return savedOrder.toObject()
        }catch(err){
            console.error(err)
            return null
        }
    }
    
    async resolveOrder(id, status){
        try{
            const result = await OrderModel.updateOne({_id: id}, {$set: { status }})
            return result
        }catch(err){
            console.error(err)
            return null
        }
    }

}

module.exports = { OrderDAO }