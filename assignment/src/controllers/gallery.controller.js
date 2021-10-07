const express = require("express");
const router = express.Router();
const fs = require("fs");

const Gallery = require("../models/gallery.model");
const User = require("../models/user.model");

const upload = require("../middleware/file-uploads");



router.get("/:id",upload.none(), async(req, res) => {
    const item = await Gallery.findOne({user_id : req.params.id}).lean().exec();
   
    res.render("gallery.ejs", {item});
})

router.get("/delete/:file/:id", async(req, res) => {
    let file = req.params.file;

    let item = await Gallery.findOne({user_id : req.params.id}).lean().exec();

    if(item) {
        let index = item.pictures.findIndex(file);
        if(index > -1) {
           let hold =  item.pictures.splice(index, 1);
           fs.unlink(hold, function(err) {
               if(err) throw err;
               console.log("file deleted");
           })
            item.save();
        }
    }
    res.redirect("gallery.ejs", {item});
})


router.post("/image", upload.array("userImage", 5), async(req, res) => {
   
    
    // const filepaths = req.files.map(file => file.path);
    const filepath = req.files.map(file => file.path);
    console.log(filepath);
    // const filepaths = req.files;

    const item = await Gallery.create({
        user_id : req.body.user_id,
        pictures : filepath
    });

    res.status(201).send({item});
})


module.exports = router;