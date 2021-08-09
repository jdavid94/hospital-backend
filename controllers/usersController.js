const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async(req, res) => {
    const from = Number(req.query.from) || 0;
    const [users, total] = await Promise.all([ // Run at the same time
        User.find({}, 'name email google role img')
        .skip(from)
        .limit(5), // Number of Arguments to show
        User.countDocuments()
    ])
    res.json({
        ok: true,
        users,
        total
    })
}

const postUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const isEmail = await User.findOne({ email });
        if (isEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exist!'
            });
        }
        const user = new User(req.body);
        // Encrypt Password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        //Token Generated
        const token = await generateJWT(user.id);
        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error - POST'
        })
    }
}

const putUser = async(req, res = response) => {
    // TODO: Token Validation and User Verification
    const uid = req.params.id;
    const {} = req.body;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User Does Not Exist'
            });
        }
        // UPDATE
        const { password, google, email, ...campos } = req.body;
        if (userDB.email != email) {
            const existEmail = await User.findOne({ email });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'User Email Already Exist!'
                });
            }
        }
        campos.email = email;
        const userUpdated = await User.findByIdAndUpdate(uid, campos, { new: true }); // Return Updated Value
        res.json({
            ok: true,
            user: userUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error - PUT'
        })
    }
}

deleteUser = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User Does Not Exist'
            });
        }
        await User.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'User Deleted'
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
    getUsers,
    postUser,
    putUser,
    deleteUser
}