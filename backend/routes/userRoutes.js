const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const {verifyJWT} = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/new')
    .post(userController.createNewUser)

router.route('/new/new')
    .post(userController.createNewUserrr)

router.route("/:userId")
    .put(userController.updateUserProfile) // check
    .get(userController.getUserInfo)

router.route('/')
    .get(verifyJWT, userController.getAllUsers)

module.exports = router