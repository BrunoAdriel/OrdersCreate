const express = require('express')

/**
 * 
 * @type {express.RequestHandler}
 */


const configureCustomResponses = ( _, res, next ) =>{
    res.sendSuccess = (payload, code= 200) => res.status(code).json({status: 'seccess', payload})
    res.sendError = (payload, code= 500) => res.status(code).json({status: 'error', payload})
    next()
}

module.exports ={ configureCustomResponses }