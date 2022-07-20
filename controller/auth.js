const User = require('../models/user');

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    res.status(401).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: 'please provide email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invaid Credential' });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: 'Invaid Credential' });
    }

    const token = user.createJWT();
    const { password: pass, ...others } = user._doc;
    res.status(200).json({ token, ...others });
  } catch (error) {
    res.send(error);
  }
};

module.exports = { register, login };
