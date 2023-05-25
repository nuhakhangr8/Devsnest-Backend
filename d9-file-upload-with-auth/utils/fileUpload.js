const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"content")
    },
    filename: (req,file,cb) =>{
        cb(null,Date.now()+path.extname(file.originalname));

    }
})

const upload = multer({
    storage,
    limits: {fileSize:100000 * 100},
    //around 10 mbs
    fileFilter:(req, file, cb) =>{
        const fileTypes= /jpg|png|mp4|gif/;
        //regex
        const mimeType = fileTypes.test(file.mimeType);
        //mimetype is filetype for images
        const extname = fileTypes.test(path.extname(file.originalname));
        //checking the extension

        if(mimeType&&extname){
            return cb(null,true);
        }

        cb("Only images supported")
    }
}).single("content");
//at a time only single file can be uploaded
//in which key we are getting data

module.exports = upload;