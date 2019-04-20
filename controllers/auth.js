import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config'

export const signup = async (req, res, next) => {
    const credentials = req.body;
    let user;
    try {
        user = await User.create(credentials);
    } catch ({message}) {
        next({
            status: 400,
            message
        });
    }
    res.json(user);
};

export const signin = async (req, res, next) => {
    const {login, password} = req.body;
    const user = await User.findOne({login});

    if (!user) {
        return next({
            status: 400,
            message: "User not found"
        });
    }
    const result = await user.comparePasswords(password);

    if (result === false) {
        return next({
            status: 400,
            message: "Bad Credentials"
        });
    }
    //req.session.userId = user._id;
    const token=jwt.sign({_id:user._id},config.secret);
    res.json(token);
};

