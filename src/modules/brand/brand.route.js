const express = require('express');
const brandRouter = express.Router() ;
const brandController = require('./brand.controller')

brandRouter.get('/',brandController.getBrandController) ;

brandRouter.post('/',brandController.createBrandController) ;

brandRouter.patch('/:id',brandController.updateBrandController) ;

brandRouter.delete('/:id',brandController.deleteBrandController) ;

module.exports = brandRouter ;