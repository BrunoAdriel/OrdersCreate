const { User, Business, Order } =require('../dao')

const orderDAO = new Order()
const userDAO = new User()
const businessDAO = new Business()

module.exports = {

    getOrders: async (_,res) => {
        const orders = await orderDAO.getOrders()
        if(!orders){
            return res.sendError('Somethin went wrong!')
        }
        res.sendSuccess(orders)
    },

    getOrdersById: async (req,res) => {
        const id = req.params.id
        const order = await orderDAO.getBusinessById(id)
        if(!order){
            return order === false
            ? res.sendError ({ message:'Not Found!'}, 404)
            : res.sendError ({ message:'Something went wrong!'})
        }
        res.sendSuccess(order)
    },

    createOrder: async (req,res) => {
        const { user, business, products}= req.body

        const userObject = await userDAO.getUsersById(user)
        const businessObject = await businessDAO.getBusinessById(business)

        const productsInBusiness = businessObject.products.filter(e => products.includes(e.id))
        const totalPrice = productsInBusiness.reduce((acc, p)=>{
            acc += p.price
            return acc
        }, 0)

        const order = await orderDAO.createOrder({
            number: Date.now(),
            totalPrice,
            products: productsInBusiness,
            status: 'pending',
            business,
            user
        })
        
        if(!order){
            return res.sendError('Something went wrong!')
        }

        const userOrders = userObject.orders || []
        userOrders.push(order._id)
        await userDAO.updateUser(user, {orders: userOrders})

        return res.sendSuccess(order)
    },

    resolveOrder: async (req,res) => {
        const {resolve} =req.query
        let order = await orderDAO.getOrdersById(req.params.oid)
        order.status = resolve
        await orderDAO.resolveOrder(order._id, order)
        res.send({status:"success", result:"Order resolved"})
    },


}