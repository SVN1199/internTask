const asyncHandler = require('express-async-handler')
const Profile = require('../model/profileModel')

const getProfile = asyncHandler(async(req,res)=>{
    const profile = await Profile.find({ user: req.user.id });
    const reversedProfile = profile.reverse()[0];

    if (!reversedProfile) {
        res.status(400).json({ error: 'No Data Found' });
        return;
    }

    res.status(200).json(reversedProfile);
})

const postProfile = asyncHandler(async(req,res)=>{
    const { name, fname, dob, gender, mobile, address } = req.body;

    if (!name || !fname || !dob || !gender || !mobile || !address) {
        res.status(400).json({ error: 'Please fill all the fields' });
        return;
    }
    
        const profile = await Profile.create({
            name  : req.body.name,
            fname : req.body.fname,
            dob   : req.body.dob,
            gender: req.body.gender,
            mobile: req.body.mobile,
            address: req.body.address,
            user: req.user.id
        });
    
        res.status(200).json(profile);
    } 
)

const putProfile = asyncHandler(async(req,res)=>{
    const profile = await Profile.findById(req.params.id)
    
    if(!profile){
        res.status(400)
        throw new Error (' No Data Found')
    }
    

    if(!req.user){
        res.status(401)
        throw new Error('User Not Found')
    }

    if(profile.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User Not Authorized')
    }

    const updateProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, {new : true})
    res.status(200).json(updateProfile)
    })


module.exports = {
    getProfile,
    postProfile,
    putProfile,
}