const Joi = require('joi');
const userSchema = require('../schemas/UserSchema');
const bcrypt = require('bcrypt');

const regValidation = async (req, res, next) => {
  const { username } = req.body;

  const taken = await userSchema.findOne({ username });

  if (taken) {
    return res.json({ error: true, message: 'Username is taken' });
  }

  const joiSchema = Joi.object({
    username: Joi.string().min(4).max(15).required(),
    passOne: Joi.string().min(5).max(20).required(),
    passTwo: Joi.any().valid(Joi.ref('passOne')),
  });

  try {
    const valResult = await joiSchema.validateAsync(req.body, { abortEarly: false });
    console.log('valResult ===', valResult);
    next();
  } catch (error) {
    const message = error.details.map((e) => `${e.message}`);
    return res.status(400).json({ error: true, message: message, details: error.details });
  }
};

const loginValidation = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await userSchema.findOne({ username });

  const joiSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  try {
    const valResult = await joiSchema.validateAsync(req.body, { abortEarly: false });
    if (!user) return res.status(400).json({ error: true, message: 'user not found', data: null });
    const isOk = await bcrypt.compareSync(password, user.password);
    if (!isOk) return res.status(400).json({ error: true, message: 'incorrect password or username' });
    next();
  } catch (error) {
    console.log('error ===', error);
    const message = error.details.map((e) => `${e.message}`);
    return res.status(400).json({ error: true, message: message, details: error.details });
  }
};

const auctionItemValidation = async (item) => {
  const joiSchema = Joi.object({
    index: Joi.number(),
    image: Joi.string().min(4).required(),
    title: Joi.string().min(5).max(20).required(),
    price: Joi.number().required(),
    finished: Joi.boolean(),
    bids: Joi.array().required(),
    timeLeft: Joi.number().required(),
    user: Joi.string(),
  });

  try {
    const valResult = await joiSchema.validateAsync(item, { abortEarly: false });
    console.log('valResult ===', valResult);
    console.log('item ===', item);
    return { error: false, message: 'ok' };
  } catch (error) {
    console.log('error ===', error);
    const message = error.details.map((e) => `${e.message}`);
    return { error: true, message: message, details: error.details };
  }
};

module.exports = {
  regValidation,
  loginValidation,
  auctionItemValidation,
};
