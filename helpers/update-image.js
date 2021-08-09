const fs = require('fs');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const deleteImage = (path) => {
    //const oldPath = `./uploads/doctors/${doctor.img}`;
    if (fs.existsSync(path)) {
        // Deleted Old Image
        fs.unlinkSync(path);
    }
}


const updateImage = async(type, id, fileName) => {
    let oldPath = '';
    switch (type) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                console.log('Doctor does not Found')
                return false;
            }
            oldPath = `./uploads/doctors/${doctor.img}`;
            deleteImage(oldPath);
            doctor.img = fileName;
            await doctor.save();
            return true;
            break;
        case 'hospitals':
            const hosp = await Hospital.findById(id);
            if (!hosp) {
                console.log('Hospital does not Found')
                return false;
            }
            oldPath = `./uploads/hospitals/${hosp.img}`;
            deleteImage(oldPath);
            hosp.img = fileName;
            await hosp.save();
            return true;
            break;
        case 'users':
            const user = await User.findById(id);
            if (!user) {
                console.log('User does not Found')
                return false;
            }
            oldPath = `./uploads/users/${user.img}`;
            deleteImage(oldPath);
            user.img = fileName;
            await user.save();
            return true;
            break;
        default:
            break;
    }
}

module.exports = {
    updateImage
}