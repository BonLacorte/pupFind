const User = require('../models/User')
const Order = require('../models/Order')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const cloudinary = require("../utils/cloudinary");

// @desc Get all users in admin
// @route GET /admin/users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    
    const qNew = req.query.new;

    let users

    if (qNew) {
        users = await User.find().sort({ _id: -1 }).limit(1).select('-password').lean()
    } else {
        users = await User.find().select('-password').lean()
    }

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    return res.status(201).json(users)
})

// @desc Get user info in admin
// @route GET /users
// @access Private
const getUserInfo = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body

        const user = await User.findById(id).select('-password').lean().exec()

        // Confirm if user exists
        if(!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        return res.status(201).json(user)
    } 
    catch(error) {
        console.log(error);
        next(error);
    }
})


// @desc Get order history of customer in customer and admin
// @route GET users/orders
// @access Private
const getUserOrders = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body
    
        // Show all orders of user
        const orders = await Order.find({ user: id }).lean().exec()

        res.status(200).json(orders);
    } catch(error) {
        console.log(error);
        next(error);
    }
});


// @desc Get stats
// @route GET admin/users/stats
// @access Private
const getUserStats = asyncHandler(async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        console.log(lastYear);
        console.log(date);
        console.log(date.getFullYear());
        console.log("hello");
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json({data})
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res, next) => {
    try {
        const { firstname, lastname, email, password, roles, mobileNumber } = req.body

        // Confirm data
        if (!firstname || !password || !mobileNumber || !Array.isArray(roles) || !roles.length) {
            return res.status(400).json({ message: 'All fields are required' })
        }
    
        // Check for duplicate email
        const duplicate = await User.findOne({ email }).lean().exec()
    
        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate email' })
        }

        let avatar = [];

        if (typeof req.body.avatar === "string") {
            avatar.push(req.body.avatar);
        } else {
            avatar = req.body.avatar;
        }

        const avatarLinks = [];

        console.log(avatar.length)

        if (avatar !== []) {
            for (let i = 0; i < avatar.length; i++) {
                const result = await cloudinary.uploader.upload(avatar[i], {
                    folder: "users",
                });
            
                avatarLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

        } else {
            avatarLinks.push({
                public_id: '',
                url: '',
            });
        }

        req.body.avatar = avatarLinks;

        // Hash password 
        const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
        req.body.password = hashedPwd;

        // Create and store new user 
        const user = await User.create(req.body)

        res.status(201).json({ 
            success: true, 
            user
        })
        
    } catch (error) {
        console.log(error);
        next(error);
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res, next) => {
    // try {

    const { id, firstname, lastname, email, roles, mobileNumber, password } = req.body
    
    // // Available fields: firstname, lastname, password, mobilenumber, (id, roles is already included)
    // // Confirm data 
    // if (!id || !firstname || !Array.isArray(roles) || !roles.length ||  !mobileNumber) {  // 
    //     return res.status(400).json({ message: 'All fields except lastname and password are required' })
    // }

    // // Does the user exist to update?
    // let user = await User.findById(id)

    // if (!user) {
    //     return res.status(400).json({ message: 'User not found' })
    // }

    // // Check for duplicate 
    // const duplicate = await User.findOne({ email }).lean().exec()

    // // Allow updates to the original user 
    // if (duplicate && duplicate?._id.toString() !== id) {
    //     return res.status(409).json({ message: 'Duplicate email' })
    // }


    //      // update the user's avatar
    //     let avatar = [];

    //     if (typeof req.body.avatar === "string") {
    //         avatar.push(req.body.avatar);
    //     } else {
    //         avatar = req.body.avatar;
    //     }

    //     console.log(avatar);
    //     console.log(typeof avatar);

    //     // Delete the old avatar from cloudinary
    //     if (avatar !== undefined) {
    //         if (user.avatar !== undefined){
    //             console.log('i am on delete');
    //             for (let i = 0; i < user.avatar.length; i++) {
    //                 await cloudinary.uploader.destroy(user.avatar[i].public_id);
    //             }
    //         }

    //         let avatarLinks = []

    //         console.log('Does avatar have public_id:', avatar.some(avatarr => avatarr.hasOwnProperty('public_id')));

    //         // Upload the new avatar to cloudinary

    //         // If avatar does not have public_id, then it is new avatar. upload it to cloudinary
    //         if (avatar.some(avatarr => avatarr.hasOwnProperty('public_id') === false)) {
                
    //             console.log('i am on update');

    //             for (let i = 0; i < avatar.length; i++) {
    //                 const result = await cloudinary.uploader.upload(avatar[i], {
    //                     folder: "users",
    //                 });
                
    //                 avatarLinks.push({
    //                     public_id: result.public_id,
    //                     url: result.secure_url,
    //                 });

    //             }
    //         }
    //         // If avatar has public_id, then it is old avatar. just use the old avatar 
    //         else {
    //             console.log('avatarLinks before',avatarLinks);
    //             avatarLinks = avatar;
    //             console.log('avatarLinks after',avatarLinks);
    //         }

    //         req.body.avatar = avatarLinks;

    //         if (password) {
    //             // Hash password 
    //             req.body.password = await bcrypt.hash(password, 10) // salt rounds 
    //         }
    //     }
    //     user = await User.findByIdAndUpdate(id, req.body, {
    //         new: true,
    //         runValidators: true,
    //         useFindAndModify: false,
    //     });

    //     return res.status(200).json({ success: true })

    // } catch (error) {
    //     console.log(error);
    //     next(error);
    // }


    try {
        if (password) {
            // Hash password 
            req.body.password = await bcrypt.hash(password, 10) // salt rounds 
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({ success: true, updatedUser })
    } catch (error) {
        res.status(400).json({ message: 'User was not updated' })
        next(error);
    }


})


// @desc Update a user in admin
// @route PATCH /admin/users
// @access Private
//const updateUserAdmin = asyncHandler(async (req, res) => {})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body

        // Does the user exist to delete?
        let user = await User.findById(id)

        // Confirm if user exists
        if(!user) {
            return res.status(400).json({ message: 'User was not found' })
        }

        // // Delete the avatar from cloudinary
        // if (user.avatar !== undefined){
        //     for (let i = 0; i < user.avatar.length; i++) {
        //         await cloudinary.uploader.destroy(user.avatar[i].public_id);
        //     }
        // }

        // Delete the user from the database
        user = await user.deleteOne()

        return res.status(200).json({ success: true });

    } catch (error) {
        console.log(error);
        next(error);
    }
})


module.exports = {
    getAllUsers,
    getUserInfo,
    getUserOrders,
    getUserStats,
    createNewUser,
    updateUser,
    deleteUser,
}