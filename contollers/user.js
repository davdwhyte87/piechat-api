import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';


/**
 * This function creates a user
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Object} - returns a response object
 */
const create = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(400).json({ status: 400, message: 'An error occurred' });
    }
    const user = User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    user.save().then((userData) => {
      const safeUserData = userData.password;
      delete safeUserData.password;
      const userToken = jwt.sign({
        data: safeUserData,
      }, process.env.JWT_SECRETE, { expiresIn: '24h' });
      return res.status(201).json({
        status: 201,
        data: [{ id: userData.id, message: 'User created successfully', token: userToken }],
      });
    })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({ status: 400, message: 'An error occurred' });
      });
  });
};
const userController = { create };
module.exports = userController;
