const { Business } = require('../dao')
const BusinessDAO =new Business()

module.exports = {

    getBusiness: async (_,res) => {
        const result = await BusinessDAO.getBusinesses()
        if(!result){
            return res.sendError({ message: 'Something went wrong!'})
        }
        res.sendSuccess(result)
    },

    getBusinessById: async (req,res) => {
        const id = req.params.id
        const business = await BusinessDAO.getBusinessById(id)
        if(!business){
            return business === false
            ? res.sendError ({ message:'Not Found!'}, 404)
            : res.sendError ({ message:'Something went wrong!'})
        }
        res.sendSuccess(business)
    },

    createBusiness: async (req,res) => {
        const businessData = req.body
        const business = await BusinessDAO.saveBusiness(businessData)
        if(!business){
            return res.sendError({ message: 'Something went wrong!'})
        }
        res.sendSuccess(business)
    },

    addProduct: async (req,res) => {
        const id = req.params.id
        const product = req.body
        const business = await BusinessDAO.getBusinessById(id)
        business.products.push(product)
        const result = await BusinessDAO.updateBusiness(id, {products: business.products})

        if(!result){
            return res.sendError({ message: 'Something went wrong!'})
        }
        res.sendSuccess({product, message: ' Product added!'})
    },
}