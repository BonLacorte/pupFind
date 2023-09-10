// models/LostItem.js
const mongoose = require("mongoose");

const missingItemSchema = mongoose.Schema(
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
        dateLost: { type: Date, required: true },
        possibleLocationLost: { type: String, required: true },
        itemDescription: { type: String, required: true },
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reportStatus: {
        type: String,
        enum: ["Missing", "Claimed"],
        default: "Processing",
        required: true,
        },
        
    },
    { timestamps: true }
);

const MissingItem = mongoose.model("MissingItem", missingItemSchema);
module.exports = MissingItem;
