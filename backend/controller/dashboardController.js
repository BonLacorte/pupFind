const Report = require('../models/Reports');
const ClaimedReport = require('../models/ClaimedReport');
const User = require('../models/User');

const getReportCounts = async (req, res) => {
    try {
      const missingReportCount = await Report.countDocuments({ reportType: 'MissingReport' });
      const claimedReportCount = await ClaimedReport.countDocuments();
      const unclaimedReportCount = await Report.countDocuments({ reportType: 'FoundReport', reportStatus: 'Claimable' });
      const processingReportCount = await Report.countDocuments({ reportType: 'FoundReport', reportStatus: 'Processing' });
      const userCount = await User.countDocuments();
  
      return res.json({
        missingReportCount,
        claimedReportCount,
        unclaimedReportCount,
        processingReportCount,
        userCount,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while fetching counts.' });
    }
  };
  
  module.exports = { getReportCounts };
  