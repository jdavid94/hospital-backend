const { response } = require('express');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const getAll = async(req, res = response) => {
    const search = req.params.search;
    const regex = new RegExp(search, 'i'); // Lower and Upper Case
    const [users, doctors, hospitals] = await Promise.all([ // Run at the same time
        User.find({ name: regex }),
        Doctor.find({ name: regex }),
        Hospital.find({ name: regex })
    ]);
    res.json({
        ok: true,
        users,
        doctors,
        hospitals
    })
}

const getCollection = async(req, res = response) => {
    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp(search, 'i'); // Lower and Upper Case
    let data = [];
    switch (table) {
        case 'doctors':
            data = await Doctor.find({ name: regex })
                .populate('user', 'name img')
                .populate('hospital', 'name img');
            break;
        case 'hospitals':
            data = await Hospital.find({ name: regex });
            break;
        case 'users':
            data = await User.find({ name: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Invalid Search'
            });
    }
    res.json({
        ok: true,
        results: data
    })
}


module.exports = {
    getAll,
    getCollection
}