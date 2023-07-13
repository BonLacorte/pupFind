const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const {verifyJWT, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyJWT')

router.use(verifyJWT)

// // Customer
// router.route('/users/:id/orders')
//     .get(verifyTokenAndAuthorization, usersController.getUserOrders) // check

// router.route('/users/:id')
//     .patch(verifyTokenAndAuthorization, usersController.updateUser) // check
//     .get(verifyTokenAndAuthorization, usersController.getUserInfo)  // check

// // Admin

// router.route('/admin/users/orders')
     

// router.route('/admin/users')
//     .get(verifyTokenAndAdmin, usersController.getAllUsers)       // check
    

// router.route('/admin/users/new')
//     .post(verifyTokenAndAdmin, usersController.createNewUser)

// router.route('/admin/users/stats')
//     .get(verifyTokenAndAdmin, usersController.getUserStats)

// router.route('/admin/users/:id')
//     .patch(verifyTokenAndAdmin, usersController.updateUser)     // check    
//     .delete(verifyTokenAndAdmin, usersController.deleteUser)    // check
//     .get(verifyTokenAndAdmin, usersController.getUserInfo)      // check





// Customer
router.route('/users/:id/orders')
    .get(usersController.getUserOrders) // check

router.route('/users/:id')
    .patch(usersController.updateUser) // check
    .get(usersController.getUserInfo)  // check

// Admin

router.route('/admin/users/orders')


router.route('/admin/users')
    .get(usersController.getAllUsers)       // check
    

router.route('/admin/users/new')
    .post(usersController.createNewUser)

router.route('/admin/users/stats')
    .get(usersController.getUserStats)

router.route('/admin/users/:id')
    .patch(usersController.updateUser)     // check    
    .delete(usersController.deleteUser)    // check
    .get(usersController.getUserInfo)      // check

module.exports = router
