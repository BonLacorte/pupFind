// controllers/lostItemController.js
const asyncHandler = require("express-async-handler");
const LostItem = require("../models/LostItem");
const Chat = require("../models/Chat")
const cloudinary = require("../utils/cloudinary");

//@description     Create new LostItem report
//@route           POST /api/lostitems
//@access          Protected
const createLostItem = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { itemName, dateFound, locationFound, itemDescription } = req.body;

    if (!itemName  || !dateFound || !selectedLocation || !itemDescription) {
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
                folder: "products",
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

    const newLostItem = {
        itemName,
        itemImage: req.body.image,
        dateFound: parsedDateFound,
        locationFound,
        itemDescription,
        founderId: req.user._id,
        ownerId: null,
        reportStatus: req.body.reportStatus || "Claimable",
    };

    console.log(newLostItem)
    // console.log(parsedDateFound)

    try {
        const lostItem = await LostItem.create(newLostItem);
        res.json(lostItem);
    } catch (error) {
        res.status(400);
        throw new Error(`${error.message} I am at controller`);
    }
});

//@description     Search for LostItems
//@route           GET /api/lostitems
//@access          Public
const getLostItemInfo  = asyncHandler(async (req, res, next) => {

    try {
        console.log(req.params)
        const { id } = req.params

        const report = await LostItem.findById(id).populate("founderId", "name pic email phoneNumber facebookLink twitterLink membership specification")
        .populate("ownerId", "name pic email phoneNumber facebookLink twitterLink membership specification").exec()

        // Confirm if report exists
        if(!report) {
            return res.status(400).json({ message: 'Report not found' });
            
        }
        
        res.json(report);   
    } catch(error) {
        console.log(`${error} Hello`)
        // next(error);
    }

});

//@description     Search for LostItems with Pagination
//@route           GET /api/lostitems
//@access          Public
const getAllLostItems = asyncHandler(async (req, res) => {
    const { search, reportStatus, dateFound, page } = req.query;
    let lostItems;

    const query = {};
    const itemsPerPage = 2;
    const currentPage = parseInt(page) || 1; // Get the requested page, default to 1 if not provided

    if (search) {
        const keyword = {
            $or: [
                { itemName: { $regex: search, $options: "i" } },
                { itemDescription: { $regex: search, $options: "i" } },
            ],
        };
        query.$and = [keyword];
    }

    if (reportStatus && ["Claimable", "Processing"].includes(reportStatus)) {
        query.reportStatus = reportStatus;
    }

    // Filter by dateFound if provided
    if (dateFound) {
        // Convert the dateFound to a JavaScript Date object
        const startDate = new Date(dateFound);
        const endDate = new Date(dateFound);

        // Set the time of the endDate to the end of the day (23:59:59)
        endDate.setHours(23, 59, 59);

        // Create a date range for the query
        query.dateFound = { $gte: startDate, $lte: endDate };
    }

    try {
        // Calculate the skip value to skip the appropriate number of items based on the page
        const skip = (currentPage - 1) * itemsPerPage;

        // Apply the query parameters, skip, and limit to the find operation
        lostItems = await LostItem.find(query)
            .populate("founderId", "name pic email phoneNumber facebookLink twitterLink membership specification")
            .populate("ownerId", "name pic email phoneNumber facebookLink twitterLink membership specification")
            .skip(skip) // Skip the first (currentPage-1)*itemsPerPage items
            .limit(itemsPerPage); // Limit the results to itemsPerPage

        console.log(lostItems)
        res.json(lostItems);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});


//@description     Update LostItem report
//@route           PUT /api/lostitems/:id
//@access          Protected
const updateLostItem = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    const { itemName, dateFound, locationFound, itemDescription } = req.body;

    if (!itemName || !dateFound || !locationFound || !itemDescription) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    try {
        const lostItem = await LostItem.findById(req.params.id);

        if (!lostItem) {
            res.status(404);
            throw new Error("Lost item not found");
        }

        // Check if the user updating the report is the owner

        // if (!lostItem.founder.equals(req.user._id)) {
        //     res.status(403);
        //     throw new Error("You are not authorized to update this lost item report");
        // }

        let images = [];

            if (typeof req.body.image === "string") {
                images.push(req.body.image);
            } else {
                images = req.body.image;
            }
            console.log('images before delete:',images)

            // // Delete the old images from cloudinary
            if (images.length > 0){
                if (lostItem.itemImage !== undefined && lostItem.itemImage.length > 0){
                    for (let i = 0; i < lostItem.itemImage.length; i++) {
                        console.log(lostItem.itemImage[i])
                        console.log("delete", i)
                        await cloudinary.uploader.destroy(lostItem.itemImage[i].public_id);
                    }
                }
                console.log('images after delete',images)
                let imagesLinks = [];
                
                console.log('Does images have public_id:', images.some(image => image.hasOwnProperty('public_id')));

                // Upload images to cloudinary
                if (images.some(image => image.hasOwnProperty('public_id') === false)) {
                    for (let i = 0; i < images.length; i++) {
                        const result = await cloudinary.uploader.upload(images[i], {
                            folder: "lostItems",
                        });
                    
                        imagesLinks.push({
                            public_id: result.public_id,
                            url: result.secure_url,
                        });

                    }
                } else {
                    console.log('imagesLinks before',imagesLinks);
                    imagesLinks = images;
                    console.log('imagesLinks before',imagesLinks);
                }

                req.body.image = imagesLinks;
            } else {
                console.log("lostItem.itemImage",lostItem.itemImage)
                req.body.image = lostItem.itemImage;
                console.log("req.body.image",req.body.image)
            }

        
        const parsedDateFound = new Date(dateFound);

        // Update the lost item report fields
        lostItem.itemName = itemName;
        lostItem.dateFound = parsedDateFound;
        lostItem.locationFound = locationFound;
        lostItem.itemDescription = itemDescription;
        lostItem.itemImage = req.body.image

        const updatedLostItem = await lostItem.save();

        res.json(updatedLostItem)

    } catch (error) {
        res.status(400);
        //throw new Error(`${error.message} I am at controller`);
        next(error)
    }
});

// Function to cancel the lost item process
const cancelLostItemProcess = async (req, res) => {
    console.log(req.body)
    try {
        const { chatId } = req.body;
        const lostItemId = req.params.id;

        // Find the chat by ID
        const chat = await Chat.findById(chatId);
        
        // Find the lost item by ID
        const lostItem = await LostItem.findById(lostItemId);

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found.' });
        }

        // Check if the requesting user is the group admin (founder)

        console.log("founder of lostItem", lostItem.founderId.toString())
        console.log("req.user._id", req.user._id.toString())

        if (lostItem.founderId.toString() !== req.user._id.toString()) {
            console.log("Access denied.")
            return res.status(403).json({ message: 'Access denied.' });
        }


        if (!lostItem) {
            return res.status(404).json({ message: 'Lost item not found.' });
        }

        // Update the process history
        lostItem.processHistory.push({ chat: chatId, status: 'cancelled', timestamp: new Date()});

        // Update reportStatus and other fields as needed
        lostItem.reportStatus = 'Claimable';
        lostItem.meetupAccepted = false;
        lostItem.meetupTime = null;
        lostItem.meetupPlace = null;

        // Save the changes
        await lostItem.save();

        res.status(200).json({ message: 'Process cancelled successfully.' });
    } catch (error) {
        console.error('Error cancelling process:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Function to finish the lost item process
const finishLostItemProcess = async (req, res) => {
    console.log(req.body)
    try {
        const { chatId } = req.body;
        const lostItemId = req.params.id;

        // Find the chat by ID
        const chat = await Chat.findById(chatId);

        // Find the lost item by ID
        const lostItem = await LostItem.findById(lostItemId);

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found.' });
        }

        if (lostItem.founderId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        if (!lostItem) {
            return res.status(404).json({ message: 'Lost item not found.' });
        }

        // Update the process history
        lostItem.processHistory.push({ chat: chatId, status: 'success', timestamp: new Date() });

        // Update reportStatus and other fields as needed
        lostItem.reportStatus = 'Claimed';
        lostItem.meetupAccepted = false;
        lostItem.meetupTime = null;
        lostItem.meetupPlace = null;

        // Set the ownerId as the user who finished the process
        lostItem.ownerId = req.user._id;
        
        // Save the changes
        await lostItem.save();

        res.status(200).json({ message: 'Process finished successfully.' });
    } catch (error) {
        console.error('Error finishing process:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { createLostItem, getAllLostItems, updateLostItem, getLostItemInfo, cancelLostItemProcess, finishLostItemProcess, };
