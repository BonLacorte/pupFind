const asyncHandler = require("express-async-handler");
const Report = require("../models/Report");
const Chat = require("../models/Chat")
const cloudinary = require("../utils/cloudinary");
const mongoose = require('mongoose');


//@description     Search for LostItems with Pagination
//@route           GET /api/report
//@access          Public
const getAllReports = asyncHandler(async (req, res) => {
    const { search, reportType } = req.query;
    // console.log(req.query)

    const keywordFilter = search
        ? {
            $or: [
                { itemName: { $regex: search, $options: "i" } },
                { itemDescription: { $regex: search, $options: "i" } },
            ],
        }
        : {};

        console.log('keywordFilter', keywordFilter)
        const reportTypeFilter = reportType ? { reportType } : {};

        const filters = { ...keywordFilter, ...reportTypeFilter };
        console.log(filters)
        const reports = await Report.find({ ...filters}).populate("creatorId", "name pic email uid phoneNumber facebookLink twitterLink membership specification");
    
        // console.log(reports)
        res.send(reports);

    // try {
    //     // Fetch all reports from the database
    //     const reports = await Report.find().populate("creatorId", "name pic email uid phoneNumber facebookLink twitterLink membership specification");
        
    //     // Send the reports as a response
    //     res.json(reports);
    //     // console.log(reports)
    // } catch (error) {
    //     // Handle errors here
    //     res.status(500).json({ error: "Internal server error" });
    // }

})

//@description     Search for LostItems with Pagination
//@route           GET /api/report/creatorId
//@access          Public
const getAllReportsByUser = asyncHandler(async (req, res, next) => {
    
    // console.log(`getAllReportsByUser req.params.creatorId`,req.params.creatorId)
    try {
        const { creatorUid } = req.params; // Get the creatorId from the request body
    
        // Convert creatorId to ObjectId
        // console.log(`getAllReportsByUser creatorObjectId`, creatorId)
        // const creatorObjectId = new mongoose.Types.ObjectId(creatorId);
        // console.log(`getAllReportsByUser creatorObjectId`, creatorObjectId)

        // Find all reports where creatorId matches the provided creatorId
        let reports = await Report.find({})
            .populate({
                path: 'creatorId',
                select: 'pic name email membership specification facebookLink phoneNumber twitterLink uid',
            });
        console.log(`creatorUid`, req.params.uid)
        // console.log(`before`,reports)

        // Use creatorObjectId in the query
        const filteredReports = reports.filter((report) => {
            return (
                report.creatorId.uid.match(req.params.uid)
            );
        });

        // console.log(`after`,filteredReports)
        res.json(filteredReports);

    } catch (error) {
        console.error(error);
        next(error);
    }
})


// @desc Get user info in admin
// @route GET /user/:id
// @access Private
const getReportInfo = asyncHandler(async (req, res, next) => {
    try {
        // const { userId } = req.params
        // console.log('getReportInfo', req.params)

        const report = await Report.findById(req.params.reportId).populate("creatorId", "name pic email uid phoneNumber facebookLink twitterLink membership specification");

        // Confirm if user exists
        if(!report) {
            return res.status(400).json({ message: 'Report not found' })
        }

        console.log(report)
        return res.status(201).json(report)
    } 
    catch(error) {
        console.log(error);
        next(error);
    }
})


//@description     Create new LostItem report
//@route           POST /api/report
//@access          Protected
const createReport = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { itemName, date, location, itemDescription } = req.body;

    if (!itemName  || !date || !location || !itemDescription) {
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

    let imagesLinks = [];

    if (images !== null) {
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "Reports",
            });
        
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
    
    } else {
        imagesLinks = null
    }

    req.body.image = imagesLinks;

    // console.log(req.body.image )

    // Convert the dateFound string to a Date object
    const parsedDate = new Date(date);

    const newReport = {
        itemName,
        itemImage: imagesLinks,
        date: parsedDate,
        location,
        itemDescription,
        creatorId: req.body.creatorId,
        reportStatus: req.body.reportStatus,
        reportType: req.body.reportType
    };

    // console.log(newReport)
    // console.log(parsedDateFound)

    try {
        const report = await Report.create(newReport);
        res.json(report);
    } catch (error) {
        res.status(400);
        throw new Error(`${error.message} I am at controller`);
    }
});


// @desc Update user profile
// @route PUT /users/:userId
// @access Private
const updateReport = asyncHandler(async (req, res, next) => {
    try {
        console.log('update report')
        console.log(req.body)
        const { itemName, itemDescription, date, location, reportStatus } = req.body
        console.log(req.body)
        let report = await Report.findById(req.params.reportId);
        console.log(report)


        let images = [];

        if (typeof req.body.image === "string") {
            images.push(req.body.image);
        } else {
            images = req.body.image;
        }
        console.log('images before delete:',images)

        // // Delete the old images from cloudinary
        if (images !== null){
            if (report.itemImage !== undefined && report.itemImage.length > 0){
                for (let i = 0; i < report.itemImage.length; i++) {
                    console.log(report.itemImage[i])
                    console.log("delete", i)
                    await cloudinary.uploader.destroy(report.itemImage[i].public_id);
                }
            }
            console.log('images after delete',images)
            let imagesLinks = [];
            
            console.log('Does images have public_id:', images.some(image => image.hasOwnProperty('public_id')));

            // Upload images to cloudinary
            if (images.some(image => image.hasOwnProperty('public_id') === false)) {
                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.uploader.upload(images[i], {
                        folder: "Reports",
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
            console.log("report.itemImage",report.itemImage)
            req.body.image = report.itemImage;
            console.log("req.body.image",req.body.image)
        }



        // let pics;

        // let picsLinks;

        // pics = req.body.pic;

        // // Check for updated picture
        // if (pics.length > 0){
        //     if (report.pic !== undefined && report.pic.length > 0){
                
        //         // Delete current picture
        //         await cloudinary.uploader.destroy(report.pic.public_id);
        //     }

        //     if (pics.hasOwnProperty('public_id') === false) {
        //         // Upload new picture to Cloudinary
        //         const result = await cloudinary.uploader.upload(pics, {
        //             folder: "Reports",
        //         });

        //         picsLinks = {
        //             public_id: result.public_id,
        //             url: result.secure_url,
        //         };
        //     } else {
        //         // console.log("picsLinks",picsLinks)
        //         picsLinks = pics;
        //         // console.log("req.body.pic",picsLinks)
        //     }
            
        //     req.body.pic = picsLinks;
        // } else {
        //     console.log("user.pic",user.pic)
        //     req.body.pic = user.pic;
        //     console.log("req.body.pic",req.body.pic)
        // }
        
        const parsedDate = new Date(date);

        // Update user profile
        report.itemName = itemName
        report.date = parsedDate
        report.location = location
        report.itemDescription = itemDescription;
        report.reportStatus = reportStatus;
        report.itemImage = req.body.image

        const updatedReport = await report.save();

        console.log(updatedReport)
        res.json(updatedReport );

    } catch (error) {
        console.log(error);
        next(error);
    }
});

// @desc Delete User
// @route DELETE /users/:userId
// @access Private
const deleteReport = asyncHandler(async (req, res, next) => {
    try {
        // const { userId } = req.params.userId
        console.log(req.params.reportId)
        // console.log(userId)

        // Does the user exist to delete?
        let report = await Report.findById(req.params.reportId)

        console.log("report list")
        console.log(report)

        // Confirm if user exists
        if(!report) {
            return res.status(400).json({ message: 'Report was not found' })
        }

        // Delete the avatar from cloudinary
        if ((report.itemImage.public_id !== undefined || report.itemImage.public_id !== null) && report.itemImage.length > 0){
            for (let i = 0; i < report.itemImage.length; i++) {
                await cloudinary.uploader.destroy(report.itemImage[i].public_id);
            }
        }

        // Delete the user from the database
        report = await report.deleteOne()

        return res.status(200).json(report);

    } catch (error) {
        console.log(error);
        next(error);
    }
})



module.exports = { createReport, getAllReports, updateReport, getReportInfo, deleteReport, getAllReportsByUser };