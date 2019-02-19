import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../models/User';


/**
 * This function creates a user
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Object} - returns a response object
 */

 function generatePasswordHash(password) {
  bcrypt.hash(password, 10, (err, hash) => {
    return hash;
  });
 }
const create = (req, res) => {
// get user data from request
  const passHash = generatePasswordHash(req.body.password);
  console.log(passHash);
  const user = User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: 'jjd',
  });
  user.save().then((userData) => {
    return res.status(201).json({
      status: 201,
      data: [{ id: userData.id, message: 'User created successfully' }],
    });
  })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ status: 400, message: 'An error occurred' });
    });
};
const userController = { create };
module.exports = userController;
