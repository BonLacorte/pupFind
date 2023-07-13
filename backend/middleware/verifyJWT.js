const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.token // req.headers['authorization'] || req.headers['Authorization'] || 

    if (!authHeader.startsWith('Bearer ')) {         // .startsWith('Bearer ')
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.email = decoded.UserInfo.email
            req.roles = decoded.UserInfo.roles
            req.id = decoded.UserInfo.id
            req.user = decoded.UserInfo
            req.firstname = decoded.UserInfo.firstname
            req.lastname = decoded.UserInfo.lastname
            
            next()
        }
    )
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyJWT(req, res, () => {
        if (req.roles.includes('admin') || req.roles.includes('Admin') || req.user.id === req.params.id) {
            next()
        } else {
            res.status(403).json({ message: 'You are not allowed to do that!' })
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyJWT(req, res, () => {
    if (req.roles.includes('admin') || req.roles.includes('Admin')) {
        next();
    } else {
        res.status(403).json("You are not alowed to do that! You are not an admin");
    }
    });
};

module.exports = { verifyJWT, verifyTokenAndAuthorization, verifyTokenAndAdmin } 