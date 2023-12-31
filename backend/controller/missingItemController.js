const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chat")
const cloudinary = require("../utils/cloudinary");
const MissingItem = require("../models/MissingItem");

//@description     Create new LostItem report
//@route           POST /api/lostitems
//@access          Protected
const createMissingItemReport = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { itemName, dateLost, possibleLocationLost, itemDescription } = req.body;

    if (!itemName  || !dateLost || !possibleLocationLost || !itemDescription) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    // // Uploading Images
    let images = [];

    if (typeof req.body.image === "string") {
        images.push(req.body.image);
    } else {
        images = req.body.image;
    }

    const imagesLinks = [];

    if (images !== []) {
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "Missing Item Report",
            });
        
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
    
    } else {
        imagesLinks.push({
            public_id: '',
            url: '',
        });
    }

    req.body.image = imagesLinks;

    // console.log(req.body.image )

    // Convert the dateFound string to a Date object
    const parsedDateFound = new Date(dateFound);

    const newMissingItem = {
        itemName,
        itemImage: req.body.image,
        dateLost: parsedDateFound,
        possibleLocationLost,
        itemDescription,
        ownerId: req.user._id,
        reportStatus: req.body.reportStatus || "Missing",
    };

    console.log(newMissingItem)
    // console.log(parsedDateFound)

    try {
        const missingItem = await MissingItem.create(newMissingItem);
        res.json(missingItem);
    } catch (error) {
        res.status(400);
        throw new Error(`${error.message} I am at controller`);
    }
});

module.exports = { createMissingItemReport };