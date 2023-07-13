const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const cloudinary = require("../utils/cloudinary");

// @desc Create new user
// @route POST /users
// @access Private
const register = asyncHandler(async (req, res, next) => {

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

    
    try {
        // // Uploading avatar
        // let avatar = [];

        // if (typeof req.body.avatar === "string") {
        //     avatar.push(req.body.avatar);
        // } else {
        //     avatar = req.body.avatar;
        // }

        // const avatarLinks = [];

        // console.log(avatar.length)

        // // If req.body.avatar is not empty, upload to cloudinary
        // if (avatar !== []) {
        //     for (let i = 0; i < avatar.length; i++) {
        //         const result = await cloudinary.uploader.upload(avatar[i], {
        //             folder: "users",
        //         });
            
        //         avatarLinks.push({
        //             public_id: result.public_id,
        //             url: result.secure_url,
        //         });
        //     }
        // } 
        // else { // If req.body.avatar is empty, push empty object to avatarLinks
        //     avatarLinks.push({
        //         public_id: '',
        //         url: '',
        //     });
        // }

        // req.body.avatar = avatarLinks;

        // Hash password 
        const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
        req.body.password = hashedPwd;

        // Create and store new user 
        const user = await User.create(req.body)

        res.status(201).json(user)
        
    } catch (error) {
        console.log(error);
        next(error);
    }
})


// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res, next) => {
    
    try {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ email }).exec()

    if (!foundUser) {                                                                 // CHANGE THIS, BASED ON WHAT WE WILL INCLUDE IN THE USER MODEL
        return res.status(401).json({ message: `Unauthorized Hello1 ${email}, ${password} ` })
    }

    const match = await bcrypt.compare(password, foundUser.password)
    console.log(email, password, match)
    if (!match) {
        return res.status(401).json({ message: `Unauthorized Wrong Password ${email}, ${password} ` })
    } 

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "id": foundUser._id,
                "email": foundUser.email,
                "roles": foundUser.roles,
                "firstname": foundUser.firstname,
                "lastname": foundUser.lastname,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { 
            "email": foundUser.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // const { password, ...others } = foundUser._doc;
    // res.status(200).json({ message: 'Login successful', others})

    // Send accessToken containing username and roles 
    res.json({ accessToken })
    
    } catch (error) {
        console.log(error);
        next(error);    
    }
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res, next) => {
    try {
        const cookies = req.cookies
        console.log(cookies)
        console.log("cookies hello")
        if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized 1' })

        const refreshToken = cookies.jwt

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            asyncHandler(async (err, decoded) => {
                if (err) return res.status(403).json({ message: 'Forbidden' })

                const foundUser = await User.findOne({ email: decoded.email }).exec()

                if (!foundUser) return res.status(401).json({ message: 'Unauthorized 2' })

                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "id": foundUser._id,
                            "email": foundUser.email,
                            "roles": foundUser.roles,
                            "firstname": foundUser.firstname,
                            "lastname": foundUser.lastname,
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' }
                )

                res.json({ accessToken })
            })
        )
    } catch (error) {
        console.log(error);
        next(error);
    }
    
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    refresh,
    logout, 
    register
}