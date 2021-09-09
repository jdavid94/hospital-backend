const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frotend');

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
            token,
            menu: getMenuFrontEnd(userDB.role)
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error - LOGIN'
        });
    }
}

const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        // Validate User Email
        const userDB = await User.findOne({ email });
        let userNew;
        if (!userDB) {
            userNew = new User({
                name,
                email,
                password: '****',
                img: picture,
                google: true
            });
        } else {
            // User Already Exist
            userNew = userDB;
            userNew.google = true;
            //userNew.password = '****'
        }
        // Save in DB
        await userNew.save();
        // TOKEN Generation - JWT
        const token = await generateJWT(userNew.id);
        res.json({
            ok: true,
            msg: 'Google SignIn',
            token,
            menu: getMenuFrontEnd(userNew.role)
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error - INVALID TOKEN'
        });
    }
}

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    // TOKEN Generation - JWT
    const token = await generateJWT(uid);
    const user = await User.findById(uid);
    res.json({
        ok: true,
        token,
        user,
        menu: getMenuFrontEnd(user.role)
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}