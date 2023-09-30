const asyncHandler = require('express-async-handler');
const Profile = require('../model/profileModel');

const getProfile = asyncHandler(async (req, res) => {
  try {
    const profiles = await Profile.find({ user: req.user.id });
    const reversedProfile = profiles.reverse()[0];

    if (!reversedProfile) {
      res.status(404).json({ error: 'No Data Found' });
      return;
    }

    res.status(200).json(reversedProfile);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const postProfile = asyncHandler(async (req, res) => {
  try {
    const { name, fname, dob, gender, mobile, address } = req.body;

    if (!name || !fname || !dob || !gender || !mobile || !address) {
      res.status(400).json({ error: 'Please fill all the fields' });
      return;
    }

    const profile = await Profile.create({
      name,
      fname,
      dob,
      gender,
      mobile,
      address,
      user: req.user.id,
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const putProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      res.status(404).json({ error: 'No Data Found' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ error: 'User Not Found' });
      return;
    }

    if (profile.user.toString() !== req.user.id) {
      res.status(401).json({ error: 'User Not Authorized' });
      return;
    }

    const updateProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updateProfile);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = {
  getProfile,
  postProfile,
  putProfile,
};
