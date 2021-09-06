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

const getDoctorByID = async(req, res = response) => {
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id)
            .populate('user', 'name img')
            .populate('hospital', 'name ')
        res.json({
            ok: true,
            doctor
        })
    } catch (error) {
        //console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error - Fin By ID'
        })
    }
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
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error - POST'
        })
    }

}

const putDoctor = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const doctorDB = await Doctor.findById(id);
        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor Does Not Find by ID'
            })
        }
        const changedDoctor = {
            ...req.body,
            user: uid
        };
        const doctorUpdated = await Doctor.findByIdAndUpdate(id, changedDoctor, { new: true });
        res.json({
            ok: true,
            doctorUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error - PUT'
        })
    }
}

const deleteDoctor = async(req, res = response) => {
    const id = req.params.id;
    try {
        const doctorDB = await Doctor.findById(id);
        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor Does Not Find by ID'
            })
        }
        await Doctor.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Doctor Deleted'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error - DELETE'
        })
    }

}


module.exports = {
    getDoctors,
    postDoctor,
    putDoctor,
    deleteDoctor,
    getDoctorByID
}