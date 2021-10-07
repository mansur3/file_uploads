const express = require("express");
const router = express.Router();


const User = require("../models/user.model");
const upload = require("../middleware/file-uploads");
// const check = upload.single("userImage");
const fs = require("fs");


router.post("/", upload.single("userImage"), async(req, res) => {
    const user = await User.create({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        profile_pic : req.file.path
    })


    res.status(201).send({user});
})



router.patch("/update/:id/test", upload.single("userImage"),  async (req, res) => {
    let d = req.params.id;
    var item = await User.findOne({_id: d}).lean().exec();
    let path = item.profile_pic;
    console.log(item);
    console.log(path);
    fs.unlink(path, function(err) {
        if(err) throw err;

        console.log("File deleted!");
    })

    var upload = await User.findByIdAndUpdate(req.params.id,{
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        profile_pic: req.file.path
    }, {new : true});

    res.status(200).send({upload});
})  

router.delete("/delete/:id", async(req, res) => {
    let i = req.params.id;
    console.log(i);
    let item = await User.findOne({_id : i}).lean().exec();

    let path = item.profile_pic;
    console.log(item);

    fs.unlink(path, function(err) {
        if (err) throw err;
        console.log("File Deleted");
    });
    const del = await User.findByIdAndDelete({_id : i}).lean().exec();

    res.status(200).send({del});



})


module.exports = router;