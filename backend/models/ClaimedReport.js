// models/LostItem.js
const mongoose = require("mongoose");

const claimedReportSchema = mongoose.Schema(
    {
        foundReportId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true  },
        missingReportId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true  },
    },
    { timestamps: true }
);

const claimedReport = mongoose.model("LostItem", claimedReportSchema);
module.exports = claimedReport;
