// models/LostItem.js
const mongoose = require("mongoose");

const foundItemSchema = mongoose.Schema(
    {
        itemName: { type: String, required: true },
        itemImage: [
        {
            public_id: {
            type: String,
            required: true,
            },
            url: {
            type: String,
            required: true,
            },
        },
        ],
        dateFound: { type: Date, required: true },
        locationFound: { type: String, required: true },
        itemDescription: { type: String, required: true },
        founderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        reportStatus: {
        type: String,
        enum: ["Claimable", "Processing", "Claimed"],
        default: "Processing",
        required: true,
        },
        
    },
    { timestamps: true }
);

const FoundItem = mongoose.model("FoundItem", foundItemSchema);
module.exports = FoundItem;
