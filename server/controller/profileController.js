const asyncHandler = require('express-async-handler')
const Profile = require('../model/profileModel')

const getProfile = asyncHandler(async(req,res)=>{
        const profile = await Profile.find({user : req.user.id})
        const reverse = await profile.reverse()[0]
        if(!profile){
            res.status(400)
            throw new Error('No Data Found')
        }
        res.status(200).json(reverse)
})

const postProfile = asyncHandler(async(req,res)=>{
        if (!req.body) {
            res.status(400).json({ error: 'Please fill the field' });
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