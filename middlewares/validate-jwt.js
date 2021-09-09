const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = (req, res, next) => {
    //Read Token
    const token = req.header('x-token');
    //console.log(token);
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token Does Not Received'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        //console.log(uid);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        })
    }
}

const validarADMIN_ROLE = async(req, res, next) => {
    const uid = req.uid;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Invalid User'
            })
        }
        if (userDB.roles !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'Not an Admin'
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Invalid Role'
        })
    }
}

const validarSameUser = async(req, res, next) => {
    const uid = req.uid;
    const id = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Invalid User'
            })
        }
        if (userDB.roles === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'Not an Admin'
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Invalid Role'
        })
    }
}

module.exports = {
    validateJWT,
    validarADMIN_ROLE,
    validarSameUser
}