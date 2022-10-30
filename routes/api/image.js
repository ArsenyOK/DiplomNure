const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Image = require('../../models/Image');

router.get('/create', (req, res) => {
    res.render('create_image', { title: 'Create Image' });
})

router.post('/create', upload.single('image'), (req, res, next) => {
    const image = new Image({
        name: req.body.image_name
    });
    image.img.data = req.file.buffer;
    image.img.contentType = "image/jpg";
    image.save(function (err) {
        if (err) { return next(err); }
        // res.redirect("/");
        res.send('Img is uploaded')
    });
})

router.get("/image/:name", function (req, res, next) {
    const ImageName = req.params.name;

    Image.findOne({name: ImageName}, function (err, image) {
        if (err) { return next(err); }
        res.contentType(image.img.contentType)
        res.send(image.img.data);
    });
});

module.exports = router;