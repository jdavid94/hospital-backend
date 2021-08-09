const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');


const fileUpload = async(req, res = response) => {
    const type = req.params.type;
    const id = req.params.id;
    // Type Validation
    const typeValidate = ['hospitals', 'doctors', 'users'];
    if (!typeValidate.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid Type'
        });
    }
    // File Validation
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded'
        });
    }
    // Image Process
    const file = req.files.image;
    const cutName = file.name.split('.'); // To get extension .jpg .png
    const extensionFile = cutName[cutName.length - 1];
    // Validate Extension
    const extensionValidate = ['png', 'JPG', 'jpeg', 'gif'];
    if (!extensionValidate.includes(extensionFile)) {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid File Format'
        });
    }
    // Name Generation
    const fileName = `${ uuidv4() }.${extensionFile}`;
    // Uploaded Path
    const path = `./uploads/${type}/${fileName}`;
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                msg: 'Error'
            });
        // Updated DataBase
        updateImage(type, id, fileName);
        res.json({
            ok: true,
            msg: 'File uploaded!',
            fileName
        });
    });

}

const returnImage = (req, res = response) => {
    const type = req.params.type;
    const photo = req.params.photo;
    const pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);
    // Image Exception
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}



module.exports = {
    fileUpload,
    returnImage
}