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
    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital Does Not Find by ID'
            })
        }
        const changedHospital = {
            ...req.body,
            user: uid
        }
        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, changedHospital, { new: true });
        res.json({
            ok: true,
            hospitalUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error - PUT'
        })
    }

}

const deleteHospital = async(req, res = response) => {
    const id = req.params.id;
    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital Does Not Find by ID'
            })
        }
        await Hospital.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Hospital Deleted'
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
    getHospitals,
    postHospital,
    putHospital,
    deleteHospital
}