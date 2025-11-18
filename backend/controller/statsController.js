const Chat = require('../model/chatModel');
const User = require('../model/userModel');

// Get total user count and total chat count
const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalChats = await Chat.countDocuments();
        
        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalChats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stats',
            error: error.message
        });
    }
};

module.exports = { getStats };