const { response } = require('express');
const Doctor = require('../models/doctor');
const { generateJWT } = require('../helpers/jwt');

const getDoctors = async(req, res = response) => {
    const doctors = await Doctor.find()
        .populate('user', 'name img')
        .populate('hospital', 'name ')
    res.json({
        ok: true,
        doctors
    })
}

const postDoctor = async(req, res = response) => {
    const uid = req.uid;
    const hid = req.hid;
    const doctor = new Doctor({
        user: uid,
        hospital: hid,
        ...req.body
    });
    try {
        const doctorDB = await doctor.save();
        res.json({
            ok: true,
            doctor: doctorDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error - POST'
        })
    }

}

const putDoctor = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'PutDoctor'
    })
}

const deleteDoctor = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'DeleteDoctor'
    })
}


module.exports = {
    getDoctors,
    postDoctor,
    putDoctor,
    deleteDoctor
}