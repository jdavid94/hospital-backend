const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        // Email Verification
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not Found'
            });
        }
        // Pass Verificaion
        const validPass = bcrypt.compareSync(password, userDB.password);
        if (!validPass) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid Pass'
            });
        }
        // TOKEN Generation - JWT
        const token = await generateJWT(userDB.id);
        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error - LOGIN'
        });
    }
}

module.exports = {
    login
}