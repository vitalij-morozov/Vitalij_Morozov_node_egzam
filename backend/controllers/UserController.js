const userSchema = require('../schemas/UserSchema');
const bcrypt = require('bcrypt');
const { uid } = require('uid');

const registerUser = async (req, res) => {
  const { username, passOne: password } = req.body;
  const hash = await bcrypt.hash(password, 20);
  const secret = uid(20);
  const user = new userSchema({ username, password: hash, secret });
  await user.save();
  res.json({ error: false, message: 'ok', data: user });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await userSchema.findOne({ username });

  if (!user) {
    return res.json({ error: true, message: 'user not found' });
  }
  if (await bcrypt.compare(password, user.password)) {
    return res.json({
      error: false,
      message: 'ok',
      data: {
        secret: user.secret,
        ...user,
      },
    });
  }
  res.json({ error: true, message: 'bad credentials' });
};

module.exports = {
  registerUser,
  loginUser,
};
