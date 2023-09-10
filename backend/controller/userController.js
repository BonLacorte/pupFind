const User = require('../models/User')
// const Order = require('../models/Order')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const cloudinary = require("../utils/cloudinary");

//@description     Get or Search all users
//@route           GET /user?search=
//@access          Public
const getAllUsers = asyncHandler(async (req, res) => {
    // console.log(req.params);
    // console.log(req.body);  // req.body is name
    // console.log(req.query.search);
    // console.log(`getAllUsers ${req.user}`)
    const keyword = req.query.search
    ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
        }
    : {};

    // const users = await User.find(keyword);
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    // const users = await User.find(keyword).find({ name: { $ne: req.body.name } });
    res.send(users);
});


// @desc Get user info in admin
// @route GET /user/:id
// @access Private
const getUserInfo = asyncHandler(async (req, res, next) => {
    try {
        // const { userId } = req.params
        console.log('getUserInfo', req.params)

        const user = await User.findById(req.params.userId).select('-password').lean().exec()

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


// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        // // Confirm data
        // if (!name || !password || !email) {
        //     return res.status(400).json({ message: 'All fields are required' })
        // }
    
        // // Check for duplicate email
        // const duplicate = await User.findOne({ email }).lean().exec()
    
        // if (duplicate) {
        //     return res.status(409).json({ message: 'Duplicate email' })
        // }

        // let pic = [];

        // if (typeof req.body.pic === "string") {
        //     avatar.push(req.body.pic);
        // } else {
        //     avatar = req.body.pic;
        // }

        // const picLinks = [];

        // console.log(pic.length)

        // if (pic !== []) {
        //     for (let i = 0; i < pic.length; i++) {
        //         const result = await cloudinary.uploader.upload(pic[i], {
        //             folder: "users",
        //         });
            
        //         picLinks.push({
        //             public_id: result.public_id,
        //             url: result.secure_url,
        //         });
        //     }

        // } else {
        //     picLinks.push({
        //         public_id: '',
        //         url: '',
        //     });
        // }

        // req.body.pic = picLinks;

        // // Hash password 
        // const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
        // req.body.password = hashedPwd;

        // // Create and store new user 
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


// @desc Create new user
// @route POST /users
// @access Private
const createNewUserrr = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password, pic } = req.body
        console.log(req.body)
        console.log('Hi',pic)

        // Confirm data
        if (!name || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (!pic || pic === '') {
            req.body.pic = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            console.log('Hello',req.body.pic)
        }
    
        // Check for duplicate email
        const duplicate = await User.findOne({ email }).lean().exec()
    
        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate email' })
        }

        let pics
        let picsLinks;

        if (req.body.pic !== "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
            // for (let i = 0; i < pic.length; i++) {

            if (typeof req.body.pic === "string") {
                pics = req.body.pic
            } else {
                pics = req.body.pic;
            }
                console.log("HELLOOOOOOO")
                const result = await cloudinary.uploader.upload(pics, {
                    folder: "users",
                });
            
                // req.body.pic = result.secure_url

                picsLinks = {
                    public_id: result.public_id,
                    url: result.secure_url,
                };
                
                console.log(picsLinks)

                req.body.pic = picsLinks;
            // }

        } else {
            // req.body.pic = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            
            console.log('else', req.body.pic)
            picsLinks = {
                public_id: null,
                url: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            };
            console.log('picsLinks',picsLinks)
            console.log('req.body.pic',req.body.pic)

            
        }

        

        // Hash password 
        const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
        req.body.password = hashedPwd;


        picsLinks;

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            pic: picsLinks,
        };
        
        console.log('newUser',newUser)

        // // Create and store new user 
        const user = await User.create(newUser)

        res.status(201).json({ 
            success: true, 
            user
        })
        
    } catch (error) {
        console.log(error);
        next(error);
    }
})


// @desc Update user profile
// @route PUT /users/:userId
// @access Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
    try {
        const { phoneNumber, facebookLink, twitterLink, specification, membership} = req.body
        console.log(req.body)
        let user = await User.findById(req.params.userId);
        console.log(user)

        let pics;

        let picsLinks;

        pics = req.body.pic;

        // Check for updated picture
        if (pics.length > 0){
            if (user.pic !== undefined && user.pic.length > 0){
                
                // Delete current picture
                await cloudinary.uploader.destroy(user.pic.public_id);
            }

            if (pics.hasOwnProperty('public_id') === false) {
                // Upload new picture to Cloudinary
                const result = await cloudinary.uploader.upload(pics, {
                    folder: "users",
                });

                picsLinks = {
                    public_id: result.public_id,
                    url: result.secure_url,
                };
            } else {
                // console.log("picsLinks",picsLinks)
                picsLinks = pics;
                // console.log("req.body.pic",picsLinks)
            }
            
            req.body.pic = picsLinks;
        } else {
            console.log("user.pic",user.pic)
            req.body.pic = user.pic;
            console.log("req.body.pic",req.body.pic)
        }
        
        

        // Update user profile
        user.phoneNumber = phoneNumber;
        user.facebookLink = facebookLink;
        user.twitterLink = twitterLink;
        user.specification = specification;
        user.membership = membership;
        user.pic = req.body.pic

        // user.pic = req.body.pic;
        const updatedUser = await user.save();

        res.json(updatedUser );

    } catch (error) {
        console.log(error);
        next(error);
    }
});


// @desc Claim LostItem
// @route PUT /api/users/claim/:lostItemId
// @access Private
const claimLostItem = asyncHandler(async (req, res) => {
    const lostItemId = req.params.lostItemId;
    const { meetupPlace, meetUpTime } = req.body;

    if (!meetupPlace || !meetUpTime) {
        return res.status(400).json({ message: "meetupPlace and meetUpTime are required" });
    }

    try {
        const lostItem = await LostItem.findById(lostItemId);

        if (!lostItem) {
            return res.status(404).json({ message: "Lost item not found" });
        }

        if (String(lostItem.owner) !== String(req.user._id)) {
            return res.status(403).json({ message: "You are not the owner of this lost item" });
        }

        if (lostItem.reportStatus) {
            return res.status(400).json({ message: "Lost item is already claimed" });
        }

        lostItem.owner = req.user._id;
        lostItem.meetupPlace = meetupPlace;
        lostItem.meetUpTime = meetUpTime;

        await lostItem.save();

        res.json({ success: true, message: "Lost item claimed successfully", lostItem });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error claiming the lost item", error: error.message });
    }
});

module.exports = {
    getAllUsers,
    createNewUser,
    createNewUserrr,
    getUserInfo,
    updateUserProfile
}