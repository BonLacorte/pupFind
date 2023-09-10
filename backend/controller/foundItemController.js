const asyncHandler = require("express-async-handler");
const FoundItem = require("../models/FoundItem");
const Chat = require("../models/Chat")
const cloudinary = require("../utils/cloudinary");

//@description     Create new LostItem report
//@route           POST /api/lostitems
//@access          Protected
const createFoundItemReport = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { itemName, dateFound, locationFound, itemDescription } = req.body;

    if (!itemName  || !dateFound || !locationFound || !itemDescription) {
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

    
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "Found Item Report",
            });
        
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
    
    

    req.body.image = imagesLinks;

    // console.log(req.body.image )

    // Convert the dateFound string to a Date object
    const parsedDateFound = new Date(dateFound);

    const newFoundItem = {
        itemName,
        itemImage: req.body.image,
        dateFound: parsedDateFound,
        locationFound,
        itemDescription,
        founderId: req.user._id,
        reportStatus: req.body.reportStatus || "Processing",
    };

    console.log(newFoundItem)
    // console.log(parsedDateFound)

    try {
        const foundItem = await FoundItem.create(newFoundItem);
        res.json(foundItem);
    } catch (error) {
        res.status(400);
        throw new Error(`${error.message} I am at controller`);
    }
});

module.exports = { createFoundItemReport };