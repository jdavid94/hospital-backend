const { response } = require('express');
const Hospital = require('../models/hospital');
const { generateJWT } = require('../helpers/jwt');

const getHospitals = async(req, res = response) => {
    const hospitals = await Hospital.find()
        .populate('user', 'name img');
    res.json({
        ok: true,
        hospitals
    })
}

const postHospital = async(req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });
    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error - POST'
        })
    }
}

const putHospital = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'PutHospital'
    })
}

const deleteHospital = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'DeleteHospital'
    })
}


module.exports = {
    getHospitals,
    postHospital,
    putHospital,
    deleteHospital
}