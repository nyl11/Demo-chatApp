const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};


// LOGIN USER

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    // create token
    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      token,
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// SIGNUP USER

const signupUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);
    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// GET USER PROFILE

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

// EDIT USER PROFILE

const editUserProfile = async (req, res) => {
  try {
    const updates = {};

    if (req.body.username) updates.username = req.body.username;
    
  

    updates.updatedAt = Date.now();

   

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updated) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(updated);

  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);

    if (!deletedUser) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUserProfile,
  editUserProfile,
  deleteUser
};
