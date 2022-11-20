const userSchema = require('../schemas/UserSchema');
const bcrypt = require('bcrypt');
const { uid } = require('uid');

const registerUser = async (req, res) => {
  const { username, passOne: password } = req.body;
  const hash = await bcrypt.hash(password, 20);
  const secret = uid(20);
  const user = new userSchema({ username, password: hash, secret });
  await user.save();
  return res.status(201).json({ error: false, message: 'ok', data: user });
};

const loginUser = async (req, res) => {
  const { username } = req.body;

  const user = await userSchema.findOne({ username });
  const successMsg = {
    error: false,
    message: 'login ok',
    data: {
      sec: user.secret,
      username: user.username,
    },
  };

  return res.json(successMsg);
};

module.exports = {
  registerUser,
  loginUser,
};
